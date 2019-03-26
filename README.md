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

### gameOverFlag

Determines if the game has ended. Set to false on page load. 

### wins

The number of times the player completed the secret word. Set to 0 on page load.

### guessCount

The number of times the player made an incorrect guess about the characters of the secret word. Set to 0 on page load, and when a new secret word is selected.

### guessMax

The maximum number of **incorrect guesses** allowed. Set to 8 on page load. A correct guess will not increment guessCount.

### lettersUsed

This holds all the characters that the player has already used as guesses. Player input is compared to each character of this string to determine if that letter has already been used.
..* If so, nothing happens.
..* If not, the input is added to lettersUsed and then it is determined if this is a letter in the secret word.

### words[]

Words is a array of the secret words. The array is initalized by calling the buildWordArray() function.

### characterElements[]

This is an array that hold references to the DOM elements that display the letters of the secret word.

### secretWordTester

A string representation of the secret word. It is set to blank by default, but is updated whenever getSecretWord() is called

### secretWord[]

This is an array where each index holds a character of the secret word. We initalize and update secretWord[] by calling getSecretWord(). This must happen after words[] is created.

### userInput

This holds the value of the key that the player entered and is set in the onkeyup event. We immediately test the value of userInput with isValidInput() to insure that it is a alpha charater (A-Z).

### outputElement 

The DOM element that displays message text to the player.

### guessListElement = document.getElementById("guessList");

The DOM element that displays the list of previous guesses to the player. This is updated as lettersUsed is updated.

### var numGuessesElement = document.getElementById("numGuesses");

The DOM element that displays the number of **incorrect guesses** the player has made. This is updated as guessCount is updated.

### var numWinsElement = document.getElementById("numWins");

The DOM element that displays the number of times the player found the secret word. This is updated as wins is updated.

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