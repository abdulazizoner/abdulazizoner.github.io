import django.http
from django.shortcuts import render


def post_detail(
    request: "django.http.HttpRequest", slug: str
) -> "django.http.HttpResponse":
    return render(request, "blog/post_detail.html")
