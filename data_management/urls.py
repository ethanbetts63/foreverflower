from django.urls import path
from .views.add_to_blocklist_view import AddToBlocklistView
from .views.blocklist_success_view import BlocklistSuccessView
from .views.terms_and_conditions_view import LatestTermsAndConditionsView

app_name = 'data_management'

urlpatterns = [
    path('blocklist/block/<str:signed_email>/', AddToBlocklistView.as_view(), name='add_to_blocklist'),
    path('blocklist-success/', BlocklistSuccessView.as_view(), name='blocklist_success'),
    path('terms/latest/', LatestTermsAndConditionsView.as_view(), name='latest-terms'),
]
