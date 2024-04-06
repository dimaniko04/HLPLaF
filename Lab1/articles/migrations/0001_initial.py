# Generated by Django 5.0.3 on 2024-04-02 21:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(verbose_name=100)),
                ('text', models.TextField()),
                ('publish_date', models.DateTimeField()),
            ],
        ),
    ]
