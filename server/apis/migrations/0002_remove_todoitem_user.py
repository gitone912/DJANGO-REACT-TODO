# Generated by Django 4.1.9 on 2023-06-24 19:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("apis", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="todoitem",
            name="user",
        ),
    ]
