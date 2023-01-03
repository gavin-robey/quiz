// Main driver code for results.html

var resultsArray = rawResultData.correctAnswers; // uses rawResultData from results.html type: array of objects
var userAnswers = rawResultData.userAnswers; // uses rawResultData from results.html type: array of strings
var quizIndex = 0; // determines the index of resultsArray to be used

// goes to the next set of questions and answers of the quiz results
document.getElementById('nextButton').addEventListener('click', ()=>{
    quizIndex++;
    loadQuizResults(quizIndex);
})

// goes to the previous set of questions and answers of the quiz results
document.getElementById('previousButton').addEventListener('click', ()=>{
    quizIndex--;
    loadQuizResults(quizIndex);
})

/**
 * Sets questions and answers given from the results array object
 * obtains data from the given index 
 * calls findWrongAnswer and hideButtons
 * @param {Integer} index 
 */
function loadQuizResults(index){
    let data = resultsArray[index];
    document.getElementById('question').textContent = data.question;
    document.getElementById('option1').textContent = data.correctAnswer;
    document.getElementById('option2').textContent = data.incorrectAnswers[0];
    document.getElementById('option3').textContent = data.incorrectAnswers[1];
    document.getElementById('option4').textContent = data.incorrectAnswers[2];
    findWrongAnswer(data, userAnswers[index]);
    hideButtons(index);
}

/**
 * If the page is not the first page, then the previous button becomes visible
 * If the page is the last page, then the next button becomes visible
 * This prevents out of bounds index errors and aids in UI
 * @param {Integer} index 
 */
function hideButtons(index){
    if(index >= 1){
        document.getElementById('previousButton').style.visibility = "visible";
    }else{
        document.getElementById('previousButton').style.visibility = "hidden";
    }
    if(index === resultsArray.length - 1){
        document.getElementById('nextButton').style.visibility = "hidden";
        document.getElementById('nextButton').style.float = "left";
    }else{
        document.getElementById('nextButton').style.visibility = "visible";
        document.getElementById('nextButton').style.float = "right";
    }
}

/**
 * Finds every answer that is incorrect, then sets the border to be red
 * Otherwise, the outline will be green
 * @param {Object} data data at the current index 
 * @param {String} userAnswer answer at the current index
 */
function findWrongAnswer(data, userAnswer){
    var allElements = document.getElementById("answerContainer").getElementsByClassName('option');
    for(htmlElement of allElements){
        if(htmlElement.textContent === userAnswer){
            setAnswerOutline(htmlElement, "5px solid #F24242", "99%", "0px 12px 24px -20px #000", "rgb(220, 220, 220)");
        }else{
            setAnswerOutline(htmlElement, "none", "95%", "none", "#b7b7b7");
        }

        if(htmlElement.textContent === data.correctAnswer){
            setAnswerOutline(htmlElement, "5px solid #4CC790", "99%", "0px 12px 24px -20px #000", "rgb(220, 220, 220)");
        }
    }
}

/**
 * Sets css for a valid html element
 * @param {HTMLParagraphElement} htmlElement // represents each 'option'
 * @param {String} border // CSS border styling ex. '5px solid #F24242'
 * @param {String} width // CSS percentage ex. '99%'
 * @param {String} boxShadow // CSS boxShadow ex. '0px 12px 24px -20px #000'
 * @param {String} color // CSS color ex. 'rgb(220, 220, 220)'
 */
function setAnswerOutline(htmlElement, border, width, boxShadow, color){
    htmlElement.style.border = border;
    htmlElement.style.width = width;
    htmlElement.style.boxShadow = boxShadow;
    htmlElement.style.color = color;
}

loadQuizResults(0);