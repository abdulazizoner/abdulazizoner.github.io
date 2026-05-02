from django.contrib import admin
from django.urls import path, include
from core.views import index

urlpatterns = [
    path("", index, name="index"),
    path("admin/", admin.site.urls),
    path("api/v1/", include("api_gateway.urls")),
    path("blog/", include("blog.urls")),
    path("portfolio/", include("portfolio.urls")),
    path("", include("core.urls")),
]
