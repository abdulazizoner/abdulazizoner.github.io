from ninja import Router, Schema
from typing import List, Optional
import uuid

from .models import Project, TechStack

router = Router()

class TechStackSchema(Schema):
    id: uuid.UUID
    name: str

class ProjectSchema(Schema):
    id: uuid.UUID
    title: str
    slug: str
    description: str
    github_url: Optional[str]
    project_image: Optional[str]
    tech_stack: List[TechStackSchema]

@router.get("/projects", response=List[ProjectSchema])
def list_projects(request):
    return Project.objects.prefetch_related("tech_stack").all()

@router.get("/projects/{project_id}", response=ProjectSchema)
def get_project(request, project_id: uuid.UUID):
    from django.shortcuts import get_object_or_404
    return get_object_or_404(Project.objects.prefetch_related("tech_stack"), id=project_id)
