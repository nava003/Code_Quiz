// Selection Declarations
var mainElement = document.getElementsByTagName('main');
var introDisplay = document.querySelector('#introCard');
var quizDisplay = document.querySelector('#quizCard');
var questDisplay = document.querySelector('#askQuestion')
var ansDisplay = document.querySelector('#ansList');
var quizTimer = document.querySelector('#quizTimer');
var startBtn = document.querySelector('#startBtn');
var ansResult = document.querySelector('#ansResult');

// Style Initalization
quizTimer.setAttribute("style", "display:none");
quizDisplay.setAttribute("style", "display:none");
ansResult.setAttribute("style", "display:none");

// Variable Declarations
var secRemain = 121;
var secPenalty = 9;
var resultTimer = 3;
var questCount = 0;

// LocalStorage Declarations
var userInitials = localStorage.getItem("Initials");
var userScore = localStorage.getItem("Score");

// Object-Array Declaration of QnA
var QnAList = [
    {
        question: "When declaring variables in JavaScript, which of the following is correct?",
        answers: [
            "var",
            "declare",
            "$",
            "have"
        ],
        correctAns: 1
    },
    {
        question: "When inspecting a webpage in HMTL, where does most of the content appear in?",
        answers: [
            "[html]",
            "[head]",
            "[body]",
            "[footer]"
        ],
        correctAns: 3
    },
    {
        question: "In CSS, how do you center a text?",
        answers: [
            "content: center",
            "text: center",
            "align: center",
            "text-align: center"
        ],
        correctAns: 4
    },
    {
        question: "What does API stand for?",
        answers: [
            "Applying Program Interaction",
            "Application Programming Interface",
            "Application Processing Interface",
            "Accessing Preferences Interface"
        ],
        correctAns: 2
    },
    {
        question: "Is Documentation important?",
        answers: ["Yes", "No"],
        correctAns: 1
    }];

function startTimer() {
    quizTimer.setAttribute("style", "display:block");

    var timeInterval = setInterval(function () {
        secRemain--;
        quizTimer.textContent = "Time Remaining: " + secRemain;
        if (secRemain === 0) {
            clearInterval(timeInterval);

            quizOver();
        }
    }, 1000);
}

function startQuiz() {
    introDisplay.setAttribute("style", "display:none");
    quizDisplay.setAttribute("style", "display:flex;justify-content:space-between;align-items:flex-start;");

    generateQnA();
};

function generateQnA() {
    // Display Question w/ suggested answers
    questDisplay.textContent = "Question " + (questCount + 1) + ": " + QnAList[questCount].question;
    for (var i = 0; i < QnAList[questCount].answers.length; i++) {
        var optionBtn = document.createElement('button');
        optionBtn.setAttribute("id", "option" + i)
        optionBtn.setAttribute("class", "choiceBtn");
        optionBtn.textContent = QnAList[questCount].answers[i];
        optionBtn.dataset.correct = QnAList[questCount].correctAns === i + 1;
        // console.log(optionBtn.dataset.correct);
        ansDisplay.append(optionBtn);
        // console.log(optionBtn);
    }
}

function displayResult(boolean) {
    var booResult = boolean;
    var resultInterval = setInterval(function () {
        resultTimer--;

        ansResult.setAttribute("style", "display:block");

        if (booResult == true) {
            ansResult.textContent = "Correct!";
        } else {
            ansResult.textContent = "Incorrect!";
        }

        if (resultTimer == 0) {
            clearInterval(resultInterval);
            ansResult.textContent = "";
            ansResult.setAttribute("style", "display:none");
        }
    }, 1000);
}

function removeAns() {
    var ansBtns = ansDisplay.getElementsByClassName("choiceBtn");
    for (var n = (ansBtns.length - 1); n > -1; n--) {
        ansBtns[n].remove();
    }
}

function quizOver() {

}

// Button Listeners
startBtn.addEventListener('click', function () {
    startTimer();
    startQuiz();
});

ansDisplay.addEventListener('click', function (event) {
    // console.log("I've been clicked");
    var eventTarget = event.target;
    if (eventTarget.matches(".choiceBtn")) {
        // console.log("It was a button!");
        // console.log(eventTarget.dataset.correct);
        if (eventTarget.dataset.correct == "true") {
            // console.log("Correct!");
            removeAns();
            displayResult(true);

            questCount++;
            generateQnA();
        } else {
            removeAns();
            displayResult(false);

            secRemain = secRemain - secPenalty;
            questCount++;
            generateQnA();
        }
    }
})