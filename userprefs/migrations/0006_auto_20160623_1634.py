# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userprefs', '0005_auto_20160623_1631'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userpreference',
            name='activationurl',
            field=models.CharField(default='', unique=True, max_length=30),
        ),
    ]
