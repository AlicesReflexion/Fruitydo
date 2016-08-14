# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userprefs', '0006_auto_20160623_1634'),
    ]

    operations = [
        migrations.AddField(
            model_name='userpreference',
            name='pendingmail',
            field=models.CharField(max_length=256, default=''),
        ),
    ]
