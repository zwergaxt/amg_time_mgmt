from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import filters
from rest_framework.response import Response
from rest_framework.request import Request
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import generics
from rest_framework.decorators import (
    api_view,
    permission_classes,
    authentication_classes,
)
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_access_policy import AccessPolicy
from rest_framework import status
from datetime import datetime
from .serializers import *
from .models import *


class AdminOnly(AccessPolicy):
    statements = [
        {
            "action": "*",
            "principal": "*",
            "effect": "allow",
            "condition": ["user_must_be:Admin"],
        },
        {
            "action": "*",
            "principal": "*",
            "effect": "deny",
            "condition": ["user_must_be:User"],
        },
    ]

    def user_must_be(self, request, view, action, field: str) -> bool:
        user = User.objects.get(username=request.user)
        return user.employee.role == field


class AllUser(AccessPolicy):
    statements = [
        {
            "action": "*",
            "principal": "*",
            "effect": "allow",
            "condition": ["user_must_be:Admin"],
        },
        {
            "action": "*",
            "principal": "*",
            "effect": "allow",
            "condition": ["user_must_be:User"],
        },
    ]

    def user_must_be(self, request, view, action, field: str) -> bool:
        user = User.objects.get(username=request.user)
        return user.employee.role == field


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


#  DELETE LATER
@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def users_list(request):
    if request.method == "GET":
        data = User.objects.all()
        print(f"request {request}")
        serializer = UserSerializer(data, context={"request": request}, many=True)
        return Response(serializer.data)


@api_view(["GET", "POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
def projects_list(request):
    if request.method == "GET":
        len = request.query_params.get("len")
        if len != None:
            data = Project.objects.all().order_by("-id")[: int(len)]
        else:
            data = Project.objects.all()

        serializer = ProjectListSerializer(
            data, context={"request": request}, many=True
        )
        return Response(serializer.data)
    elif request.method == "POST":
        print("post >>>", request)
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
def projects_detail(request, pk):
    try:
        project = Project.objects.get(pk=pk)
    except Project.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "PUT":
        serializer = ProjectSerializer(
            project, data=request.data, context={"request": request}
        )
        print(f"DATA>>> {serializer}")
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        project.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def employees_list(request):
    if request.method == "GET":
        data = Employee.objects.all()
        serializer = EmployeesSerializer(data, context={"request": request}, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        print("post")
        serializer = EmployeesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
def employees_detail(request, pk):
    try:
        user = Employee.objects.get(pk=pk)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "PUT":
        serializer = EmployeesSerializer(
            user, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
def customers_list(request):
    if request.method == "GET":
        data = Customer.objects.all()
        serializer = CustomersSerializer(data, context={"request": request}, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        print("post")
        serializer = CustomersSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
def customers_detail(request, pk):
    try:
        customer = Customer.objects.get(pk=pk)
    except customer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "PUT":
        serializer = CustomersSerializer(
            customer, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
def agreements_list(request):
    if request.method == "GET":
        len = request.query_params.get("len")
        if len != None:
            data = Agreement.objects.all().order_by("-id")[: int(len)]
        else:
            data = Agreement.objects.all()

        serializer = AgreementsListSerializer(
            data, context={"request": request}, many=True
        )
        return Response(serializer.data)
    elif request.method == "POST":
        print("post")
        serializer = AgreementsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
def agreements_detail(request, pk):
    try:
        entity = Agreement.objects.get(pk=pk)
    except entity.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "PUT":
        serializer = AgreementsSerializer(
            entity, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        entity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
def contractor_list(request):
    if request.method == "GET":
        len = request.query_params.get("len")
        if len != None:
            data = Contractor.objects.all().order_by("-id")[: int(len)]
        else:
            data = Contractor.objects.all()

        serializer = ContractorsListSerializer(
            data, context={"request": request}, many=True
        )
        return Response(serializer.data)
    elif request.method == "POST":
        print("post")
        serializer = ContractorsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
def contractors_detail(request, pk):
    try:
        entity = Contractor.objects.get(pk=pk)
    except entity.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "PUT":
        serializer = ContractorsSerializer(
            entity, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        entity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
def acts_list(request):
    if request.method == "GET":
        len = request.query_params.get("len")
        if len != None:
            data = Act.objects.all().order_by("-id")[: int(len)]
        else:
            data = Act.objects.all()

        serializer = ActsListSerializer(data, context={"request": request}, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        print("post")
        serializer = ActsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
def acts_detail(request, pk):
    try:
        entity = Act.objects.get(pk=pk)
    except entity.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "PUT":
        serializer = ActsSerializer(
            entity, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        entity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
def actscontr_list(request):
    if request.method == "GET":
        len = request.query_params.get("len")
        if len != None:
            data = ActContractor.objects.all().order_by("-id")[: int(len)]
        else:
            data = ActContractor.objects.all()

        serializer = ActsContrListSerializer(
            data, context={"request": request}, many=True
        )
        return Response(serializer.data)
    elif request.method == "POST":
        print("post")
        serializer = ActsContrSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
def actscontr_detail(request, pk):
    try:
        entity = ActContractor.objects.get(pk=pk)
    except entity.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "PUT":
        serializer = ActsContrSerializer(
            entity, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        entity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def invoices_list(request):
    if request.method == "GET":
        len = request.query_params.get("len")
        if len != None:
            data = Invoice.objects.all().order_by("-id")[: int(len)]
        else:
            data = Invoice.objects.all()

        serializer = InvoicesListSerializer(
            data, context={"request": request}, many=True
        )
        return Response(serializer.data)
    elif request.method == "POST":
        print("post")
        serializer = InvoicesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def invoices_detail(request, pk):
    try:
        entity = Invoice.objects.get(pk=pk)
    except entity.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "PUT":
        serializer = InvoicesSerializer(
            entity, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        entity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([AllUser])
def invoicedesc_list(request):
    if request.method == "GET":
        data = InvoiceDesc.objects.all()
        serializer = InvoiceDescSerializer(
            data, context={"request": request}, many=True
        )
        return Response(serializer.data)
    elif request.method == "POST":
        print("post")
        serializer = InvoiceDescSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([AllUser])
def invoicedesc_detail(request, pk):
    try:
        entity = InvoiceDesc.objects.get(pk=pk)
    except entity.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "PUT":
        serializer = InvoiceDescSerializer(
            entity, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        entity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["GET", "POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([AllUser])
def reports_list(request):
    if request.method == "GET":
        len = request.query_params.get("len")
        if len != None:
            data = (
                Report.objects.all()
                .filter(user=request.user)
                .order_by("-id")[: int(len)]
            )
        else:
            data = Report.objects.all().filter(user=request.user)

        serializer = ReportsListSerializer(
            data, context={"request": request}, many=True
        )

        return Response(serializer.data)
    elif request.method == "POST":
        print("post")
        serializer = ReportsSerializer(data=request.data, context={"request": request})
        print(User.objects.get(username=request.user).id)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT", "DELETE"])
@authentication_classes([JWTAuthentication])
@permission_classes([AllUser])
def reports_detail(request, pk):
    try:
        entity = Report.objects.get(pk=pk)
    except entity.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "PUT":
        serializer = ReportsSerializer(
            entity, data=request.data, context={"request": request}
        )
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
        entity.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# Views for selectors
@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([AllUser])
def projects_list_select(request):
    data = Project.objects.filter(is_archived=False)
    print(f"request {request}")
    serializer = ProjectSelectSerializer(data, context={"request": request}, many=True)
    return Response(serializer.data)


"""
Generic views for filtering
"""

@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
class ProjectList(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["prj_number"]
    search_fields = ["prj_number", "title"]

@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
class ActsList(generics.ListAPIView):
    queryset = Act.objects.all()
    serializer_class = ActsListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["project_id"]


@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
class ContractorsList(generics.ListAPIView):
    queryset = Contractor.objects.all()
    serializer_class = ContractorsListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["project_id"]


@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
class ActContractorList(generics.ListAPIView):
    queryset = ActContractor.objects.all()
    serializer_class = ActsContrListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["contractor"]


@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
class InvoicesList(generics.ListAPIView):
    queryset = Invoice.objects.all()
    serializer_class = InvoicesListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["project_id"]


@authentication_classes([JWTAuthentication])
@permission_classes([AdminOnly])
class AgreementsList(generics.ListAPIView):
    queryset = Agreement.objects.all()
    serializer_class = AgreementsListSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ["project_id"]