// unordered list where the player's guessed letters will appear
const guessedLettersElement = document.querySelector(".guessed-letters");
// button with the text "Guess!"
const guessButton = document.querySelector(".guess");
// text input where the player will guess a lettter
const letterInput = document.querySelector(".letter");
// empty paragraph where the word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// paragraph where the remaining guesses will display
const remainingGuessesParagraph = document.querySelector(".remaining");
// span inside the paragraph where the remaining guesses will display 
const remainingGuessesSpan = document.querySelector(".remaining span");
// empty paragrph where messages will appear when the player guesses a letter
const message = document.querySelector(".message");
// hidden button that will appear prompting the player to play again
const playAgainButton = document.querySelector(".play-again");
// words that the player will guess
let word = "magnolia";
// array containing all the letters the player guesses
const guessedLetters = [];
// number of guesses the player starts with
let remainingGuesses = 8;
// fetch data from the word file
const getWord = async function(){
    const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt")
    const words = await request.text();
    // console.log(words);
    const wordArray = words.split("\n");
    // console.log(wordArray);
    selectRandomWord(wordArray);
    placeholder(word);
};
getWord();

const selectRandomWord = function(wordArray) {
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
};

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
        makeGuess(guess);   
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
        displayGuessedLetters();
        updateRemainingGuesses(guess);
        updateWordInProgress(guessedLetters);
    }
};

const displayGuessedLetters = function(){
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    const revealWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkifWin();
};

const updateRemainingGuesses = function(guess){
    const upperWord = word.toUpperCase();
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess}.`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Good guess! The word has the letter ${guess}.`;
    }
    if (remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="hightlight">${word}</span>.`;
        remainingGuessesParagraph.classList.add("hide");
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `only ${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkifWin = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    }
};


