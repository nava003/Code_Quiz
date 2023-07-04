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
    quizDisplay.setAttribute("style", "display:flex;justify-content: space-between;align-items: flex-start;");

    var orderList = document.createElement('ol');
    ansDisplay.append(orderList);

    var questCount = 0;
    // Display Question w/ suggested answers
    questDisplay.textContent = "Question " + (questCount + 1) + ": " + QnAList[questCount].question;
    for (var i = 0; i < QnAList[questCount].answers.length; i++) {
        var listItem = document.createElement('li');
        listItem.textContent = QnAList[questCount].answers[i];
        orderList.append(listItem);
    }
};

// Button Listener
startBtn.addEventListener('click', function () {
    startTimer();
    startQuiz();
});