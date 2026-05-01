from django.db import models
from core.models import TimeStampedModel


class Tag(TimeStampedModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Article(TimeStampedModel):
    title = models.CharField(max_length=255)
    content_markdown = models.TextField(help_text="Markdown content")
    tags = models.ManyToManyField(Tag, related_name="articles", blank=True)

    def __str__(self):
        return self.title
