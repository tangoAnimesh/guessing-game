let computerGuess;
let userGuessValue = [];
let maxGuess;

const audio = new Audio("./assets/src/sound/click_1.wav");
const wrongAns = new Audio("./assets/src/sound/wrong.wav");
const correctAns = new Audio("./assets/src/sound/correct_ans.wav");
const buzzer = new Audio("./assets/src/sound/buzz.wav");

const userInputValue = document.getElementById('inputBox');
const userTextUpdate = document.getElementById('textOp')
const userAttempts = document.getElementById('attempts');
const restartButton = document.getElementById('restart')

const easyButton = document.getElementById("easy");
const mediumButton = document.getElementById("medium");
const hardButton = document.getElementById("hard");


// Computer will generate a Random Number
const init = () => {
    computerGuess = Math.floor(Math.random() * 100)
    document.getElementById('newGameButton').style.display = "none"
    document.getElementById('gameArea').style.display = "none"

}

function startGame() {
    document.getElementById('welcome_screen').style.display = "none"
    document.getElementById('gameArea').style.display = "block"

}


easyButton.onclick = () => {
    audio.play()
    maxGuess = 10;
    startGame()
}

mediumButton.onclick = () => {
    audio.play()
    maxGuess = 5;
    startGame()
}

hardButton.onclick = () => {
    audio.play()
    maxGuess = 3;
    startGame()
}

// Restart Game ---------
function restartGame() {
    userInputValue.setAttribute("disabled", true)
    wrongAns.play();
    wrongAns.volume = 0.2;
    document.getElementById('newGameButton').style.display = "inline";

}

// After Click the restart Button or reload page
function newGameBegin() {
    audio.play()
    window.location.reload()
}

restartButton.onclick = () => {
    newGameBegin();
}


// GAME LOGIC ============
function compareGuess() {
    const userValue = Number(userInputValue.value);
    userGuessValue = [...userGuessValue, userValue];
    document.getElementById("guesses").innerHTML = userGuessValue;


    if (userGuessValue.length < maxGuess) {
        if (userValue > computerGuess) {
            userTextUpdate.innerHTML = "Your Guess is HIGH 😥";
            buzzer.play()
            userInputValue.value = "";
        } else if (userValue < computerGuess) {
            userTextUpdate.innerHTML = "Your Guess is LOW 😥";
            buzzer.play()
            userInputValue.value = "";

        } else {
            userTextUpdate.innerHTML = "Your Guess the CORRECT 😍";
            userInputValue.value = "";
            correctAns.play();
            restartGame();
        }

    } else {
        // Check the value Low or high 
        if (userValue > computerGuess) {
            userTextUpdate.innerHTML = `You Loose!! Correct Number was "${computerGuess}"`;
            userInputValue.value = "";
            restartGame();
        } else if (userValue < computerGuess) {
            userTextUpdate.innerHTML = `You Loose!! Correct Number was "${computerGuess}"`;
            userInputValue.value = "";
            restartGame();
        } else {
            userTextUpdate.innerHTML = "Your Guess the CORRECT 😍";
            userInputValue.value = "";
            correctAns.play()
            restartGame();
        }
    }

    userAttempts.innerHTML = `${userGuessValue.length}`;

}




userInputValue.onchange = () => {
    compareGuess()
}


// When Window will load then it will be generate
window.onload = () => {
    init();
}