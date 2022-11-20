from django.shortcuts import render

def index(request):
    return render(request, 'quizApp/index.html', {"testText": "Hello world I am making sure my django project is set up correctly"})