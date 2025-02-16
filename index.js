var words = [
  'bananas',
  'grapes',
  'carousel',
  'milkshake',
  'javascript',
  'limousine',
  'chocolate',
  'programming',
  'meatloaf',
  'ukulele',
  'mango'
]


let currentWord = "";
let guessedLetters = [];
let incorrectLetters = [];
let remainingGuesses = 10;
let wins = 0;
let losses = 0;
let previousWord = "";

function startGame() {
  if (currentWord) {
    previousWord = currentWord;
  }

  currentWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  incorrectLetters = [];
  remainingGuesses = 10;

  updateUI();
}

function updateUI() {
  let displayedWord = currentWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join("");

  document.getElementById("word-to-guess").textContent = displayedWord;
  document.getElementById("previous-word").textContent = previousWord;
  document.getElementById("incorrect-letters").textContent = incorrectLetters.join(", ");
  document.getElementById("remaining-guesses").textContent = remainingGuesses;
  document.getElementById("wins").textContent = wins;
  document.getElementById("losses").textContent = losses;

  // Use requestAnimationFrame to ensure UI updates before resolving the game logic
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve();
    });
  });
}

function checkGameStatus() {
  let displayedWord = currentWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join("");

  if (displayedWord === currentWord) {
    wins++;
    startGame();
  } else if (remainingGuesses === 0) {
    losses++;
    startGame();
  }
}

document.addEventListener("keydown", async function (event) {
  let guessedLetter = event.key.toLowerCase();

  if (!guessedLetter.match(/^[a-z]$/) || guessedLetters.includes(guessedLetter) || incorrectLetters.includes(guessedLetter)) {
    return;
  }

  if (currentWord.includes(guessedLetter)) {
    guessedLetters.push(guessedLetter);
  } else {
    incorrectLetters.push(guessedLetter);
    remainingGuesses--;
  }
  await updateUI();
  checkGameStatus();
  
});


startGame();