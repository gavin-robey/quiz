from django.shortcuts import render
from urllib import parse
import json

def index(request):
    return render(request, 'quizApp/index.html')

def questionPage(request):
    dataUrl = request.GET.get('data')
    dataUrl = dataUrl.replace("/", "")
    data = json.loads(dataUrl)

    triviaData = {
        "data": data[int(request.GET.get('index'))],
        "currentIndex": int(request.GET.get('index')),
        "length" : len(data),
    }
    
    return render(request, "quizApp/question.html", triviaData)

def resultsPage(request):
    return render(request, "quizApp/results.html")