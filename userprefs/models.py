from django.db import models
from django.contrib.auth.models import User

class user_preferences(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    otp = models.BooleanField(default=False)

# Create your models here.
