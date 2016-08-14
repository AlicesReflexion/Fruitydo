# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('userprefs', '0007_userpreference_pendingmail'),
    ]

    operations = [
        migrations.AddField(
            model_name='userpreference',
            name='newmailcode',
            field=models.CharField(default='', max_length=16),
        ),
    ]
