from django.urls import path
from . import views

app_name = 'articles'
urlpatterns = [
    path('', views.index, name='index'),
    path('create/', views.create_article, name='create_article'),
    path('edit/<int:article_id>/', views.edit_article, name='edit_article'),
    path('delete/<int:article_id>/', views.remove_article, name='remove_article'),
    path('logout/', views.logout_user, name='logout'),
    path('register/', views.register, name='register'),
    path('login/', views.user_login, name='login')
]