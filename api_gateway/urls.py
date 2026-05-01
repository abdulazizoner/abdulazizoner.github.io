from django.urls import path
from ninja import NinjaAPI

# Jules'un yeni modüler API yapısı
from .api.blog import router as blog_router
from .api.portfolio import router as portfolio_router

api = NinjaAPI(title="Aonware.ai API")

api.add_router("/blog", blog_router)
api.add_router("/portfolio", portfolio_router)

@api.get("/health")
def health_check(request):
    return {"status": "ok"}

urlpatterns = [
    path("", api.urls),
]