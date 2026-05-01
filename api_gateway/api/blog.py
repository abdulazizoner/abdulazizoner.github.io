from ninja import Router, Schema
from typing import List
from uuid import UUID
from datetime import datetime
from blog.models import Post

router = Router(tags=["Blog"])

class TagSchema(Schema):
    name: str

class PostOut(Schema):
    id: UUID
    title: str
    content_markdown: str
    tags: List[TagSchema]
    created_at: datetime

@router.get("/posts", response=List[PostOut])
def list_posts(request):
    posts = Post.objects.prefetch_related("tags").all()
    return posts