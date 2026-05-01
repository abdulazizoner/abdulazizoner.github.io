from django.contrib.auth.models import AbstractUser

from core.models import TimeStampedModel


class User(AbstractUser, TimeStampedModel):
    pass
