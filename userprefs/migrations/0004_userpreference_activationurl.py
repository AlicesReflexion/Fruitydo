# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userprefs', '0003_auto_20160615_0005'),
    ]

    operations = [
        migrations.AddField(
            model_name='userpreference',
            name='activationurl',
            field=models.CharField(max_length=30, default='', unique=True),
        ),
    ]
