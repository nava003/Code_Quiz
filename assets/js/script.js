// Selection Declarations
var mainCard = document.querySelector('#mainCard');
var introCard = document.querySelector('#introCard');
var quizCard = document.querySelector('#quizCard');
var questDisplay = document.querySelector('#askQuestion');
var ansList = document.querySelector('#ansList');
var quizTimer = document.querySelector('#quizTimer');
var startBtn = document.querySelector('#startBtn');
var endCard = document.querySelector('#endCard');
var resultSentence = document.querySelector('#quizCongrats');
var ansResult = document.querySelector('#ansResult');
var highscoreCard = document.querySelector('#highscoreCard');
var scoreContainer = document.querySelector('#scoreContainer');
var backBtn = document.querySelector('#backBtn');
var clearBtn = document.querySelector('#clearBtn');

// Style Initalization
quizTimer.setAttribute("style", "display:none");
quizCard.setAttribute("style", "display:none");
endCard.setAttribute("style", "display:none");
ansResult.setAttribute("style", "display:none");
// highscoreCard.setAttribute("style", "display:none");

// Variable Declarations
var timeInterval = null;
var secRemain = 121;
var secPenalty = 21;
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
    }
];

// // // // // // // // // //
// Beginning of Functions //
function startTimer() {
    quizTimer.setAttribute("style", "display:block");

    timeInterval = setInterval(function () {
        secRemain--;
        quizTimer.textContent = "Time Remaining: " + secRemain;
        if (secRemain === 0) {
            quizOver();
        }
    }, 1000);
}

function startQuiz() {
    introCard.setAttribute("style", "display:none");
    quizCard.setAttribute("style", "display:flex;justify-content:space-between;align-items:flex-start;");

    generateQnA();
};

function generateQnA() {

    if (questCount < QnAList.length) {
        // Display Question w/ suggested answers
        questDisplay.textContent = "Question " + (questCount + 1) + ": " + QnAList[questCount].question;
        for (var i = 0; i < QnAList[questCount].answers.length; i++) {
            var optionBtn = document.createElement('button');
            // optionBtn.setAttribute("id", "option" + i);
            optionBtn.setAttribute("class", "choiceBtn");
            optionBtn.textContent = QnAList[questCount].answers[i];
            optionBtn.dataset.correct = QnAList[questCount].correctAns === i + 1;
            // console.log(optionBtn.dataset.correct);
            ansList.append(optionBtn);
            // console.log(optionBtn);
        }
    } else {
        quizOver();
    }
}

function quizOver() {
    clearInterval(timeInterval);
    quizTimer.textContent = "Quiz Over!";
    quizCard.setAttribute("style", "display:none");
    endCard.setAttribute("style", "display:block");

    var userScore = secRemain;

    resultSentence.textContent = "Congrats! You scored " + secRemain + " points!";

    var userInitials = document.querySelector("#userInitials").value;

    localStorage.setItem("Initials", userInitials);
    localStorage.setItem("Score", userScore);
}

function displayResult(boolean) {
    var booResult = boolean;

    ansResult.setAttribute("style", "display:block");

    if (booResult == true) {
        ansResult.textContent = "Correct!";
    } else {
        ansResult.textContent = "Incorrect!";
    }

    setTimeout(function () {
        ansResult.textContent = "";
        ansResult.setAttribute("style", "display:none");
    }, 2000);
}
// End of Functions  //
// // // // // // // //

// // // // // // // //
// Button Listeners //
startBtn.addEventListener('click', function () {
    startTimer();
    startQuiz();
});

ansList.addEventListener('click', function (event) {
    // console.log("I've been clicked");
    var eventTarget = event.target;
    if (eventTarget.matches(".choiceBtn")) {
        // console.log("It was a button!");
        // console.log(eventTarget.dataset.correct);
        if (eventTarget.dataset.correct == "true") {
            // console.log("Correct!");
            ansList.textContent = "";
            displayResult(true);

            questCount++;
            generateQnA();
        } else {
            ansList.textContent = "";
            displayResult(false);

            secRemain = secRemain - secPenalty;
            questCount++;
            generateQnA();
        }
    }
});


// End of Button Listeners //
// // // // // // // // // //