# Generated by Django 4.2.6 on 2023-10-11 20:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_alter_user_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='acheived',
            field=models.BooleanField(default=False),
        ),
    ]
