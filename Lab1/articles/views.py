from django.shortcuts import render

from articles.models import Article


def index(request):
    articles_list = Article.objects.all()

    return render(request, 'index.html', {'articles_list': articles_list})
