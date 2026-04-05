const startBtn = document.querySelector('.start-btn');
if (startBtn) {
    startBtn.onclick = () => {
        startBtn.textContent = "Loading...";
        setTimeout(() => {
            window.location.href = 'question.html';
        }, 1000);
    };
}

let timeLimit = 15;
let timeLeft = timeLimit;
let timerDisplay = document.querySelector(".timer-sec");
let timer;
let currentQuestion = 0;
let score = 0;

const questions = [
    {
        text: "1. What does HTML stand for?",
        choices: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyper Tool Management Language"
        ],
        correct: "Hyper Text Markup Language"
    },
    {
        text: "2. What does CSS stand for?",
        choices: [
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Computer Style System",
            "Colorful Style Syntax"
        ],
        correct: "Cascading Style Sheets"
    },
    {
        text: "3. Which language is used for web interactivity?",
        choices: ["JavaScript", "Python", "C++", "Java"],
        correct: "JavaScript"
    },
    {
        text: "4. In what year was Python first released?",
        choices: ["1989", "1991", "1995", "2000"],
        correct: "1991"
    },
    {
        text: "5. Who invented the World Wide Web?",
        choices: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Mark Zuckerberg"],
        correct: "Tim Berners-Lee"
    }
];

function startTimer() {
    clearInterval(timer);
    timeLeft = timeLimit;
    timerDisplay.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            goToNextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    if (currentQuestion < questions.length) {
        const q = questions[currentQuestion];
        const container = document.getElementById("question-container");

        let html = `<p>${q.text}</p>`;
        q.choices.forEach(choice => {
            html += `<button onclick="checkAnswer('${choice}')">${choice}</button>`;
        });

        container.innerHTML = html;
        document.getElementById("progress-text").textContent =
            (currentQuestion + 1) + " of " + questions.length + " Questions";

        startTimer();
    } else {
        clearInterval(timer);
        let percent = Math.round((score / questions.length) * 100);
        document.querySelector(".section").innerHTML = `
            <div class="result">
                <h2>Quiz Finished!</h2>
                <div class="circle" style="background: conic-gradient(plum ${percent}%, #ddd ${percent}% 100%);">
                    <span id="score-percent">${percent}%</span>
                </div>
                <p>You got ${score} out of ${questions.length} correct.</p>
                <button onclick="replayQuiz()">Replay</button>
                <button onclick="endQuiz()">End</button>
            </div>
        `;
    }
}

function checkAnswer(answer) {
    const q = questions[currentQuestion];
    if (answer === q.correct) {
        score++;
    }
    goToNextQuestion();
}

function goToNextQuestion() {
    currentQuestion++;
    loadQuestion();
}

function replayQuiz() {
    currentQuestion = 0;
    score = 0;
    document.querySelector(".section").innerHTML = `
        <div class="title">Quiztopia</div>
        <div class="timer">
            <div class="timer-text">Time Left</div>
            <div class="timer-sec">15</div>
        </div>
        <div id="question-container"></div>
        <div class="footer">
            <span id="progress-text">1 of ${questions.length} Questions</span>
        </div>
    `;
    timerDisplay = document.querySelector(".timer-sec");
    loadQuestion();
}

function endQuiz() {
    window.location.href = "index.html";
}

window.onload = loadQuestion;
