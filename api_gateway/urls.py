from django.urls import path
from ninja import NinjaAPI

from portfolio.api import router as portfolio_router
from blog.api import router as blog_router

api = NinjaAPI(title="Aonware.ai API")

api.add_router("/portfolio", portfolio_router)
api.add_router("/blog", blog_router)

@api.get("/health")
def health_check(request):
    return {"status": "ok"}


urlpatterns = [
    path("", api.urls),
]
