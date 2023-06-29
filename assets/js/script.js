// ID Selection Declarations
var introDisplay = document.querySelector('#introCard');
var quizDisplay = document.querySelector('#quizCard');
var questDisplay = document.querySelector('#askQuestion')
var ansDisplay = document.querySelector('#quizList');
var quizTimer = document.querySelector('#quizTimer');
var startBtn = document.querySelector('#startBtn');

// Variable Declarations
var secRemain = 121;

// Object-Array Declarations
var questionsList = [{

}];
var answersList = [{

}];

// Style Initalization
quizTimer.setAttribute("style", "display:none");
quizDisplay.setAttribute("style", "display:none");

function startTimer() {
    quizTimer.setAttribute("style", "display:block");

    var timeInterval = setInterval(function() {
        secRemain--;
        quizTimer.textContent = "Time Remaining: " + secRemain;
        if(secRemain === 0) {
            clearInterval(timeInterval);
        }
    }, 1000);
}

function startQuiz() {
    introDisplay.setAttribute("style", "display:none");
    quizDisplay.setAttribute("style", "display:flex;justify-content: space-between;align-items: flex-start;");


};

// Button Listener
startBtn.addEventListener('click', function() {
    startTimer();
    startQuiz();
});