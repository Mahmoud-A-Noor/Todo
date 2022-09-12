from django.urls import path
from . import views
from rest_framework import routers


router = routers.DefaultRouter()
router.register('todos', views.TodoViewSet, 'todos')

# urlpatterns = router.urls

urlpatterns = [
    
] + router.urls

"""
### router.urls ###

[
    <URLPattern '^todos/$' [name='todos-list']>, 
    <URLPattern '^todos\.(?P<format>[a-z0-9]+)/?$' [name='todos-list']>, 
    <URLPattern '^todos/(?P<pk>[^/.]+)/$' [name='todos-detail']>, 
    <URLPattern '^todos/(?P<pk>[^/.]+)\.(?P<format>[a-z0-9]+)/?$' [name='todos-detail']>, 
    <URLPattern '^$' [name='api-root']>, 
    <URLPattern '^\.(?P<format>[a-z0-9]+)/?$' [name='api-root']>
]

"""
