let duration = quizLength * 3;


/**
 * Makes desired element visible and triggers animation 
 * After 1200 milliseconds, the element is hidden
 * @param {String} id id for svg element
 * @param {String} textId id for text element 
 * @param {CSSAnimation} animationType css animation
 */
function triggerDifference(id, textId, animationType){
    let element = document.getElementById(id);
    let count = document.getElementById(textId);
    element.style.visibility = "visible";
    element.style.animation="fade 2s infinite";
    count.style.animation = `${animationType} 2s infinite`;
    setTimeout(function (){
        element.style.visibility = "hidden";
        element.style.animation="none";
        count.style.animation = "none";
    },1200)
}

/**
 * based on the time, a strokeDasharray is updated accordingly
 * each second that passes, 5 points are deducted
 * If time runs out, then results are sent to the results page and the results page opens
 * Points counter is updated
 * @param {Integer} duration Initial time on the timer
 */
function startTimer(duration) {
    var timeout = setTimeout(function () {
        var time = duration;
        var i = 1;
        var k = ((i/duration) * 100);
        var l = 100 - k;
        i++;
        document.getElementById("c1").style.strokeDasharray = [l,k];
        document.getElementById("c2").style.strokeDasharray = [k,l];
        document.getElementById("c1").style.strokeDashoffset = l;
        document.getElementById("counterText").innerHTML = duration - 1;
        var interval = setInterval(function() {
            if (i > time) {
                clearInterval(interval);
                clearTimeout(timeout);
                return;
            }
            k = ((i/duration) * 100);
            l = 100 - k;
            document.getElementById("c1").style.strokeDasharray = [l,k];
            document.getElementById("c2").style.strokeDasharray = [k,l];
            document.getElementById("c1").style.strokeDashoffset = l;
            document.getElementById("counterText").innerHTML = ((duration +1)-i) -1;
            timeTaken = i;
            if(i === duration){
                sendResults();
            }
            points -= (5 + incorrectCount);
            document.getElementById('points').textContent = points;
            i++;
            count();
        }, 1000);
    },0);
} 

/**
 * updates the count ring
 * changes the points counter by taking the total points and dividing by the total points possible
 * this updates the strokeDasharray
 */
function count(){
    let percentage = (points / (quizLength * 100)) * 100;
    document.getElementById('pointsCounter').style.strokeDasharray = [percentage, 100];
}

/**
 * updates the accuracy ring
 * calculates the percentage and updates the text to reflect this percentage
 */
function accuracy(){
    let total = correctCount + incorrectCount;
    var percentage = (correctCount / total) * 100;
    document.getElementById('accuracyCounter').style.strokeDasharray = [percentage, 100];
    document.getElementById('accuracyText').textContent = `${Math.ceil(percentage)}%`;
}