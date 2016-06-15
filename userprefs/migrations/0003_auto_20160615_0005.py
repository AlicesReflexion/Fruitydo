# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('userprefs', '0002_user_preferences_otpkey'),
    ]

    operations = [
        migrations.CreateModel(
            name='Userpreference',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('otp', models.BooleanField(default=False)),
                ('otpkey', models.CharField(max_length=16)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='user_preferences',
            name='user',
        ),
        migrations.DeleteModel(
            name='user_preferences',
        ),
    ]
