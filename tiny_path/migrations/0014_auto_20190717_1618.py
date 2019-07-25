# Generated by Django 2.2.3 on 2019-07-17 16:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tiny_path', '0013_auto_20190717_1617'),
    ]

    operations = [
        migrations.AlterField(
            model_name='trail',
            name='latitude',
            field=models.DecimalField(decimal_places=4, max_digits=20, null=True),
        ),
        migrations.AlterField(
            model_name='trail',
            name='longitude',
            field=models.DecimalField(decimal_places=4, max_digits=20, null=True),
        ),
    ]
