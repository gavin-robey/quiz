const triviaData = []; // array of objects from JSON

// determines which URL to fetch
if(category === "all"){
    getQuizAPI(`https://the-trivia-api.com/api/questions?&limit=${quizLength}&difficulty=${difficulty}`);        
}
else{
    getQuizAPI(`https://the-trivia-api.com/api/questions?categories=${category}&limit=${quizLength}&difficulty=${difficulty}`);
}

/**
 * fetches a given url
 * parses JSON from url and adds it to the trivia data array
 * start timer
 * @param {String} url url to be fetched
 */
function getQuizAPI(url){
    fetch(url)
    .then(response => response.json())
    .then(json => {
        triviaData.length = 0;
        for(question of json){
            triviaData.push(question);
        }
        startTimer(duration);
        loadQuiz(0);
        quizLoop();
    })
    .catch(error => console.log(error));
}