
elKeyboardDiv = document.getElementById("keyboard")

function createKeyboard() {
    // create keyboard array of letters 
    lettersString = "abcdefghijklmnopqrstuvwxyz"
    lettersArray = lettersString.split("")

    lettersArray.forEach(letter => {
        letterButtonEl = document.createElement("div")
        letterButtonEl.className = "key-button"
        letterButtonEl.innerText = letter
        elKeyboardDiv.appendChild(letterButtonEl)
        
    });
    
    
    
}


// create display and start game 
createKeyboard()