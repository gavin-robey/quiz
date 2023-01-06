let points = 0;
let timeTaken = 0;
let questionNumber = 1;
let correctCount = 0;
let incorrectCount = 0;
let selected; // represents the id of the selected answer
let userAnswers = [];

/**
 * verifies if questions are correct and adds these values to a total 
 * calls triggerDifference to animate changes in score
 * @returns none
 */
function isCorrect(){
    if(selected === undefined){ return; }
    if(document.getElementById(selected).textContent === correctAnswer){
        correctCount++;
        points += 100;
        triggerDifference('correctCountChange', 'correct', 'toGreen'); // in animation.js 
        triggerDifference('increaseScore', 'points', 'toPurple')
        document.getElementById('points').textContent = points;
        document.getElementById('correct').textContent = correctCount;
    }else{
        incorrectCount++;
        points -= 50;
        triggerDifference('decreaseScore', 'points', 'toRedFill');
        triggerDifference('incorrectCountChange', "incorrect", 'toRed');
        document.getElementById('points').textContent = points;
        document.getElementById('incorrect').textContent = incorrectCount;
    }
}

/**
 * Adds the current answer to userAnswers
 * Then sets selected to be undefined so long as the current answer is not the last question
 * @param {Boolean} isLastQuestion 
 */
function setAnswer(isLastQuestion){
    if(selected != undefined){
        userAnswers.push(document.getElementById(selected).textContent)
    }
    if(!isLastQuestion){
        selected = undefined;
    }
}

function goHome(event){
    location.replace('/');
}

/**
 * verifies whether the current answer is correct
 * Updates count UI 
 * updates accuracy UI
 * creates results object 
 * Sends Object to results.html to be used in displaying results
 */
function sendResults(){
    isCorrect();
    count();
    accuracy();
    let results = {
        "correctQuestions": correctCount,
        "incorrectQuestions": incorrectCount,
        "points": points,
        "accuracy": (correctCount / (correctCount + incorrectCount)) * 100,
        "timeTaken": timeTaken,
        "questionsRemaining": (quizLength - questionNumber) + 1,
        "correctAnswers": allCorrectAnswers(),
        "quizLength": quizLength,
        "totalTime": duration,
        "totalAnswered": correctCount + incorrectCount,
        "userAnswers": userAnswers,
    }
    var resultsJSON = encodeURIComponent(JSON.stringify(results));
    location.replace(`results/?resultsData=${resultsJSON}`);
}

/**
 * Gets data from triviaData, and pushes these results in an array of objects
 * This data is used in results.html
 * @returns {Array of Objects} 
 */
function allCorrectAnswers(){
    const allCorrectAnswers = [];
    for(object of triviaData){
        allCorrectAnswers.push({
            "question": object.question, 
            "correctAnswer": object.correctAnswer, 
            "incorrectAnswers": object.incorrectAnswers
        })
    }
    return allCorrectAnswers;
}