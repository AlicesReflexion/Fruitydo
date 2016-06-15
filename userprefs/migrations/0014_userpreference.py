# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('userprefs', '0013_auto_20160614_2334'),
    ]

    operations = [
        migrations.CreateModel(
            name='Userpreference',
            fields=[
                ('id', models.AutoField(serialize=False, primary_key=True, verbose_name='ID', auto_created=True)),
                ('otp', models.BooleanField(default=False)),
                ('otpkey', models.CharField(max_length=16, default='7B2ZZ4TPYVYJ6MBB')),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
