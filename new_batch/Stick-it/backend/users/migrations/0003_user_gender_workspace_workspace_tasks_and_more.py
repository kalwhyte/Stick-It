# Generated by Django 4.2.6 on 2023-10-11 20:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_user_options_alter_user_managers_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='gender',
            field=models.CharField(choices=[('male', 'male'), ('female', 'female'), ('other', 'other')], default='other', max_length=10),
        ),
        migrations.AddField(
            model_name='workspace',
            name='workspace_tasks',
            field=models.ManyToManyField(related_name='workstace_task', to='users.task'),
        ),
        migrations.AlterField(
            model_name='user',
            name='first_name',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(max_length=255),
        ),
        migrations.DeleteModel(
            name='WorkspaceTasks',
        ),
    ]