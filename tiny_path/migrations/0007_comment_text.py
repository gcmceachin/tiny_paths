# Generated by Django 2.2.3 on 2019-07-04 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tiny_path', '0006_auto_20190704_1728'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='text',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
