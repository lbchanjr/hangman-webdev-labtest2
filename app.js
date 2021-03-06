const checkGameStatus = function() {
  if (guessWord.indexOf("_") === -1) {
    // No more '_' left in guess word, player has won.
    gameOver = true;

    // Update status to indicate that we have a winner
    document.getElementById("results").innerText = `GAME OVER! YOU WIN!`
    return;

  } else if (chancesLeft === 0) {
    // Game is over, player has lost
    gameOver = true;

    // Update status to indicate that we have a winner
    document.getElementById("results").innerText = `GAME OVER! YOU LOSE!`
    return;
  }
}

const loadSavedGame = function() {
  const savedData = JSON.parse(localStorage.getItem("hangmanGame"));

  console.log(`Loaded game info is: ${savedData}`)

  // reload saved game info
  randomWord = savedData.selectedWord;
  chancesLeft = parseInt(savedData.chancesRemaining);
  guessWord = savedData.guessWord;


  const keyPressedInfoArray = savedData.keyPress;

  let elements = document.querySelectorAll(".letter");
  for (let i = 0; i < keyPressedInfoArray.length; i++) {
    if (keyPressedInfoArray[i] === true) {
      elements[i].classList.add("already-selected");
    }
  }

  // "Update chances left info"
  document.querySelector("span.chancesLabel").innerText = chancesLeft;

  const imageString = "img/00" + (MAX_CHANCES-chancesLeft + 1) + "-face.png";
  // Update the hangman image.
  document.getElementById("img-hangperson-status").src = imageString;
  // Display letter placeholders for the word to guess
  document.getElementById("word").innerText = guessWord;

  // Update result message based on game status.
  checkGameStatus();
  if (gameOver === false) {
    // Game is not yet over... Initialize result message
    document.getElementById("results").innerText = `Continue game by selecting a letter from the keyboard.`; 
  } 
    

}

// ---------------------------
// 1. Game setup
// ---------------------------

// constants
const DEFAULT_IMAGE = "001-face.png"
// @NOTE: your game must work for any size array!
//const POSSIBLE_WORDS = ["TORONTO", "PARIS", "LONDON", "MISSISSIPPI"]; 
const MAX_CHANCES = 6

// game variables
let randomWord;
let chancesLeft;
let guessWord;
let gameOver;

// Set UI to default at page reload
// - Initially clear the debug word.
// - Initially hide all hangman images.
// - Reset chances to 6
// - Hiding any win/lose message
// - setting up all keyboard to untouched state (implemented by default)
document.querySelector("#debug-actual-word").innerText = "";
document.getElementById("img-hangperson-status").src = "";
document.querySelector("span.chancesLabel").innerText = MAX_CHANCES;

if (localStorage.hasOwnProperty("hangmanGame") === true) {
  if (confirm("Do you want to load a previously saved game?")) {
    loadSavedGame();
  } 
}

const saveGame = function() {
  
  console.log("Save Game button pressed");  

  // Check if game has been started.
  if (randomWord !== undefined) {
    // Game was started, save game info.

    // Save the keyboard status so that we may be able to reload 
    // current keyboard state when game is loaded
    let keyPressStatus = [];
    let elements = document.querySelectorAll(".letter");
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].classList.contains("already-selected")) {
        keyPressStatus.push(true);
      } else {
        keyPressStatus.push(false);
      }
    }

    const saveGameInfo = {"selectedWord": randomWord, "chancesRemaining": chancesLeft, "keyPress": keyPressStatus, "guessWord": guessWord};
    alert("SAVING THE GAME!");
    localStorage.setItem("hangmanGame", JSON.stringify(saveGameInfo));
  } else {
    alert("NO GAME SAVED SINCE NO GAME WAS STARTED!");
  }
}

// const generateRandomWord = function() {
//   randomWord = undefined;
//   randomIndex = Math.floor(Math.random() * POSSIBLE_WORDS.length);
//   console.log("Random index: " + randomIndex)
//   randomWord = POSSIBLE_WORDS[randomIndex].toUpperCase();
//   setupGuessWord(randomWord);
//   document.querySelector("#debug-actual-word").innerText = `DEBUG: Selected word is: ${randomWord}`;
//   console.log(`Random word: ${randomWord}`);
// }

const generateRandomWord = function() {
  let endPoint = "https://random-word-api.herokuapp.com/word?number=1";
  randomWord = undefined;
  fetch(endPoint)
  .then((response)=>{
    return response.json();
  })
  .then((jsonData)=> {
    randomWord = jsonData[0].toUpperCase();

    setupGuessWord(randomWord);
    // document.querySelector("#debug-actual-word").innerText = `DEBUG: Selected word is: ${randomWord}`;
    console.log(`Random word: ${randomWord}`);
  })
  .catch((err)=>{
    console.log(`Error: ${err}`);
  });
}

const startGame = function() {
  alert("game start");
  console.log("game start");

  // Generate random word from array
  generateRandomWord();

  chancesLeft = MAX_CHANCES;
  gameOver = false;
  resetKeyboardStatus();

  document.querySelector("span.chancesLabel").innerText = chancesLeft;
  document.getElementById("img-hangperson-status").src = "img/001-face.png";

}

const setupGuessWord = function(word) {
    guessWord = "";
    for (let i = 0; i < word.length; i++) {
        guessWord += "_ ";
    }
    
    // Display letter placeholders for the word to guess
    document.getElementById("word").innerText = guessWord;

} 

const keyBankClicked = function(event) {

    if (gameOver === true || randomWord === undefined) {
      return;
    }

    let element = event.target;

    // Check if a letter was clicked
    if (element.classList.contains("letter") === true) {
      console.log("A letter was clicked");

      // Check if letter was previously selected.
      if (element.classList.contains("already-selected") === false) {
          // Letter was not yet selected.
          const selectedLetter = element.innerText;
          console.log("Letter clicked: " + selectedLetter);

          // Mark the letter as selected.
          element.classList.add("already-selected");

          // Check if letter is in the guess word and update placeholders or message info
          processSelectedLetter(selectedLetter);

      } else {
        console.log("Letter was already previously clicked. Doing nothing.");
      }

    } else {
      console.log("Non-letter element was clicked")
    }

}

const processSelectedLetter = function(letter) {
    
    let startIndex = 0;
    let letterFound = false;

    do {
      result = randomWord.indexOf(letter, startIndex);
      console.log(`Searching ${letter} starting at index ${startIndex} resulted in ${result}`);
      // check if a match has been found
      if (result !== -1) {

          console.log(`Replacing placeholder at index ${result}.`);
          // Indicate that a match was found.
          letterFound = true;

          // A match has been found, update teh startIndex.
          startIndex = result + 1;
          console.log(`New startIndex: ${startIndex}`);

          // Update the placeholder by replacing underscores with the guessed letter.
          replaceGuessWordCharAt(result * 2, letter);
      }
    } while (result != -1 && startIndex < randomWord.length);
    
    // Update guess word
    console.log(`Updated guess word: ${guessWord}`);
    
    // Check if there's a need to update the guess word
    if (letterFound === true) {
      // Letter was found in guess word
      document.getElementById("word").innerText = guessWord;
      document.getElementById("results").innerText = `CORRECT! ${letter} is in the word`; 

    } else {
      // Letter not found in guess word
      document.getElementById("results").innerText = `WRONG! ${letter} is not in the word`; 
      chancesLeft--;
    
      imageString = "img/00" + (MAX_CHANCES-chancesLeft + 1) + "-face.png";
      console.log(`New image to show: ${imageString}`);
      // Update the hangman image.
      document.getElementById("img-hangperson-status").src = imageString;

      // Update the chances left
      document.querySelector("span.chancesLabel").innerText = chancesLeft;
    }

    // Check game status
    checkGameStatus();
}

const replaceGuessWordCharAt = function(index, newChar) {
  if(index > guessWord.length-1) {
    return;
  } else {
    guessWord = guessWord.substr(0,index) + newChar + guessWord.substr(index+1);
  }
}

const resetKeyboardStatus = function() {
  let elements = document.querySelectorAll(".letter");
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].classList.contains("already-selected")) {
      elements[i].classList.remove("already-selected");
    }
  }
}

// -------------------
// EVENT LISTENERS
// -------------------

// start button: when clicked, start a new game
document.querySelector(".btn-start-game").addEventListener("click", startGame);

// save button: when clicked, save game to local storage
document.querySelector(".btn-save-game").addEventListener("click", saveGame);

document.querySelector(".letter-bank").addEventListener("click", keyBankClicked);

