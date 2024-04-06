from django.shortcuts import render, redirect

from articles.forms import ArticleForm
from articles.models import Article


def index(request):
    articles = Article.objects.all()

    return render(request, 'index.html', {'articles': articles})


def create_article(request):
    form = ArticleForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        return redirect('articles:index')
    return render(request, 'article_form.html', {'form': form})


