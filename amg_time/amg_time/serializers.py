from rest_framework.serializers import Serializer, CharField
from rest_framework import serializers
from django.contrib.auth.models import User
from datetime import datetime
from .models import *

class CustomersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ("pk", "title")

        def create(self, validated_data):
            return Customer.objects.create(**validated_data)


class ProjectSerializer(serializers.ModelSerializer):
    cust = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    date = serializers.DateField(format="%Y-%d-%m", input_formats=["%d.%m.%Y"], required=False)
    
    class Meta:
        model = Project
        fields = (
            "pk",
            "title",
            "cust",
            "cust_id",
            "prj_number",
            "date",
            "price",
            "description",
            "is_archived",
        )
        depth = 1

    # def validate_date(self, value):
    #     date = datetime.datetime.strptime(f"{value}", '%Y-%m-%d')
    #     print(date)
    #     return(date)

    def create(self, validated_data):
        # date = datetime.strptime(validated_data['date'], '%Y-%d-%m')
        return Project.objects.create(**validated_data)

class ProjectListSerializer(serializers.ModelSerializer):    
    date = serializers.DateField(format='%d.%m.%Y')
    
    class Meta:
        model = Project
        fields = (
            "pk",
            "title",
            "cust",
            "cust_id",
            "prj_number",
            "date",
            "price",
            "description",
            "is_archived",
        )
        depth = 1

class ProjectSelectSerializer(serializers.ModelSerializer):    
    date = serializers.DateField(format='%d.%m.%Y')
    
    class Meta:
        model = Project
        fields = (
            "pk",
            "title",
            "cust",
            "cust_id",
            "prj_number",
            "date",
            "description",
            "is_archived",
        )
        depth = 1

class UserSerializer(serializers.ModelSerializer):    
    class Meta:
        model = User
        fields = "__all__"
        depth = 1


class EmployeesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = (
            "pk",
            "common_name",
            "user",
            "surname_name",
            "first_name",
            "second_name",
            "department",
        )
        depth = 2


class AgreementsSerializer(serializers.ModelSerializer):
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())

    class Meta:
        model = Agreement
        fields = ("pk", "agr_number", "project", "price", "description")
        depth = 1
    
    def create(self, validated_data):
        return Act.objects.create(**validated_data)
    
class AgreementsListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Agreement
        fields = ("pk", "agr_number", "project", "price", "description")
        depth = 1
    

class ContractorsSerializer(serializers.ModelSerializer):
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())

    class Meta:
        model = Contractor
        fields = ("pk", "title", "project", "project_id", "price", "diplay_name")
        depth=1

    def create(self, validated_data):
        return Contractor.objects.create(**validated_data)
    
class ContractorsListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contractor
        fields = ("pk", "title", "project", "project_id", "price", "diplay_name")
        depth=1

class ActsSerializer(serializers.ModelSerializer):
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())
    date = serializers.DateField(format="%Y-%d-%m", input_formats=["%d.%m.%Y"], required=False)

    class Meta:
        model = Act
        fields = ("pk", "act_number", "project", "price", "description", "date")
        depth = 1
    
    def create(self, validated_data):
        return Act.objects.create(**validated_data)

class ActsListSerializer(serializers.ModelSerializer):
    date = serializers.DateField(format='%d.%m.%Y')

    class Meta:
        model = Act
        fields = ("pk", "act_number", "project", "price", "description", "date")
        depth = 1


class InvoiceDescSerializer(serializers.ModelSerializer):
    invoice = serializers.PrimaryKeyRelatedField(queryset=Invoice.objects.all())
    
    class Meta:
        model = InvoiceDesc
        fields = ("pk", "invoice", "invoice_id", "row_num", "description", "quantity")

    def create(self, validated_data):
        return InvoiceDesc.objects.create(**validated_data)


class InvoicesSerializer(serializers.ModelSerializer):
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())
    employee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all())

    date = serializers.DateField(format="%Y-%d-%m", input_formats=["%d.%m.%Y"], required=False)

    class Meta:
        model = Invoice

        fields = (
            "pk",
            "inv_number",
            "project",
            "employee",
            "employee_id",
            "inv_year",
            "date",
            "inv_number_int",
            "invoicedesc_set",
        )
        depth = 2
    
    def create(self, validated_data):
        return Invoice.objects.create(**validated_data)

class InvoicesListSerializer(serializers.ModelSerializer):
    date = serializers.DateField(format="%d.%m.%Y")

    class Meta:
        model = Invoice

        fields = (
            "pk",
            "inv_number",
            "project",
            "employee",
            "inv_year",
            "date",
            "inv_number_int",
            "invoicedesc_set",
        )
        depth = 2

class ReportsSerializer(serializers.ModelSerializer):
    project = serializers.PrimaryKeyRelatedField(queryset=Project.objects.all())
    date = serializers.DateField(format="%Y-%d-%m", input_formats=["%d.%m.%Y"], required=False)

    class Meta:
        model = Report
        fields = (
            "pk",
            "user",
            "project",
            "project_id",
            "date",
            "time_spent",
            "costs",
            "description",
        )
        depth = 1

    def create(self, validated_data):
        request = self.context.get('request', None)
        u = User.objects.get(username = request.user)
        return Report.objects.create(user = u, **validated_data)

class ReportsListSerializer(serializers.ModelSerializer):
    date = serializers.DateField(format="%d.%m.%Y")
    # employee = serializers.SerializerMethodField('_employee')


    # # Use this method for the custom field
    # def _employee(self, obj):
    #     u = User.objects.get(user)
    
    #     return u.employee.common_name
    
    class Meta:
        model = Report
        fields = (
            "pk",
            "user",
            # "employee",
            "project",
            "date",
            "time_spent",
            "costs",
            "description",
        )
        depth = 1


class LoginRequestSerializer(Serializer):
    model = User
    username = CharField(required=True)
    password = CharField(required=True)