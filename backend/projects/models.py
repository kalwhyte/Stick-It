from boards.models import Board
from django.contrib.contenttypes.fields import GenericRelation
from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.utils import timezone
from users.models import User


class Project(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='owned_projects')
    title = models.CharField(max_length=255, blank=False, null=False)
    description = models.TextField(blank=True, null=False)
    created_at = models.DateTimeField(default=timezone.now)
    members = models.ManyToManyField(
        User, through='ProjectMembership', through_fields=('project', 'member'))

    """boards = GenericRelation(
        Board,
        object_id_field='owner_id',
        content_type_field='owner_model')"""
    boards = models.ManyToManyField(
        Board,
        related_name='project_boards',
        blank=True)

    def __str__(self):
        return self.title

"""class Boards(models.Model):
    title = models.CharField(max_length=255, blank=False, null=False)
    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='project_boards')
    owner_model = models.ForeignKey(
        ContentType, on_delete=models.CASCADE, default=ContentType.objects.get(model='project').id)
    owner_id = models.PositiveIntegerField()
    owner = GenericRelation(
        'projects.Project', object_id_field='owner_id', content_type_field='owner_model')
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title"""


class ProjectMembership(models.Model):
    class Access(models.IntegerChoices):
        MEMBER = 1
        ADMIN = 2

    project = models.ForeignKey(
        Project, on_delete=models.CASCADE)
    member = models.ForeignKey(
        User, on_delete=models.CASCADE)
    access_level = models.IntegerField(choices=Access.choices, default=1)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.member.full_name} , {self.project.title}'

    class Meta:
        unique_together = ('project', 'member')
