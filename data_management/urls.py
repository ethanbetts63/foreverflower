from django.urls import path
from .views.terms_and_conditions_view import LatestTermsAndConditionsView

app_name = 'data_management'

urlpatterns = [
    path('terms/latest/', LatestTermsAndConditionsView.as_view(), name='latest-terms'),
]
