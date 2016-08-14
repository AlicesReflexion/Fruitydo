# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userprefs', '0008_userpreference_newmailcode'),
    ]

    operations = [
        migrations.AddField(
            model_name='userpreference',
            name='encryptedkey',
            field=models.CharField(blank=True, max_length=256, default=''),
        ),
        migrations.AddField(
            model_name='userpreference',
            name='encryption',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='userpreference',
            name='newmailcode',
            field=models.CharField(blank=True, max_length=16, default=''),
        ),
        migrations.AlterField(
            model_name='userpreference',
            name='pendingmail',
            field=models.CharField(blank=True, max_length=256, default=''),
        ),
    ]
