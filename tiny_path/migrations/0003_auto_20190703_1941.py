# Generated by Django 2.2.3 on 2019-07-03 19:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tiny_path', '0002_auto_20190703_1743'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Trails',
            new_name='Trail',
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='tiny_path.Trail')),
            ],
        ),
    ]
