![logo](/Documentation/logo.png)

# Super Mario Word Guess

[Deployed app](https://ryverine.github.io/Word-Guess-Game/)

JavaScript "Hangman" style game with the wacky world of Super Mario as the theme. 

Player tries to guess the word by pressing alpha (A-Z) keys before their number of guesses runs out.

Functionality based around [traditional Hangman rules.](https://www.wikihow.com/Play-Hangman)

## Game Events

1. Page loads and words are randomly ordered, and first word is selected as secret word.

2. The letter holding elements on page relfect the number of characters in the secret word, by displaying underscore characters which correlate to the number of characters in the secret word.

3. Player presses key. Key must be a letter (A - Z), otherwise input is ignored and nothing happens.

4. Determine if that letter has already been used, if so do nothing.

5. If Player input has not been used yet, compare letter to each character of secret word.

 * If match is found letter appears in appropriate position on page.

 * If match is not found guess count is incremented.

6. Test to see if secret word has been found.

 * If found: increment win count, show image of related Super Mario character, get next secret word, clear letter guess list, and set guess count to 0;

 * If not found: test to see if player has used up all guesses (8), and if so start the next round with the next secret word. Otherwise, wait for next user input.


## Global Variables 

Description of variables used.


### gameOverFlag : boolean

Determines if the game has ended. Set to false on page load. 


### wins : integer

The number of times the player completed the secret word. Set to 0 on page load.


### guessCount : integer

The number of times the player made an incorrect guess about the characters of the secret word. Set to 8 on page load, and when a new secret word is selected. When `guessCount` reaches zero we pick the next secret word.

### guessMax : integer

The maximum number of **incorrect guesses** allowed. Set to 8 on page load. A correct guess will not increment guessCount. Note: no longer neccessary since we now count down to 0 for guesses.


### lettersUsed : string

This holds all the characters that the player has already used as guesses. Player input is compared to each character of this string to determine if that letter has already been used.

 * If so, nothing happens.

 * If not, the input is added to lettersUsed and then it is determined if this is a letter in the secret word.


### words[] : string array

Words is a array of the secret words. The array is initalized by calling the `buildWordArray()` function.


### characterElements[] : DOM element array

This is an array that hold references to the DOM elements that display the letters of the secret word.


### secretWordTester : string

A string representation of the secret word. It is set to blank by default, but is updated whenever `getSecretWord()` is called

### secretWordTracker[] : character array

Array that letters of the secret word are added to one at a time as they are guessed. This became neccessary when I started using images of letters to display the secret word, instead of text.

### secretWord[] : character array

This is an array where each index holds a character of the secret word. We initalize and update `secretWord[]` by calling `getSecretWord()`. This must happen after `words[]` is created.

### userInput : string

This holds the value of the key that the player entered and is set in the `onkeyup` event. We immediately test the value of userInput with `isValidInput()` to insure that it is a alpha charater (A-Z).

### outputElement : DOM element

The DOM element that displays message text to the player.

### guessListElement : DOM element

The DOM element that displays the list of previous guesses to the player. This is updated as lettersUsed is updated.

### numGuessesElement : DOM element

The DOM element that displays the number of **incorrect guesses** the player has made. This is updated as guessCount is updated.

### numWinsElement : DOM element

The DOM element that displays the number of times the player found the secret word. This is updated as wins is updated.

### goodGuessSound : Audio

This is the coin sound from Super Mario Bros 3. The sound is played when a letter is correctly guessed by the player. I set the volume to lowest possible value to still be heard.

### badGuessSound : Audio

This is the bump sound from Super Mario Bros 3. The sound is played when a letter is incorrectly guessed by the player. I set the volume to lowest possible value to still be heard.

### foundWordSound : Audio

This is the level complete sound from Super Mario Bros 3. The sound is played when the secret word is found by the player. I set the volume to lowest possible value to still be heard.

### missedWordSound : Audio

This is the player death sound from Super Mario Bros 3. The sound is played when the player runs out of guesses. I set the volume to lowest possible value to still be heard.

## Functions

Description of the functions used.


### runTest()

This function is empty. This was a utilily used to test functions and other code individually.


### isValidInput(theInput)

This function takes a string argument (the result of `onKeyUp`) and compares it to the predefined accpted input values (A - Z). A boolean value is returned.

 * If a match is found in the acceptedInput array, return true.

 * If a mathc is not found, return false.


### buildWordArray(numOfElements)

This function was added to provide some replay value. Instead of hard coding an array of words to use as the secret word, this function puts the predefined words into an array at a random order and then returns that new array. Two consecutive games will most likey not have the same order of words.

The diffrence between this function and the original `buildWordArray()` is that a larger pool of words is provided, and we randomly select words based on the value of `numOfElements`. This means that it is almost impossible for two games to have the same list of words in the same order.

A **for-loop** was used originally, but now we are using a **while-loop** to ensure that we always get an array of `numOfElements` length.

### getSecretWord(indexOfWord)

This function accepts a numeric argumant which relates to an index of the `words[]` array. The element at this specific index of the array is traversed letter by letter and added each letter is added to an individual index of a new array. At the same time, the `secretWordTester` variable is constructed as a string representation of the new array. The new array is then returned.

### initializeCharacterElements(numOfLetters)

This function takes in a numeric argument that relates to the number of characters in the secret word. For each letter in the secret word we dispaly an underscore character in the appropriate element of the `characterElements[]` array. For the rest of the element in the `characterElements[]` we set the text content to an empty space character. This shows the player the number of characters they need to guess for the specific secret word.

### hasSecretWordBeenFound()

This function is used to test if all the characters of the secret word have been found. We go through each element of the `characterElements[]` array and test the text content via the `isValidInput()` function. Since only alpha characters are allowed when they are found we keep a tally. If that tally is equal to the number of elements in the `secretWord[]` array then we know all letters of the secret word have been found, and therefore the function returns true. Otherwise, false is returned.

### startNextRound()

Once the current secret word is discovered (or number of guesses runs out) we use this function to move to the next secret word in the `words[]` array. First, we need to check to see if we are already on the last element of the `words[]` array, if so we call the `gameOver()` function. If there are more elements in the `words[]` array then we reset `guessCount` and `lettersUsed`. We set secretWord to the value of the next element in `words[]`, and we reset the on page elements to reflect the number of characters in the new secret word.


### addImgToPage(imgName)

Once a word has been found we want to display an image of the character. Images are saved in `character_bank` directory under `images` directory. Function accepts string argument which is the name of the character as defined in the `words[]` array. Character image file names must match character name in `words[]` array.


### gameOver()

Once the player has cycled through all the values in `words[]` the game is over. We show the player the number of words they found within the defined number of guesses, and we ask them if they want to play again. If not we set `gameOverFlag` to `true` so that nothing will happen on any further `onKeyUp` events. Otherwise, we reset the game.


### revealSecretWord()

Used to display secret word if the player could not find it by the time `guessCount` reaches zero;


### logGameStats()

This simply prints the values of the global variables to the console. 


## Things To Do

1. ~Remove good guesses from guess list.~

2. ~Problem where you guess the last letter and you get the "next round" message, but you don't see that final letter added to the page.~

3. ~Move to the next word when # of guesses runs out.~

4. ~Need to have character images set to equal width, and transparent backgrounds.~

5. ~Graphic design for index page.~

6. Special marking on character images for words that were not found? Red border around image?

7. ~Need Mario font.~

8. ~Resize all letter images.~

9. ~Guess count should start at 8 and decrease to 0.~

10. ~Get game sounds for corrct guess, incorrect guess, word found, and word not found.~

11. Game music to play in background? Get various Mario theme music and play a diifferent in background for each game. Need to have seemless loops. Also, would we need to pause music while other sounds play? 

12. Use SMB3 ground sprites as footer?

13. ~Find sprites to use as border around character display area?~

14. Add difficulty selector? Easy should be 10 of the most well know characters, and give more guesses. Normal will be the current game. For hard mode player has to find 25 words.

15. Add credits/thanks to the people that ripped the sprties/font that I have used for this page.

16. Add header row for spacing above page logo.

17. Add characters from newer Mario games (i.e galaxy, odyssey). Add more meme/joke images.

18. Find a way to allow for more characters in secret word.

19. Border of character display area should not be set as transparent, it should match the syk color. I think this is why we can see little squares of white between the blocks on the outsize edge.

20. Count the total number of consecutive games played. Tally number of all secret words found across all games. Show words found compared to total words provided (#games * 10), and then calculate a win percentage.

21. When `gameOverFlag` is `true`, display game over message on page. 





