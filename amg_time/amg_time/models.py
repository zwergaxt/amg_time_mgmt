import datetime

from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from datetime import date


class Employee(models.Model):

    DEPARTMENTS = {"OV": "ОВ", 
                   "OViK": "ОВиК", 
                   "VK": "ВК", 
                   "SS": "СС", 
                   "El": "ЭОМ", 
                   "ITR": "ИТР", 
                   "BIM": "БИМ"}
    ROLES = {"User": "Пользователь", "Admin": "Админ"}

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    common_name = models.CharField(
        "Полное имя", max_length=150, null=True, default="Полное имя", editable=False
    )
    surname_name = models.CharField("Фамилия", max_length=50, null=True)
    first_name = models.CharField("Имя", max_length=50, null=True)
    second_name = models.CharField("Отчество", max_length=50, null=True)
    department = models.CharField("Отдел", max_length=7, choices=DEPARTMENTS, null=True)
    role = models.CharField("Роль", max_length=13, choices=ROLES, null=True)
    salary = models.FloatField("Оклад", max_length=15, default=0)
    hour_revenue = models.FloatField(
        "Ставка (заполняется автоматически)", max_length=15, default=0
    )

    def __str__(self):
        return self.common_name

    def save(self, *args, **kwargs):
        # Create common name for employee
        self.common_name = " ".join(
            [self.surname_name, self.first_name, self.second_name]
        )
        # Count hour revenue
        self.hour_revenue = self.salary * 1.68 / 21 / 8

        super().save(*args, **kwargs)


class Customer(models.Model):
    title = models.CharField("Название", max_length=200)

    def __str__(self):
        return self.title


class Project(models.Model):
    title = models.CharField("Название/Адрес", max_length=500)
    cust = models.ForeignKey(
        Customer, on_delete=models.DO_NOTHING, verbose_name="Заказчик"
    )
    prj_number = models.CharField("Номер договора", max_length=200)
    date = models.DateField("Дата", default=date.today)
    price = models.FloatField("Сумма", max_length=20, default=0)
    description = models.CharField("Описание", max_length=200, null=True, blank=True)
    is_archived = models.BooleanField("Архивный", default=False)

    def __str__(self):
        return self.title


class Agreement(models.Model):
    agr_number = models.CharField("Номер", max_length=200)
    project = models.ForeignKey(
        Project, on_delete=models.DO_NOTHING, verbose_name="Проект"
    )
    price = models.FloatField("Сумма", max_length=20, default=0)
    description = models.CharField("Описание", max_length=200, null=True, blank=True)

    def __str__(self):
        return self.agr_number


class Contractor(models.Model):
    title = models.CharField("Название", max_length=200)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, verbose_name="Проект"
    )
    price = models.FloatField("Сумма", max_length=20, default=0)
    diplay_name = models.CharField(max_length=500, editable=False, null=True)

    def __str__(self):
        return self.title

    # Create displaying name for Contractor
    def save(self, *args, **kwargs):
        self.diplay_name = " - ".join([self.title, self.project.prj_number])
        super().save(*args, **kwargs)


class Act(models.Model):
    act_number = models.CharField("Номер акта", max_length=200, null=True)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, verbose_name="Проект"
    )
    description = models.CharField("Описание", max_length=500, null=True, blank=True)
    price = models.FloatField("Сумма", max_length=20, default=0)
    date = models.DateField("Дата", default=date.today)
    is_paid = models.BooleanField("Оплачен", default=False)

    def __str__(self):
        return self.act_number


class Invoice(models.Model):
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, verbose_name="Проект"
    )
    inv_year = models.IntegerField(default=timezone.now().year)
    inv_number = models.CharField("Номер накладной", max_length=10, blank=True)
    employee = models.ForeignKey(
        Employee,
        on_delete=models.DO_NOTHING,
        verbose_name="Сотрудник",
        editable=True,
        null=True,
    )
    date = models.DateField("Дата", default=date.today)
    inv_number_int = models.IntegerField(default=0)

    def __str__(self):
        return self.inv_number

    def save(self, *args, **kwargs):
        # Create inv_number

        if Invoice.objects.all().count() == 0:
            last_number_pk = 0
            self.inv_number = f"1/{self.inv_year}"
            self.inv_number_int = 1
            super().save(*args, **kwargs)
        else:
            last_number_pk = Invoice.objects.last().pk
            last_invoice = Invoice.objects.last()

            if self.inv_number == "":
                if Invoice.objects.get(pk=last_number_pk).inv_year != timezone.now().year:
                    self.inv_number_int = 1
                elif Invoice.objects.get(pk=last_number_pk).pk==self.pk:
                    self.inv_number_int = Invoice.objects.get(pk=last_number_pk).inv_number_int
                else:
                    self.inv_number_int = (
                        Invoice.objects.get(pk=last_number_pk).inv_number_int + 1
                    )


            # Finally save inv_number
            self.inv_number = f"{self.inv_number_int}/{self.inv_year}"
            super().save(*args, **kwargs)


class InvoiceDesc(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    row_num = models.IntegerField("N")
    description = models.CharField("Наименование документации", max_length=500)
    quantity = models.IntegerField("Кол-во экземпляров")


class Report(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.DO_NOTHING, verbose_name="Сотрудник"
    )
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, verbose_name="Проект"
    )
    date = models.DateField("Дата", default=date.today)
    time_spent = models.FloatField("Затраченное время", max_length=6)
    costs = models.FloatField("Затраты", max_length=10, editable=False, blank=True)
    description = models.CharField("Описание", max_length=200, null=True)

    def save(self, *args, **kwargs):
        # Count costs
        self.costs = self.user.employee.hour_revenue * self.time_spent
        super().save(*args, **kwargs)
