let test = document.createElement('h1');
let begin = document.getElementById('begin');
let category = document.getElementById('categories');
let difficulty = document.getElementById('difficulty');
let questionContainer = document.createElement('div');
let answers = document.createElement('form');
answers.setAttribute('class', "answerForm");
let container = document.createElement('div');
container.setAttribute('class', "answerContainer");

let triviaData = [];

begin.addEventListener('click', () =>{
    if(category.value === "all"){
        getQuizAPI(`https://the-trivia-api.com/api/questions?&limit=5&difficulty=${difficulty.value}`);
    }
    else{
        getQuizAPI(`https://the-trivia-api.com/api/questions?categories=${category.value}&limit=5&difficulty=${difficulty.value}`);
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
        questionContainer.innerHTML = "";
        answers.innerHTML = "";
        beginQuiz(0);
    })
    .catch(error => console.log(error));
}

function beginQuiz(index){
    let data = triviaData[index];

    let question = document.createElement('h2');
    question.textContent = data.question;
    questionContainer.appendChild(question);

    let correctAnswer = document.createElement('input');
    correctAnswer.setAttribute('type', "radio");
    correctAnswer.setAttribute('value', data.correctAnswer);
    correctAnswer.setAttribute('name', "answer");
    correctAnswer.setAttribute('id', "answer");

    let label = document.createElement('label');
    label.setAttribute('for', "answer");
    label.textContent = data.correctAnswer;

    let option = document.createElement('div');
    option.setAttribute("class", "option");
    option.appendChild(correctAnswer);
    option.appendChild(label);

    let submit = document.createElement('button')
    


    answers.appendChild(option)

    let count = 0;
    for(item of data.incorrectAnswers){
        
        let incorrectAnswer = document.createElement('input');
        incorrectAnswer.setAttribute('type', "radio");
        incorrectAnswer.setAttribute('value', item);
        incorrectAnswer.setAttribute('name', "answer");
        incorrectAnswer.setAttribute('id', "answer" + count);

        let label = document.createElement('label');
        label.setAttribute('for', "answer" + count);
        label.textContent = item;

        let option = document.createElement('div');
        option.setAttribute("class", "option");
        option.appendChild(incorrectAnswer);
        option.appendChild(label);

        answers.appendChild(option)
        count++;
    }
}

container.appendChild(questionContainer);
container.appendChild(answers);
document.body.appendChild(container);

