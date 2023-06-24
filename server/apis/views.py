from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import ToDoItem
from .serializers import ToDoItemSerializer

class ToDoItemViewSet(viewsets.ModelViewSet):
    serializer_class = ToDoItemSerializer

    def get_queryset(self):
        return ToDoItem.objects.all()

    def perform_create(self, serializer):
        serializer.save()
