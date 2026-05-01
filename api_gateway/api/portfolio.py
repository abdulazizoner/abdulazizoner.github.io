from ninja import Router
from typing import List
from ninja import Schema
from portfolio.models import Project

router = Router(tags=["Portfolio"])


class ProjectOut(Schema):
    id: str
    title: str
    slug: str
    description: str
    created_at: str


@router.get("/projects", response=List[ProjectOut])
def list_projects(request):
    projects = Project.objects.all()
    return projects
