from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from .models import *

admin.site.register([Project, Act, Contractor, Customer, Agreement, Invoice, InvoiceDesc, Report])

# Create new Employee model and link to User
class EmployeeInline(admin.StackedInline):
    model = Employee
    can_delete = False
    verbose_name_plural = "employee"

class UserAdmin(BaseUserAdmin):
    inlines = [EmployeeInline]

admin.site.unregister(User)
admin.site.register(User, UserAdmin)