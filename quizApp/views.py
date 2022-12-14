from django.shortcuts import render
from urllib import parse
import json

def index(request):
    return render(request, 'quizApp/index.html')

def questionPage(request):
    data = request.POST
    selection = {
        "category": data.get('categories'),
        "categoryName": data.get('categoryName'),
        "difficulty": data.get('difficulty'),
        "quizLength": data.get('length'),
    }
    return render(request, "quizApp/question.html", selection)

def resultsPage(request):
    resultsUrl = request.GET.get('resultsData')
    resultsUrl = resultsUrl.replace("/", "")
    results = json.loads(resultsUrl)

    rawUrl = fr"{resultsUrl}"
    rawUrl = rawUrl.replace(r'\"', "'")

    return render(request, "quizApp/results.html", {"results": results, "resultsString": rawUrl})