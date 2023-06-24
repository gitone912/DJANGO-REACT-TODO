from django.urls import include, path
from rest_framework import routers
from .views import ToDoItemViewSet

router = routers.DefaultRouter()
router.register(r'todo', ToDoItemViewSet, basename='todo')

urlpatterns = [
    path('api/', include(router.urls)),
]
