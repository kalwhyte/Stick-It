from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import AbstractUser

Gender = [
    ('male','male'),
    ('female','female'),
    ('other','other'),
]
class User(AbstractUser):
    username = models.CharField(unique = True, max_length=30,default="custom_user")
    name = models.CharField(max_length=100,  blank=False, null=False)
    gender = models.CharField(max_length=10, choices=Gender, default= 'other')
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    
    def __str__(self):
        return self.name  

class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    acheived = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title
    

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