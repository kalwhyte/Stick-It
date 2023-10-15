from projects.models import Project, Boards
from django.contrib.contenttypes.models import ContentType


project = Project.objects.get(id=1)

new_board = Boards.objects.create(
    title='New Board',
    owner_model=ContentType.objects.get(model='project'),
    owner_id=project.id,
    color='000000'
)

new_board.save()