from django.db import models


# Create your models here.
class Article(models.Model):
    title = models.CharField(100)
    text = models.TextField()
    publish_date = models.DateTimeField()

    def __str__(self):
        return self.title
