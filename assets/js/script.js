// ID Selection Declarations
var introDisplay = document.querySelector('#introCard');
var quizDisplay = document.querySelector('#quizCard');
var questDisplay = document.querySelector('#askQuestion')
var ansDisplay = document.querySelector('#ansList');
var quizTimer = document.querySelector('#quizTimer');
var startBtn = document.querySelector('#startBtn');

// Style Initalization
quizTimer.setAttribute("style", "display:none");
quizDisplay.setAttribute("style", "display:none");

// Variable Declarations
var secRemain = 121;
var questCount = 0;

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
        }
    }, 1000);
}

function startQuiz() {
    introDisplay.setAttribute("style", "display:none");
    quizDisplay.setAttribute("style", "display:flex;justify-content:space-between;align-items:flex-start;");

    generateQnA();

    verifyAns();
};

function generateQnA() {
    // Display Question w/ suggested answers
    questDisplay.textContent = "Question " + (questCount + 1) + ": " + QnAList[questCount].question;
    for (var i = 0; i < QnAList[questCount].answers.length; i++) {
        var optionBtn = document.createElement('button');
        optionBtn.setAttribute("id", "option" + i)
        optionBtn.setAttribute("class", "choiceBtn");
        optionBtn.textContent = QnAList[questCount].answers[i];
        optionBtn.dataset.correct = QnAList[questCount].correctAns === i+1;
        ansDisplay.append(optionBtn);
    }
}

function verifyAns() {
    ansDisplay.addEventListener('click', function(event) {
        var eventTarget = event.target;
        if (eventTarget.matches(".choiceBtn")) {
            //console.log(event);
            if (eventTarget.dataset.correct == true) {

            } else {

            }


        }
    })
}

// Button Listeners
startBtn.addEventListener('click', function () {
    startTimer();
    startQuiz();
});