from django.db import models
from django.contrib.auth.models import User
import pyotp

class Userpreference(models.Model):
    user = models.OneToOneField(User)
    otp = models.BooleanField(default=False)
    otpkey = models.CharField(max_length=16)

# Create your models here.
