from ninja import Router, Schema, Field
from typing import List, Optional
from uuid import UUID
from datetime import datetime
from django.shortcuts import get_object_or_404
from blog.models import Post, Comment
from ninja.pagination import paginate, LimitOffsetPagination

router = Router(tags=["Blog"])


class TagSchema(Schema):
    name: str


class PostOut(Schema):
    id: UUID
    title: str
    slug: str
    content_markdown: str
    tags: List[TagSchema]
    created_at: datetime


class CommentIn(Schema):
    author_name: str
    email: Optional[str] = None
    content: str


class CommentOut(Schema):
    id: UUID
    author_name: str = Field(..., alias="name")
    content: str = Field(..., alias="message")
    created_at: datetime


@router.get("/posts", response=List[PostOut])
@paginate(LimitOffsetPagination)
def list_posts(request):
    posts = Post.objects.prefetch_related("tags").all()
    return posts


@router.post("/posts/{slug}/comments", response=CommentOut)
def create_comment(request, slug: str, payload: CommentIn):
    post = get_object_or_404(Post, slug=slug)
    comment = Comment.objects.create(
        post=post, name=payload.author_name, message=payload.content
    )
    return comment


@router.get("/posts/{slug}/comments", response=List[CommentOut])
@paginate(LimitOffsetPagination)
def list_comments(request, slug: str):
    post = get_object_or_404(Post, slug=slug)
    return post.comments.all()
