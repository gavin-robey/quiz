// Driver for all animations in results.html

/**
 * Animates any bar element that is passed in
 * @param {Integer} percentage 
 * @param {HTMLElement} element 
 */
function barAnimation(percentage, element){
    let pos = 0;
    let animateBar = setInterval(function(){
        if(pos == parseInt(percentage)){
            clearInterval(animateBar);
            return;
        }
        pos++;
        element.style.width = `${pos}%`;
    }, 20);
}

/**
 * Animates the circular loops throughout the project
 * @param {String} barId Id for the bar svg element
 * @param {String} textId Id for the text inside the svg element
 * @param {Integer} percentage percentage of how far the svg must travel in the animation
 * @param {String} text text for the text html element
 */
function loopAnimation(barId, textId, percentage, text){
    document.getElementById(barId).style.strokeDasharray = [percentage, 100];
    document.getElementById(textId).textContent = text;
}

// Section control's all loops in the project
loopAnimation('pointsCounter', 'points', percentage, points);
loopAnimation('accuracyCounter', 'accuracyText', accuracy, `${Math.ceil(accuracy)}%`);

// Section control's all bars in the project
barAnimation(correctPercentage, document.getElementById('correctBar'));
barAnimation(incorrectPercentage, document.getElementById('incorrectBar'));
barAnimation(timePercentage, document.getElementById('timeBar'));
barAnimation(totalPercentage, document.getElementById('questionsBar'));