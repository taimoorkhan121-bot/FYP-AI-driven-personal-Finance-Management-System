from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet, basename='category')
router.register(r'transactions', views.TransactionViewSet, basename='transaction')
router.register(r'savings-goals', views.SavingsGoalViewSet, basename='savingsgoal')
router.register(r'preferences', views.UserPreferenceViewSet, basename='preference')

urlpatterns = [
    path('', include(router.urls)),
]