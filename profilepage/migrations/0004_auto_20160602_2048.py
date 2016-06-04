# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('profilepage', '0003_auto_20160507_1957'),
    ]

    operations = [
        migrations.AlterField(
            model_name='task',
            name='due_date',
            field=models.DateField(verbose_name='due date'),
        ),
        migrations.AlterField(
            model_name='task',
            name='pub_date',
            field=models.DateField(verbose_name='date published'),
        ),
    ]
