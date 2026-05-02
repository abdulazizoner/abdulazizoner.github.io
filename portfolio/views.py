import django.http
from django.shortcuts import render


def project_detail(
    request: "django.http.HttpRequest", slug: str
) -> "django.http.HttpResponse":
    return render(request, "portfolio/project_detail.html")
