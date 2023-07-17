// Selection Declarations
var mainCard = document.querySelector('#mainCard');
var introCard = document.querySelector('#introCard');
var quizCard = document.querySelector('#quizCard');
var endCard = document.querySelector('#endCard');
var highscoreCard = document.querySelector('#highscoreCard');
var quizTimer = document.querySelector('#quizTimer');
var ansList = document.querySelector('#ansList');
var ansResult = document.querySelector('#ansResult');
var scoreContainer = document.querySelector('#scoreContainer');
var startBtn = document.querySelector('#startBtn');
var submitBtn = document.querySelector('#submitBtn');
var backBtn = document.querySelector('#backBtn');
var clearBtn = document.querySelector('#clearBtn');

// Style Initalization
quizTimer.setAttribute("style", "display:none");
quizCard.setAttribute("style", "display:none");
endCard.setAttribute("style", "display:none");
ansResult.setAttribute("style", "display:none");
highscoreCard.setAttribute("style", "display:none");

// Variable Declarations
var timeInterval = null;
var secRemain = 121;
var secPenalty = 21;
var questCount = 0;
var initialList = [];
var scoreList = [];

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

    secRemain = 121;

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
    var questDisplay = document.querySelector('#askQuestion');
    questCount = 0;

    if (questCount < QnAList.length) {
        // Display Question w/ suggested answers
        questDisplay.textContent = "Question " + (questCount + 1) + ": " + QnAList[questCount].question;
        for (var i = 0; i < QnAList[questCount].answers.length; i++) {
            var optionBtn = document.createElement('button');
            optionBtn.setAttribute("class", "choiceBtn");
            optionBtn.textContent = QnAList[questCount].answers[i];
            optionBtn.dataset.correct = QnAList[questCount].correctAns === i + 1;
            ansList.append(optionBtn);
        }
    } else {
        quizOver();
    }
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

function quizOver() {
    clearInterval(timeInterval);
    
    var resultSentence = document.querySelector('#quizCongrats');
    
    quizTimer.textContent = "Quiz Over!";
    quizCard.setAttribute("style", "display:none");
    endCard.setAttribute("style", "display:block");

    resultSentence.textContent = "Congrats! You scored " + secRemain + " points!";
    
    scoreList.push(secRemain);

    localStorage.setItem("Score", JSON.stringify(scoreList));
}

function renderHighscore() {
    mainCard.setAttribute("style", "display:none");
    highscoreCard.setAttribute("style", "display:block");

    var storedInitials = JSON.parse(localStorage.getItem("Initials"));
    var storedScore = JSON.parse(localStorage.getItem("Score"));

    if (storedInitials !== null && storedScore !== null) {
        initialList = storedInitials;
        scoreList = storedScore;
    }

    scoreContainer.innerHTML = "";

    for (var i = 0; i < initialList.length; i++) {
        var initials = initialList[i];
        var score = scoreList[i];
        
        var pElement = document.createElement('p');
        pElement.textContent = initials + " - " + score;
        scoreContainer.append(pElement);
    }
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
    var eventTarget = event.target;
    if (eventTarget.matches(".choiceBtn")) {
        if (eventTarget.dataset.correct == "true") {
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

submitBtn.addEventListener('click', function() {
    var warnMsg = document.querySelector('#warnMsg');
    var userInitials = document.querySelector("#userInitials").value;

    // Initials validation check using Regular Expression
    var regIntExp = /\d+/g;
    var regSpcExp = /\s+/g;
    var regSpecExp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    if (userInitials === "") {
        warnMsg.textContent = "Error. Cannot be left blank.";
        return;
    } else if (regIntExp.test(userInitials)) {
        warnMsg.textContent = "Error. Cannot have numbers.";
        return;
    } else if (regSpcExp.test(userInitials)) {
        warnMsg.textContent = "Error. Cannot have spaces.";
        return;
    } else if (regSpecExp.test(userInitials)) {
        warnMsg.textContent = "Error. Cannot have special characters."
        return;
    }
    
    initialList.push(userInitials);
    userInitials.value = "";

    localStorage.setItem("Initials", JSON.stringify(initialList));

    renderHighscore();
});

backBtn.addEventListener('click', function() {
    quizTimer.setAttribute("style", "display:none");
    endCard.setAttribute("style", "display:none");
    highscoreCard.setAttribute("style", "display:none");
    mainCard.setAttribute("style", "display:block");
    introCard.setAttribute("style", "display:flex");
});

clearBtn.addEventListener('click', function() {
    scoreContainer.textContent = "";
});

// End of Button Listeners //
// // // // // // // // // //