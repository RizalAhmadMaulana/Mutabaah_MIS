from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    MyTokenObtainPairView, ProfileView, ChangePasswordView, 
    UserManagementViewSet, MusyifViewSet, MusyifImportExcelView,
    SiswaViewSet, SiswaImportExcelView, UserImportExcelView
)

router = DefaultRouter()
router.register(r'users', UserManagementViewSet, basename='management-user')
router.register(r'musyif', MusyifViewSet, basename='data-musyif') # Endpoint: /api/musyif/
router.register(r'siswa', SiswaViewSet, basename='data-siswa')

urlpatterns = [
    path('login/', MyTokenObtainPairView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('musyif/import/', MusyifImportExcelView.as_view(), name='musyif-import-excel'),
    path('siswa/import/', SiswaImportExcelView.as_view(), name='siswa-import-excel'),
    path('users/import/', UserImportExcelView.as_view(), name='user-import-excel'),
    path('', include(router.urls)),
]