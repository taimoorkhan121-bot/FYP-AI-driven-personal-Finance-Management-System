from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, Transaction, SavingsGoal, UserPreference

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        read_only_fields = ('id',)

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'color', 'icon', 'budget')

class TransactionSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Transaction
        fields = ('id', 'amount', 'transaction_type', 'category', 'category_name',
                 'date', 'description', 'payment_method', 'notes')

class SavingsGoalSerializer(serializers.ModelSerializer):
    progress_percentage = serializers.SerializerMethodField()

    class Meta:
        model = SavingsGoal
        fields = ('id', 'name', 'target_amount', 'current_amount', 'deadline',
                 'progress_percentage')

    def get_progress_percentage(self, obj):
        if obj.target_amount == 0:
            return 0
        return (obj.current_amount / obj.target_amount) * 100

class UserPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreference
        fields = ('currency', 'language', 'notification_email', 'notification_push',
                 'theme')