// unordered list where the player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
// button with the text "Guess!"
const guessButton = document.querySelector(".guess");
// text input where the player will guess a lettter
const letterInput = document.querySelector(".letter");
// empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph where the remaining guesses will display
const remainingGuesses = document.querySelector(".remaining");
// span inside the paragraph where the remaining guesses will display 
const remainingGuessesSpan = document.querySelector(".remaining span");
// empty paragrph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
// hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");
// words that the player will guess
const word = "magnolia";
// array containing all the letters the player guesses
const guessedLetters = [];

const placeholder = function(word) {
    const placeholderLetters = [];
    for (const letter of word) {
        // console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};
placeholder(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    //empty message paragraph
    message.innerText = "";
    // grab what was entered in the input
    const guess = letterInput.value;
    // make sure the input is a single letter
    const goodGuess = validateInput(guess);
   
    if (goodGuess) {
        makeGuess(goodGuess);   
    }
    letterInput.value = "";  
});

const validateInput = function(input){
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0) {
        message.innerText = "Please enter a letter.";
    } else if (input.length > 1) {
        message.innerText = "Please only enter a single letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    } else {
        return input;
    }   
};

const makeGuess = function(guess){
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};


