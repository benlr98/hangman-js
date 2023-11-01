"use strict"

// Hangman Class
class Hangman {
  constructor(maxTries) {
    this.word = "";
    this.maxTries = maxTries;
    this.guesses = [];
    this.remainingTries = maxTries;
  }

  async getRandomWord() {
    try {
        const response = await fetch("https://random-word-api.vercel.app/api?words=1");
        if (response.ok) {
            const data = await response.json();
            this.word = data[0].toLowerCase();
            return this.word;
        } else {
            throw new Error("Failed to fetch a random word...");
        }
        
    } catch (error) {
        console.error(error)
    }
  }

  makeGuess(letter) {
    letter = letter.toLowerCase();
    if (!this.isGameOver() && !this.guesses.includes(letter)) {
      this.guesses.push(letter);
      if (!this.word.includes(letter)) {
        this.remainingTries--;
      }
    }
  }

  displayWord() {
    let display = "";
    for (const char of this.word) {
      if (this.guesses.includes(char)) {
        display += char;
      } else {
        display += "_";
      }
    }
    return display;
  }

  revealWord() {
    this.guesses = this.word.split("");
  }

  isGameOver() {
    return this.isWordGuessed() || this.remainingTries <= 0;
  }

  isWordGuessed() {
    return this.word.split("").every((char) => this.guesses.includes(char));
  }

  async resetGame() {
    this.guesses = [];
    this.remainingTries = this.maxTries;
    this.word = '';
    await this.getRandomWord(); // Fetch a new random word
  }
}

// KeyboardButton Class
class KeyboardButton {
  constructor(letter, onButtonClick) {
    this.letter = letter;
    this.onButtonClick = onButtonClick;
    this.clicked = false;

    this.buttonElement = document.createElement("button");
    this.buttonElement.textContent = letter;
    this.buttonElement.classList.add("key-button");

    this.buttonElement.addEventListener("click", () => {
      this.clicked = true;
      this.buttonElement.classList.add("guessed");
      this.onButtonClick(letter);
      this.buttonElement.disabled = true;
    });
  }

  render(parentElement) {
    parentElement.appendChild(this.buttonElement);
  }
}

// Keyboard Class
class Keyboard {
  constructor(onButtonClick) {
    this.buttons = "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => {
      return new KeyboardButton(letter, onButtonClick);
    });
  }

  render(parentElement) {
    const keyboardElement = document.createElement("div");
    keyboardElement.classList.add("keyboard");
    this.buttons.forEach((button) => button.render(keyboardElement));
    parentElement.appendChild(keyboardElement);
  }
}


function handleGuess(letter) {
  hangman.makeGuess(letter);
  updateGameDisplay();
}

async function handleReset() {
    await hangman.resetGame();
    document.getElementById("keyboard-container").innerHTML = "";
    keyboard = new Keyboard(handleGuess);
    keyboard.render(document.getElementById("keyboard-container"));
    updateGameDisplay();
}

function handleGiveUp() {
    hangman.revealWord();
    updateGameDisplay();
    console.log("run")
}

function updateGameDisplay() {
  const wordDisplay = hangman.displayWord();
  const gameState = hangman.isGameOver()
    ? hangman.isWordGuessed()
      ? "You won!"
      : "You lost!"
    : `Tries left: ${hangman.remainingTries}`;
  document.getElementById("word-display").textContent = wordDisplay;
  document.getElementById("game-state").textContent = gameState;

}


async function startGame() {
    await hangman.getRandomWord();
    updateGameDisplay();
}



const maxTries = 6;
const hangman = new Hangman(maxTries);

// Create the reset button and add a click event listener
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', handleReset);

const giveUpButton = document.getElementById('give-up-button');
giveUpButton.addEventListener('click', handleGiveUp);

let keyboard = new Keyboard(handleGuess);
keyboard.render(document.getElementById("keyboard-container"));

startGame();
