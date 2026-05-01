import django.http
from django.shortcuts import render


def index(request: "django.http.HttpRequest") -> "django.http.HttpResponse":
    return render(request, "core/index.html")
