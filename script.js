
// keyboard to push new letter buttons to 
let elKeyboardDiv = document.getElementById("keyboard");
let elHiddenWordDiv = document.getElementById("hidden-word");
let elStrikesSpan = document.getElementById("strikes");

let secretWord = "polar bear";
// include space so it doesn't have to be guessed 
let guessedLetters = [" "];
let strikes = 0;


function updateHiddenWord() {
    let secretWordArray = secretWord.split("")
    elHiddenWordDiv.innerHTML = "";

    secretWordArray.forEach(letter => {
        letterDivEl = document.createElement("div");
        letterDivEl.className = "guess-letter";
        isGuessedLetter(letter, guessedLetters);
        letterDivEl.innerText = isGuessedLetter(letter, guessedLetters) ? letter: "";
        elHiddenWordDiv.appendChild(letterDivEl);
    })
}

function updateStrikes() {
    elStrikesSpan.innerText = strikes;
}

function isGuessedLetter(letter, guessedLetterArray) {
    let isGuessed = guessedLetterArray.includes(letter)
    return isGuessed
}

function createKeyboard() {
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


function handleGuess(e) {
    let isCorrect = secretWord.includes(e.target.innerText)
    guessedLetters.push(e.target.innerText)
    if (!isCorrect) {
        strikes++
    }
    updateHiddenWord()
    updateStrikes()
    e.target.removeEventListener("click", handleGuess)

    return isCorrect
    
}

// create display and start game 
updateHiddenWord()
createKeyboard()