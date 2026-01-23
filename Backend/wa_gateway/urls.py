from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WATemplateViewSet, WAMessageLogListView, SendMessageView, BroadcastView

router = DefaultRouter()
router.register(r'templates', WATemplateViewSet)

urlpatterns = [
    path('logs/', WAMessageLogListView.as_view(), name='wa-logs'),
    path('send-message/', SendMessageView.as_view(), name='wa-send'),
    path('broadcast/', BroadcastView.as_view(), name='wa-broadcast'),
    path('', include(router.urls)),
]