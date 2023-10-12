from django.contrib import admin
from django.urls import path
from .views import TaskView

urlpatterns = [
    path('', TaskView.as_view(), name='alltasks'),
]