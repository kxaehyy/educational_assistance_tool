const startBtn = document.querySelector('.start-btn');
if (startBtn) {
  startBtn.onclick = () => {
    window.location.href = 'query.html';
  };
}

let currentQuestion = 0;

const questions = [
  {
    text: "1. How much is the Tuition fee per semester excluding other fees?",
    answer: "₱20,000.00 per semester."
  },
  { 
    text: "2. How do I choose the right course for me?", 
    answer: "Consider your interests, strengths, and career goals. You may also consult with the Guidance Office for career counseling." 
  },
  {
    text: "3. What are the most in-demand courses today?", 
    answer: "Currently, IT, Nursing, Engineering, and Business Administration are among the most in-demand courses in the Philippines."
  }
];

function loadQuestion() {
  if (currentQuestion < questions.length) {
    const q = questions[currentQuestion];
    const container = document.getElementById("question-container");

    let html = `<p>${q.text}</p>`;
    html += `<button onclick="showAnswer('${q.answer}')">Show Answer</button>`;

    container.innerHTML = html;
    document.getElementById("progress-text").textContent =
      `Question ${currentQuestion + 1} of ${questions.length}`;
  } else {
    showResult();
  }
}

function showAnswer(answer) {
  const container = document.getElementById("question-container");
  const q = questions[currentQuestion]; 

  container.innerHTML = `
    <p>${q.text}</p>
    <p><strong>Answer:</strong> ${answer}</p>
    <button onclick="goToNextQuestion()">Next</button>
  `;
}

function goToNextQuestion() {
  currentQuestion++;
  loadQuestion();
}

function showResult() {
  const container = document.getElementById("question-container");
  container.innerHTML = `
    <p>You’ve reached the end of the assistance tool.</p>
    <button onclick="replay()">Replay</button>
    <button onclick="endQuiz()">End</button>
  `;
}

function replay() {
  currentQuestion = 0;
  loadQuestion();
}

function endQuiz() {
  window.location.href = "home.html";
}

window.onload = loadQuestion;
