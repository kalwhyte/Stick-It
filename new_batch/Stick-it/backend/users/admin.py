from django.contrib import admin
from .models import User, Task, Workspace,WorkspaceTask

# Register your models here.
admin.site.register(User)
admin.site.register(Task)
admin.site.register(Workspace)
admin.site.register(WorkspaceTask)