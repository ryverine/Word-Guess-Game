# The Word Guess Game

JavaScript "Hangman" style game.

Functionality based around [traditional Hangman rules.](https://www.wikihow.com/Play-Hangman)


## Game Events

1. Page loads and words are randomly ordered, and first word is selected as secret word.
2. The letter holding elements on page relfect the number of characters in the secret word, by displaying underscore characters which correlate to the number of characters in the secret word.
3. Player presses key. Key must be a letter (A - Z), otherwise input is ignored and nothing happens.
4. Determine if that letter has already been used, if so do nothing.
5. If Player input has not been used yet, compare letter to each character of secret word.
..* If match is found letter appears in appropriate position on page.
..* If match is not found guess count is incremented.
6. Test to see if secret word has been found.
..* If found: increment win count,  get next secret word, clear letter guess list, and set guess count to 0;
..* If not found: test to see if player has used up all guesses (8), and if so start the next round with the next secret word. Otherwise, wait for next user input.


## Global Variables 

Description of variables used.

### var gameOverFlag = false;
### var wins = 0;
### var guessCount = 0; //should only tally incorrect guesses
### var guessMax = 8; // traditional hangman allows for 8 incorrect guesses
### var lettersUsed = "";
### var words = buildWordArray();
### var characterElements
### var secretWordTester = "";
### var secretWord = getSecretWord(0);
### var userInput = "";
### var outputElement = document.getElementById("output");
### var guessListElement = document.getElementById("guessList");
### var numGuessesElement = document.getElementById("numGuesses");
### var numWinsElement = document.getElementById("numWins");


## Functions

Description of the functions used.

### runTest()
### isValidInput(theInput)
### buildWordArray()
### getSecretWord(indexOfWord)
### initializeCharacterElements(numOfLetters)
### hasSecretWordBeenFound()
### startNextRound()
### gameOver()
### logGameStats()