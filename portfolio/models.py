from django.db import models
from autoslug import AutoSlugField
from core.models import TimeStampedModel


class Project(TimeStampedModel):
    title = models.CharField(max_length=255)
    slug = AutoSlugField(populate_from="title", unique=True, always_update=True)
    description = models.TextField()

    def __str__(self):
        return self.title
