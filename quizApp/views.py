from django.shortcuts import render
from urllib import parse
import json

def index(request):
    return render(request, 'quizApp/index.html')

def questionPage(request):
    data = request.POST
    selection = {
        "category": data.get('categories'),
        "difficulty": data.get('difficulty'),
        "quizLength": data.get('length'),
    }
    return render(request, "quizApp/question.html", selection)

def resultsPage(request):
    resultsUrl = request.GET.get('resultsData')
    resultsUrl = resultsUrl.replace("/", "")
    results = json.loads(resultsUrl)

    return render(request, "quizApp/results.html", {"results": results})