from django.contrib import admin
from .models import ToDoItem
# Register your models here.

class ToDoItemAdmin(admin.ModelAdmin):
    list_display = ('id','title', 'completed', 'created_at', 'updated_at')

admin.site.register(ToDoItem, ToDoItemAdmin)