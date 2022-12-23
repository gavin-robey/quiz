from django.shortcuts import render

def index(request):
    return render(request, 'quizApp/index.html')

def questionPage(request):
    quiz = {
        "question": "where is waldo",
        "answer1": "behind the penis",
        "answer2": "behind the tuba",
        "answer3": "inside the clown car",
        "answer4": "behind the beanie weenie",
    }
    return render(request, "quizApp/question.html", quiz)

def resultsPage(request):
    return render(request, "quizApp/results.html")