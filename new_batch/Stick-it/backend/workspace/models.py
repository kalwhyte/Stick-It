from django.db import models
from users.models import User
# Create your models here.

class Workspace(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    Admin = models.ForeignKey(User, related_name='admin_workspaces', on_delete=models.CASCADE)  # Corrected the related name
    members = models.ManyToManyField(User, related_name='workspace_users')
    def __str__(self):
        return self.name
    

class WorkspaceTask(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name='task_owner')
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, related_name="workspace")
    acheived = models.BooleanField(default=False)
    def __str__(self):
        return self.title