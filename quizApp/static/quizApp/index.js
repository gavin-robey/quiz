let begin = document.getElementById('begin');
let category = document.getElementById('categories');
let difficulty = document.getElementById('difficulty');
let counter = 1; // starts at one because the initial page creation calls beginQuiz(0)
let correctCount = 0;
let incorrectCount = 0;
let selected;
let correctAnswer;
let triviaData = [];

// calls the quiz api with values selected from difficulty and category drop down menus
begin.addEventListener('click', () =>{
    if(category.value === "all"){
        getQuizAPI(`https://the-trivia-api.com/api/questions?&limit=10&difficulty=${difficulty.value}`);        
    }
    else{
        getQuizAPI(`https://the-trivia-api.com/api/questions?categories=${category.value}&limit=10&difficulty=${difficulty.value}`);
    }
});

// given a url, fetches api and puts this data in the triviaData array
// Using this, beginQuiz(0) is called as well as quiz loop
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

// Keeps track of which option was selected
function select(event){
    if(selected !== undefined){
        document.getElementById(selected).style.backgroundColor = '#313445';
    }
    selected = event.target.id;
    event.currentTarget.style.backgroundColor = "#4062F6";
}

// Each time next is clicked, 
function quizLoop(){
    let nextButton = document.getElementById('button');
    nextButton.addEventListener('click', () =>{
        if(counter === 10){
            // For some reason the quiz gets messed up after the second time running it
            // I refresh the page and it somehow works
            // Once a results page is created, there has to be a page refresh to start a new quiz
            refreshPage(); 
            return;
        }
        if(counter === 9){
            isCorrect();
            beginQuiz(counter);
            document.getElementById('button').textContent = "Results";
            counter++;
            return;
        }
        isCorrect();
        beginQuiz(counter);
        counter++;     
    });
}

// verifies if questions are correct and adds these values to a total 
function isCorrect(){
    if(selected === undefined){
        console.log("Please select an answer")
        return;
    }
    if(document.getElementById(selected).textContent === correctAnswer){
        correctCount++;
        document.getElementById('correct').textContent = correctCount;
    }else{
        incorrectCount++;
        document.getElementById('incorrect').textContent = incorrectCount;
    }
}

// reloads the page
function refreshPage(){
    window.location.reload();
} 

// Makes the quiz pop up visible and populates the quiz with quiz data
// There are 10 questions in the trivia data, this only populates data from one index from the trivia data array
function beginQuiz(index){
    let data = triviaData[index];
    correctAnswer = data.correctAnswer;
    document.getElementById('answerContainer').style.visibility='visible';
    document.getElementById('question').textContent = data.question;
    document.getElementById('1').textContent = data.correctAnswer;
    document.getElementById('2').textContent = data.incorrectAnswers[0];
    document.getElementById('3').textContent = data.incorrectAnswers[1];
    document.getElementById('4').textContent = data.incorrectAnswers[2];
}

