# hangman-webdev-labtest2
Hangman Game (Web version)
MADS4007 Lab Test 2

TEST DESCRIPTION
In this test, you will create a Javascript version of the classic game, HANGPERSON.
1. HOW THE GAME WORKS
See attached .mov file for a graphical overview of the game
● In HANGPERSON, a word is randomly chosen and displayed to the user as dashes
(_ _ _ _ ).
● The objective of the game is for the player to guess the word by selecting individual
letters from the English alphabet.
● Correct letters are displayed in their appropriate position in the word
● Incorrect letters are removed from the gameboard and cannot be re-selected.
2. WHAT YOU NEED TO DO
1. Javascript, implement the Hangperson game, per the requirements
2. Test you app in browser.
3. Submit finished project to dropbox by end of testing period.
3. STARTER CODE
Starter code is available on the course webpage.
You are allowed to modify the app.js file.
You are NOT allowed to modify:
● The HTML
● The image files or their file names
3
4. CODING GUIDELINES
1. Variables must be declared with either let or const
2. Functions must be declared using ES6 syntax, eg:
const abc = function(a,b) {
}
or arrow syntax. There are a variety of arrow syntax formats, any one of them are fine.
Example:
const abc = (a,b) => {
}
3. You are not allowed to use map(), filter() , reduce(), find() or foreach() functions
4
5. APP REQUIREMENTS
R1: STARTING and RESTARTING THE GAME
1. The player starts or resets the game by pressing the START GAME button.
2. When this button is pressed:
a. Clear all in-game variables
b. Reset all UI to default
c. Select a word from the word bank (see next requirement)
Resetting the UI to default includes:
● Clearing the debug word(R3)
● Resetting the chosen word to all dashes _ _ _ _ (R4)
● Hiding any hangman images (R7)
● Resetting chances remaining to 6 (R6),
● Hiding any you win/lose messages (R8)
● Setting up all the letter buttons so they can be clicked on (R5)
R2: GAME SELECTS RANDOM WORD FROM WORD BANK
1. On game start, the game must randomly choose a word from the following bank of
words:
● TORONTO
● PARIS
● LONDON
● MISSISSIPPI
.
The video shows extra words, like BEIJING and LISBON. You do not have to include
these extra words in your final solution. They were shown in video for demonstration
purposes only.
2. You may assume that words are always UPPERCASE.
3. Even though only 4 words are required for this test, you must write your code so it works
for any number of words.
5
R3: DEBUGGING THE APP
To assist with debugging the app, your app should display the randomly selected word in the
debug section of the app:
The corresponding section of HTML is here:
<div id="debug-actual-word">
<!-- @DEBUG: The actual word will be displayed here -->
DEBUG: write code to display the actual selected word here
</div>
R4: GAME DISPLAYS SELECTED WORD AS DASHES (_ _ _ _)
1. After selecting a word, the app must display the chosen word as a series of dashes,
separated by spaces. ( _ _ _ _ _)
2. The number of dashes must match the number of letters in the word.
3. Examples of this behaviour are shown in the table below:
Chosen Word How it appears in UI
JAVA _ _ _ _
LEMON _ _ _ _ _
6
Resources you may find helpful with this feature:
1. Creating a new array of a specific size: https://stackoverflow.com/a/34937412
2. Intializing an array with a specific set of values: https://www.w3schools.com/jsref/jsref_fill.asp
3. Outputting an array as a string, separated by a delimiter:
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
R5: GAME DETECTS IF WORD IS RIGHT OR WRONG
CASE 1: PLAYER CHOOSES A CORRECT LETTER
If a correct letter is chosen, the app must:
1. Update the _ _ _ display to show the letter in its correct position in the word
2. Display this message: “Correct!__ is in the word!”, where _ = the letter chosen
by player
3. Person cannot choose this letter again. HINT: see the .already-selected CSS
selector in styles.css
CASE 2: PLAYER CHOOSES AN INCORRECT LETTER
If the player chooses a letter that is not in the word:
1. Display this message: “Wrong! _ is not in the word”, where _ is the letter
chosen by player
7
2. Person cannot choose this letter again. HINT: see the .already-selected CSS
selector in styles.css
The app must continually update both the message and word display until the game is over.
R6: THERE IS A MAXIMUM NUMBER OF CHANCES
1. The player has 6 chances to guess the word.
2. Each incorrect guess reduces the number of chances remaining by 1.
R7: SHOW HANGPERSON AS A SEQUENCE OF IMAGES
1. The hangman is composed of a sequence of 6 images.
2. Each time the player guesses an incorrect letter, update the hangperson image to the
next image in the sequence.
3. Here is the sequence:
Default image final image
(chances = 6) (chances = 0)
8
R8: GAME OVER CONDITIONS
The game must detect when a game over occurs.
CASE 1: PLAYER WINS
1. The player wins if they successfully guess the word before they run out of chances.
2. When the player wins, display a YOU WIN message per screenshot:
Message should be displayed in the : <div id="results"> element.
CASE 2: PLAYER LOSES
1. The player loses if they run out of chances. (chances = 0)
2. When the player loses, display a YOU LOSE message per screenshot
:
Message should be displayed in the : <div id="results"> element.
R9: SAVING YOUR GAME
1. Include a button that lets the user SAVE their current game to local storage. Display a
popup indicating to the user that the information was saved.
9
2. Your game should save the following information:
a. The selected word
b. Number of chances remaining
3. This data should be represented as a Javascript object. Remember, a Javascript object
is also known as a dictionary.
4. You do not need to handle loading a game from memory, only the save.
