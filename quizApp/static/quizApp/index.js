let begin = document.getElementById('begin');
let category = document.getElementById('categories');
let difficulty = document.getElementById('difficulty');
let counter = 1;
let triviaData = [];

begin.addEventListener('click', () =>{
    if(category.value === "all"){
        getQuizAPI(`https://the-trivia-api.com/api/questions?&limit=10&difficulty=${difficulty.value}`);        
    }
    else{
        getQuizAPI(`https://the-trivia-api.com/api/questions?categories=${category.value}&limit=10&difficulty=${difficulty.value}`);
    }
});

function getQuizAPI(url){
    fetch(url)
    .then(response => response.json())
    .then(json => {
        triviaData.length = 0;
        for(question of json){
            triviaData.push(question);
        }
        beginQuiz(0);
        quizLoop();
    })
    .catch(error => console.log(error));
}

function quizLoop(){
    let nextButton = document.getElementById('button');
    nextButton.addEventListener('click', () =>{
        if(counter === 10){
            refreshPage(); // change this later to redirect to the results page
        }else if(counter === 9){
            // return and give results of the quiz
            console.log(counter);
            beginQuiz(counter)
            document.getElementById('button').textContent = "Results";
            counter++;
        }else{
            console.log(counter);
            beginQuiz(counter)
            counter++;
        }
    });
}

function refreshPage(){
    window.location.reload();
} 

function beginQuiz(index){
    let data = triviaData[index];
    document.getElementById('answerContainer').style.visibility='visible';
    document.getElementById('question').textContent = data.question;
    document.getElementById('option1').textContent = data.correctAnswer;
    document.getElementById('option2').textContent = data.incorrectAnswers[0];
    document.getElementById('option3').textContent = data.incorrectAnswers[1];
    document.getElementById('option4').textContent = data.incorrectAnswers[2];
}

