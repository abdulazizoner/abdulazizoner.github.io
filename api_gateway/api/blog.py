from ninja import Router
from typing import List
from ninja import Schema
from blog.models import Article

router = Router(tags=["Blog"])


class TagSchema(Schema):
    name: str


class ArticleOut(Schema):
    id: str
    title: str
    content_markdown: str
    tags: List[TagSchema]
    created_at: str


@router.get("/posts", response=List[ArticleOut])
def list_posts(request):
    articles = Article.objects.prefetch_related("tags").all()
    # Pydantic/Ninja will serialize the UUID and datetime to strings
    return articles
