
// keyboard to push new letter buttons to 
let elKeyboardDiv = document.getElementById("keyboard");
let elHiddenWordDiv = document.getElementById("hidden-word");
let elStrikesSpan = document.getElementById("strikes");
let elResetBtn = document.getElementById("reset-button")
elResetBtn.onclick = handleResetGame

let secretWord = "bear";
// include space so it doesn't have to be guessed 
let guessedLetters = [" "];
let strikes = 0;

function handleUpdateStrikes() {
    elStrikesSpan.innerText = strikes;
    return true
}

function handleUpdateHiddenWord() {
    let secretWordArray = secretWord.split("")
    // clear the hidden word before updating 
    elHiddenWordDiv.innerHTML = "";

    secretWordArray.forEach(letter => {
        letterDivEl = document.createElement("div");
        letterDivEl.classList.add("hidden-letter");
        let isGuessed = guessedLetters.includes(letter)
        if (isGuessed) {
            letterDivEl.innerText = letter;
            letterDivEl.classList.add("revealed-letter");
        }
        // handle spaces not having bottom border 
        if (letter == " ") {
            letterDivEl.classList.add("space-char");
        }
        elHiddenWordDiv.appendChild(letterDivEl);
    })
}


function handleCreateKeyboard() {
    // reset keyboard
    elKeyboardDiv.innerHTML = "";
    // create keyboard array of letters 
    let lettersString = "abcdefghijklmnopqrstuvwxyz"
    let lettersArray = lettersString.split("")
    
    lettersArray.forEach(letter => {
        let letterButtonEl = document.createElement("div")
        letterButtonEl.className = "key-button"
        letterButtonEl.innerText = letter
        elKeyboardDiv.appendChild(letterButtonEl)
        letterButtonEl.addEventListener("click", handleGuess)
        
    });
    
}

function checkGameStatus() {
    let gameStatus = "playing";
    let allLettersGuessed = true;

    for (let letter in secretWord) {
        if (!guessedLetters.includes(secretWord[letter])) {
            allLettersGuessed = false
        }
    }

    if (allLettersGuessed === true) {
        gameStatus = "win"
    }
    if (strikes >= 5) {
        gameStatus = "lose"
    }


    return gameStatus
}


function handleGuess(e) {
    let isCorrect = secretWord.includes(e.target.innerText)
    guessedLetters.push(e.target.innerText)
    if (!isCorrect) {
        strikes++
    }
    handleUpdateHiddenWord()
    handleUpdateStrikes()
    e.target.classList.add("key-button-guessed")
    e.target.removeEventListener("click", handleGuess)

    if (checkGameStatus() == "lose") {
        alert("You lose!")
    } else if (checkGameStatus() == "win") {
        alert("You win!")
    }
    
}

function handleResetGame() {
    guessedLetters = [" "];
    strikes = 0;

    handleCreateKeyboard();
    handleUpdateHiddenWord();
    handleUpdateStrikes();
    
}

// create display and start game 
handleUpdateHiddenWord()
handleCreateKeyboard()