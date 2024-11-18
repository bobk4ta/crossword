const BOARD_SIZE = 10;
const CROSSWORD = [
  ["H", "E", "L", "L", "O", "", "", "", "", ""],
  ["", "", "", "", "A", "", "", "", "", ""],
  ["", "", "", "", "T", "E", "S", "T", "", ""],
  ["", "", "", "", "", "", "", "E", "", ""],
  ["", "", "", "", "", "", "", "X", "A", "M"],
  ["", "", "", "", "", "", "", "P", "", ""],
  ["", "", "", "", "", "", "", "L", "", ""],
  ["", "", "", "", "", "", "", "E", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", "", "", ""],
];

const CLUES = {
  across: [
    { number: 1, text: "A greeting", start: [0, 0], length: 5 },
    { number: 2, text: "Trial activity", start: [2, 4], length: 4 },
  ],
  down: [{ number: 3, text: "Evaluation or test", start: [0, 4], length: 5 }],
};

let score = 0;
let timerInterval = null;

const boardContainer = document.getElementById("board-container");
const cluesAcross = document.getElementById("clues-across");
const cluesDown = document.getElementById("clues-down");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");

function createBoard() {
  boardContainer.innerHTML = "";
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const cell = document.createElement("input");
      cell.type = "text";
      cell.maxLength = 1;
      cell.classList.add("cell");
      cell.dataset.empty = CROSSWORD[row][col] === "" ? "true" : "false";
      if (CROSSWORD[row][col] !== "") {
        cell.dataset.correct = CROSSWORD[row][col];
      }
      cell.addEventListener("input", () => {
        if (cell.value.toUpperCase() === cell.dataset.correct) {
          score += 10;
          scoreDisplay.textContent = `Score: ${score}`;
          cell.disabled = true;
        }
      });
      boardContainer.appendChild(cell);
    }
  }
}

function renderClues() {
  cluesAcross.innerHTML = "";
  cluesDown.innerHTML = "";

  CLUES.across.forEach((clue) => {
    const li = document.createElement("li");
    li.textContent = `${clue.number}: ${clue.text}`;
    cluesAcross.appendChild(li);
  });

  CLUES.down.forEach((clue) => {
    const li = document.createElement("li");
    li.textContent = `${clue.number}: ${clue.text}`;
    cluesDown.appendChild(li);
  });
}

function startTimer() {
  let seconds = 0;
  timerInterval = setInterval(() => {
    seconds++;
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    timerDisplay.textContent = `Time: ${mins}:${secs}`;
  }, 1000);
}

function validateAnswers() {
  const cells = document.querySelectorAll(".cell");
  let allCorrect = true;

  cells.forEach((cell) => {
    if (
      cell.dataset.correct &&
      cell.value.toUpperCase() !== cell.dataset.correct
    ) {
      cell.style.backgroundColor = "red";
      allCorrect = false;
    } else if (cell.dataset.correct) {
      cell.style.backgroundColor = "green";
    }
  });

  if (allCorrect) {
    clearInterval(timerInterval);
    alert(`Congratulations! You solved the crossword with a score of ${score}`);
  }
}

function resetBoard() {
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.value = "";
    cell.disabled = false;
    cell.style.backgroundColor = "white";
  });
  score = 0;
  scoreDisplay.textContent = `Score: ${score}`;
  clearInterval(timerInterval);
  startTimer();
}

function revealAnswers() {
  document.querySelectorAll(".cell").forEach((cell) => {
    if (cell.dataset.correct) {
      cell.value = cell.dataset.correct;
      cell.style.backgroundColor = "green";
    }
  });
}

document
  .getElementById("validate-btn")
  .addEventListener("click", validateAnswers);
document.getElementById("reset-btn").addEventListener("click", resetBoard);
document.getElementById("reveal-btn").addEventListener("click", revealAnswers);

createBoard();
renderClues();
startTimer();
