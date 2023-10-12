from django.contrib import admin
from .models import Workspace,WorkspaceTask
# Register your models here.

admin.site.register(Workspace)
admin.site.register(WorkspaceTask)