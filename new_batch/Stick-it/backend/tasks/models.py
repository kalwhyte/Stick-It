from django.db import models
from users.models import User
# Create your models here.
class Task(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='tasks')
    acheived = models.BooleanField(default=False)
    
    def __str__(self):
        return self.title
    
