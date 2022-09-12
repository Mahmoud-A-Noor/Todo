from django.shortcuts import render
from rest_framework import viewsets ### allow us to define functions that match to common API object actions like : LIST, CREATE, RETRIEVE, UPDATE, etc.
from .serializers import TodoSerializer
from .models import Todo



class TodoViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all().order_by('title')
    serializer_class = TodoSerializer

