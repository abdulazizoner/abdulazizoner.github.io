from django.urls import path
from ninja import NinjaAPI

api = NinjaAPI(title="Aonware.ai API")


@api.get("/health")
def health_check(request):
    return {"status": "ok"}


urlpatterns = [
    path("", api.urls),
]
