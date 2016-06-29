# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userprefs', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user_preferences',
            name='otpkey',
            field=models.CharField(max_length=16, default='AT63QEVK6GSNZSAK'),
        ),
    ]
