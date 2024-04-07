from django.shortcuts import render, redirect, get_object_or_404

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


def edit_article(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    form = ArticleForm(request.POST or None, instance=article)
    if request.method == 'POST' and form.is_valid():
        form.save()
        return redirect('articles:index')
    return render(request, 'article_form.html', {'form': form})


def remove_article(request, article_id):
    article = get_object_or_404(Article, id=article_id)
    if request.method == 'POST':
        article.delete()
        return redirect('articles:index')
    return render(request, 'remove_article.html', {"article": article})
