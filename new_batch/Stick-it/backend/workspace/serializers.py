from rest_framework import serializers
from .models import Workspace,WorkspaceTask


class WorkspaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workspace
        fields = '__all__'


class WorkspaceTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = WorkspaceTask
        fields = '__all__'
 