# Generated by Django 2.2.3 on 2019-07-10 16:20

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tiny_path', '0009_auto_20190709_1442'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='trail',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='tiny_path.Trail'),
        ),
    ]
