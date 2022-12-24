from django.shortcuts import render
from urllib import parse
import json

def index(request):
    return render(request, 'quizApp/index.html')

def questionPage(request):
    dataUrl = request.GET.get('data')
    dataUrl = dataUrl.replace("/", "")
    data = json.loads(dataUrl)

    return render(request, "quizApp/question.html", {"data": data[int(request.GET.get('index'))], "dataUrl": dataUrl, "currentIndex": int(request.GET.get('index'))})

def resultsPage(request):
    return render(request, "quizApp/results.html")