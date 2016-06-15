from django.db import models
from django.contrib.auth.models import User
import pyotp

class user_preferences(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    otp = models.BooleanField(default=False)
    otpkey = models.CharField(max_length=16, default=pyotp.random_base32())

# Create your models here.
