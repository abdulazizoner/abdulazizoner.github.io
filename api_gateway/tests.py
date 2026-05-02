import pytest
from blog.models import Post, Comment, Category
from django.test import Client


@pytest.mark.django_db
class TestCommentSystem:
    def setup_method(self):
        self.client = Client()
        self.category = Category.objects.create(name="Tech")
        self.post = Post.objects.create(
            title="Test Post",
            slug="test-post",
            content_markdown="This is a test post.",
            category=self.category,
        )

    def test_post_detail_view(self):
        response = self.client.get(f"/blog/{self.post.slug}/")
        assert response.status_code == 200
        # Post data is loaded by JS on the client, so we just check for standard layout things or generic title tags.
        assert "Aonware.ai" in response.content.decode()

    def test_submit_comment(self):
        payload = {"author_name": "Test User", "content": "This is a test comment."}
        response = self.client.post(
            f"/api/v1/blog/posts/{self.post.slug}/comments",
            data=payload,
            content_type="application/json",
        )
        assert response.status_code == 200
        data = response.json()
        assert data["author_name"] == "Test User"
        assert data["content"] == "This is a test comment."
        assert Comment.objects.count() == 1

    def test_get_comments_pagination(self):
        for i in range(15):
            Comment.objects.create(
                post=self.post, name=f"User {i}", message=f"Comment {i}"
            )

        response = self.client.get(
            f"/api/v1/blog/posts/{self.post.slug}/comments?limit=10&offset=0"
        )
        assert response.status_code == 200
        data = response.json()
        assert "items" in data
        assert len(data["items"]) == 10
        assert data["count"] == 15
