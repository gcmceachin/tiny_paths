# Generated by Django 2.2.3 on 2019-07-01 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Choice',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('park_name', models.CharField(max_length=255)),
                ('length', models.IntegerField()),
                ('difficulty', models.TextField()),
                ('amenities', models.CharField(max_length=300)),
            ],
        ),
    ]
