from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from django.urls import reverse_lazy

from articles.forms import ArticleForm
from articles.models import Article


@login_required
def index(request):
    articles = Article.objects.all()

    return render(request, 'articles/index.html', {'articles': articles})


@login_required
def create_article(request):
    form = ArticleForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        return redirect('articles:index')
    return render(request, 'articles/article_form.html', {'form': form})


@login_required
def edit_article(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    form = ArticleForm(request.POST or None, instance=article)
    if request.method == 'POST' and form.is_valid():
        form.save()
        return redirect('articles:index')
    return render(request, 'articles/article_form.html', {'form': form})


@login_required
def remove_article(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    if request.method == 'POST':
        article.delete()
        return redirect('articles:index')
    return render(request, 'articles/remove_article.html', {"article": article})


def logout_user(request):
    logout(request)
    return redirect('articles:login')


def register(request):
    form = UserCreationForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        username = form.cleaned_data.get('username')
        raw_password = form.cleaned_data.get('password1')
        user = authenticate(username=username, password=raw_password)
        login(request, user)
        return redirect('articles:index')
    return render(request, 'auth/register.html', {'form': form})


def user_login(request):
    form = AuthenticationForm(request, data=request.POST or None)
    if request.method == 'POST' and form.is_valid():
        user = authenticate(**form.cleaned_data)
        if user is not None:
            login(request, user)
            return redirect('articles:index')
    return render(request, 'auth/login.html', {'form': form})
