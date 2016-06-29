from django.db import models
from django.contrib.auth.models import User
import pyotp

class Userpreference(models.Model):
    user = models.OneToOneField(User)
    otp = models.BooleanField(default=False)
    otpkey = models.CharField(max_length=16)
    activationurl = models.CharField(max_length=30, default="", unique=True)

    def createprefs(newuser):
        newprefs = Userpreference(
            user=newuser,
            otp=False,
            otpkey=pyotp.random_base32(),
            activationurl=pyotp.random_base32()
        )
        newprefs.save()

# Create your models here.
