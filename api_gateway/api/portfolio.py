from ninja import Router, Schema
from typing import List
from uuid import UUID
from datetime import datetime
from portfolio.models import Project
from ninja.pagination import paginate, LimitOffsetPagination

router = Router(tags=["Portfolio"])


class ProjectOut(Schema):
    id: UUID
    title: str
    slug: str
    description: str
    created_at: datetime


@router.get("/projects", response=List[ProjectOut])
@paginate(LimitOffsetPagination)
def list_projects(request):
    projects = Project.objects.all()
    return projects
