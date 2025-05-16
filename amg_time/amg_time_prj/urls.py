"""
URL configuration for amg_time_prj project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path, re_path
from amg_time import views
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth.views import LogoutView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("amg_time/", include("amg_time.urls")),
    path("accounts/", include("django.contrib.auth.urls")),
    path('api/logout', LogoutView.as_view(next_page='/'), name='logout'),
    path('api/token/obtain', TokenObtainPairView.as_view(), name='token_obtain'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
    path(r"api/user", views.current_user),
    re_path(r"^api/users/$", views.users_list),
    re_path(r'^api/projects/(?:(?P<len>\w+)/?)?$', views.projects_list),
    re_path(r"^api/projects_select/$", views.projects_list_select),
    re_path(r"^api/projects_d/(\d+)$", views.projects_detail),
    re_path(r"^api/employees/$", views.employees_list),
    re_path(r"^api/employees/(\d+)$", views.employees_detail),
    re_path(r"^api/customers/$", views.customers_list),
    re_path(r"^api/customers/(\d+)$", views.customers_detail),
    re_path(r"^api/agreements/(?:(?P<len>\w+)/?)?$", views.agreements_list),
    re_path(r"^api/agreements_d/(\d+)$", views.agreements_detail),
    re_path(r"^api/contractors/(?:(?P<len>\w+)/?)?$", views.contractor_list),
    re_path(r"^api/contractors_d/(\d+)$", views.contractors_detail),
    re_path(r"^api/acts/(?:(?P<len>\w+)/?)?$", views.acts_list),
    re_path(r"^api/acts_d/(\d+)$", views.acts_detail),
    re_path(r"^api/acts_contr/(?:(?P<len>\w+)/?)?$", views.actscontr_list),
    re_path(r"^api/acts_contr_d/(\d+)$", views.actscontr_detail),
    re_path(r"^api/invoices/(?:(?P<len>\w+)/?)?$", views.invoices_list),
    re_path(r"^api/invoices_d/(\d+)$", views.invoices_detail),
    re_path(r"^api/invoices_desc/$", views.invoicedesc_list),
    re_path(r"^api/invoices_desc/(\d+)$", views.invoicedesc_detail),
    re_path(r"^api/reports/(?:(?P<len>\w+)/?)?$", views.reports_list),
    re_path(r"^api/reports_d/(\d+)$", views.reports_detail),
    # generic filtered views
    path(r"api/contractors_gen/", views.ContractorsList.as_view()),
    path(r"api/agreements_gen/", views.AgreementsList.as_view()),
    path(r"api/invoices_gen/", views.InvoicesList.as_view()),
    path(r"api/acts_gen/", views.ActsList.as_view()),
]
