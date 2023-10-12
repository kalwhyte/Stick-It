from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task
from rest_framework import status

class TaskView(APIView):
    def get(self, request, *args, **kwargs):
        allTasks = Task.objects.all()
        print(allTasks)  # Add this line for debugging
        serialized = TaskSerializer(allTasks, many=True)
        print(serialized.data)  # Add this line for debugging
        return Response(serialized.data)
    def post(self, request, format=None):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

