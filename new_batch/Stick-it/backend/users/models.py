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

