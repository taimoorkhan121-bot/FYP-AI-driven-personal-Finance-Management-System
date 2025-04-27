from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db.models import Sum
from datetime import datetime, timedelta
from .models import Category, Transaction, SavingsGoal, UserPreference
from .serializers import (CategorySerializer, TransactionSerializer,
                         SavingsGoalSerializer, UserPreferenceSerializer)

class CategoryViewSet(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TransactionViewSet(viewsets.ModelViewSet):
    serializer_class = TransactionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['get'])
    def monthly_summary(self, request):
        today = datetime.now()
        start_date = today - timedelta(days=30)
        
        transactions = Transaction.objects.filter(
            user=request.user,
            date__gte=start_date
        )

        expenses = transactions.filter(
            transaction_type='expense'
        ).aggregate(total=Sum('amount'))

        income = transactions.filter(
            transaction_type='income'
        ).aggregate(total=Sum('amount'))

        return Response({
            'expenses': expenses['total'] or 0,
            'income': income['total'] or 0,
            'net': (income['total'] or 0) - (expenses['total'] or 0)
        })

class SavingsGoalViewSet(viewsets.ModelViewSet):
    serializer_class = SavingsGoalSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return SavingsGoal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserPreferenceViewSet(viewsets.ModelViewSet):
    serializer_class = UserPreferenceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return UserPreference.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)