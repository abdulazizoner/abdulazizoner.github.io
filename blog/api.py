from ninja import Router, Schema
from typing import List, Optional
import uuid

from .models import Post, Category, Tag

router = Router()

class CategorySchema(Schema):
    id: uuid.UUID
    name: str
    slug: str

class TagSchema(Schema):
    id: uuid.UUID
    name: str
    slug: str

class PostSchema(Schema):
    id: uuid.UUID
    title: str
    slug: str
    content_markdown: str
    category: CategorySchema
    tags: List[TagSchema]

@router.get("/posts", response=List[PostSchema])
def list_posts(request):
    return Post.objects.select_related("category").prefetch_related("tags").all()

@router.get("/posts/{slug}", response=PostSchema)
def get_post(request, slug: str):
    from django.shortcuts import get_object_or_404
    return get_object_or_404(Post.objects.select_related("category").prefetch_related("tags"), slug=slug)
