from django.db import models
from autoslug import AutoSlugField
from core.models import TimeStampedModel


class TechStack(TimeStampedModel):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Project(TimeStampedModel):
    title = models.CharField(max_length=255)
    slug = AutoSlugField(populate_from="title", unique=True, always_update=True)
    description = models.TextField()
    github_url = models.URLField(blank=True, null=True)
    project_image = models.URLField(blank=True, null=True)
    tech_stack = models.ManyToManyField(TechStack, related_name="projects")

    def __str__(self):
        return self.title
