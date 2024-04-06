from django.db import models


class Article(models.Model):
    title = models.CharField(max_length=100)
    text = models.TextField()
    publish_date = models.DateField()

    def __str__(self):
        return self.title
