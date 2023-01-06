const nextButton = document.getElementById('nextButton');
const homeButton = document.getElementById('homeButton');
const themeBlue = "#4062F6";
const themeGrey = '#434861';
let counter = 1; // starts at one because the initial page creation calls loadQuiz(0)
let correctAnswer; 

/**
 * given an index, the data from the triviaData array is used to update UI of the project
 * The correct answer is stored in a global variable to be used elsewhere 
 * @param {Integer} index 
 */
function loadQuiz(index){
    let data = triviaData[index];
    correctAnswer = data.correctAnswer;
    document.getElementById('question').textContent = data.question;
    document.getElementById('option1').textContent = data.correctAnswer;
    document.getElementById('option2').textContent = data.incorrectAnswers[0];
    document.getElementById('option3').textContent = data.incorrectAnswers[1];
    document.getElementById('option4').textContent = data.incorrectAnswers[2];
}

// Each time next is clicked, the next index of the triviaData array is parsed
// UI is updated accordingly
// If the last index is reached, then the next button becomes a 'results' button
// This sends JSON to the results page of all the results data
function quizLoop(){
    nextButton.addEventListener('click', () =>{
        document.getElementById(selected).style.backgroundColor = themeGrey;
        nextButton.style.backgroundColor = themeGrey;
        if(counter < (triviaData.length - 1)){
            quizCounter();
        }else if(counter === (triviaData.length - 1)){
            quizCounter();
            document.getElementById('nextButtonText').textContent = "Results";
        }else{
            setAnswer(true); // in helper.js
            sendResults(); // in helper.js
        }
    });
}

/**
 * Sets question number text to the next question
 * Checks if the selected question is correct
 * updates point count UI 
 * updates accuracy UI
 * Then loads the next quiz question and updates the main counter
 */
function quizCounter(){
    document.getElementById('questionNumber').textContent = ++questionNumber;
    document.getElementsByTagName('title').textContent = `Question ${questionNumber}`;
    isCorrect(); // in helper.js 
    setAnswer(false); // in helper.js
    count(); // in animation.js 
    accuracy(); // in animation.js 
    loadQuiz(counter);
    counter++;   
}

/**
 * Keeps track of which answer was selected
 * If no answer was selected, then the current event target is set to the selected element
 * Enables the next button to be used
 * @param {EventObject} event 
 */
function select(event){  
    // If there was a previously selected element then it is deselected   
    if(selected !== undefined){
        document.getElementById(selected).style.backgroundColor = themeGrey;
    }
    selected = event.target.id; // current event target is set as the selected element
    event.currentTarget.style.backgroundColor = themeBlue;    
    nextButton.style.backgroundColor = themeBlue;
}