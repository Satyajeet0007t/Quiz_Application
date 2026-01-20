// --- Quiz Data ---
const quizData = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    choices: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: "What is the largest ocean on Earth?",
    choices: ["Atlantic", "Indian", "Arctic", "Pacific"],
    correctAnswer: "Pacific",
  },
  {
    question: "Most Followed Person in the World ??",
    choices: [
      "LeBron James",
      "Cristiano Ronaldo",
      "Johnny Depp",
      "Selena Gomez",
    ],
    correctAnswer: "Cristiano Ronaldo",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    choices: [
      "William Shakespeare",
      "Charles Dickens",
      "Mark Twain",
      "Leo Tolstoy",
    ],
    correctAnswer: "William Shakespeare",
  },
];

// --- State Variables ---
let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

// --- DOM Element References ---
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionText = document.getElementById("question-text");
const choicesList = document.getElementById("choices-list");
const nextBtn = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const scoreSpan = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");

// --- Core Functions ---
function startQuiz() {
  startBtn.classList.add("hidden");
  resultContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

function loadQuestion() {
  answerSelected = false;
  nextBtn.classList.add("hidden");
  choicesList.innerHTML = "";

  const currentQuiz = quizData[currentQuestionIndex];
  questionText.textContent = currentQuiz.question;

  currentQuiz.choices.forEach((choice) => {
    const choiceItem = document.createElement("li");
    choiceItem.textContent = choice;
    choiceItem.classList.add("choice-item");

    choiceItem.addEventListener("click", () =>
      handleAnswer(choice, choiceItem)
    );
    choicesList.appendChild(choiceItem);
  });
}

function handleAnswer(selectedAnswer, element) {
  if (answerSelected) return;

  answerSelected = true;
  nextBtn.classList.remove("hidden");

  const currentQuiz = quizData[currentQuestionIndex];

  if (selectedAnswer === currentQuiz.correctAnswer) {
    score++;
    element.classList.add("correct");
  } else {
    element.classList.add("incorrect");
  }

  document.querySelectorAll(".choice-item").forEach((item) => {
    item.classList.add("disabled");
    if (item.textContent === currentQuiz.correctAnswer) {
      item.classList.add("correct");
    }
  });
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  nextBtn.classList.add("hidden");

  scoreSpan.textContent = `${score} out of ${quizData.length}`;
}
function startQuiz() {
  // Remove the start button completely
  startBtn.remove();

  // Hide result container, show quiz container
  resultContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");

  currentQuestionIndex = 0;
  score = 0;
  loadQuestion();
}

// --- Event Listeners ---
startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", startQuiz);
