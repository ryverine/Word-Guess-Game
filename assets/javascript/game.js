// https://www.wikihow.com/Play-Hangman
// https://github.com/ryverine

var gameOverFlag = false;

// number of times word was found before guesses run out
var wins = 0;

// number of attempts player has to find word
var guessCount = 0; //should only tally incorrect guesses
var guessMax = 8; // traditional hangman allows for 8 incorrect guesses

// all the letters the player has tried
// ignore a guess if letter is already in lettersUsed
var lettersUsed = "";

// initialize array of words 
var words = buildWordArray();

// find # of char in longest word, make array that size
var characterElements = [   document.getElementById("charElement00"), 
                            document.getElementById("charElement01"), 
                            document.getElementById("charElement02"), 
                            document.getElementById("charElement03"), 
                            document.getElementById("charElement04"), 
                            document.getElementById("charElement05"), 
                            document.getElementById("charElement06"), 
                            document.getElementById("charElement07"), 
                            document.getElementById("charElement08"), 
                            document.getElementById("charElement09")];

var secretWordTester = "";

var secretWord = getSecretWord(0);

//only want to display letter blocks for number of letters in secretWord
initializeCharacterElements(secretWord.length);

// the key that the user pressed
var userInput = "";

var outputElement = document.getElementById("output");
var guessListElement = document.getElementById("guessList");
var numGuessesElement = document.getElementById("numGuesses");
var numWinsElement = document.getElementById("numWins");

logGameStats();

//testing function
function runTest()
{

}

// starts game
document.onkeyup = function(event) 
{
    if (!gameOverFlag)
    {
        userInput = event.key.toUpperCase();
        lettersUsed.toUpperCase();
        // get user input, only want A-Z

        if (isValidInput(userInput))
        {
            //test if letter has been used
            var letterAlreadyUsed = false;
            var letterIsInSecretWord = false;

            for (var i = 0; i < lettersUsed.length; i++)
            {
                if (userInput === lettersUsed.charAt(i))
                {
                    letterAlreadyUsed = true;
                    outputElement.textContent += " *** " + userInput + " has already been used.";
                    break;
                }
            }

            if (!letterAlreadyUsed)
            {
                lettersUsed += userInput;
                guessListElement.textContent += userInput + ", ";

                for (var j = 0; j < secretWord.length; j++)
                {
                    if (userInput === secretWord[j])
                    {
                        characterElements[j].textContent = userInput;
                        letterIsInSecretWord = true;
                    }
                }

                // only want to increment guessCount for incorrect guesses
                if (!letterIsInSecretWord)
                {
                    guessCount++;
                    numGuessesElement.textContent = guessCount;
                }

                if (hasSecretWordBeenFound())
                {
                    outputElement.textContent += " *** YOU FOUND THE SECRET WORD ***";
                    wins++;
                    numWinsElement.textContent = wins;

                    startNextRound();
                }
                /*else
                {
                    // guessCount >= guessMax
                    // show secretWord
                    // startNexRound
                }*/
            }
        }
        else
        {
            outputElement.textContent += " *** INPUT NOT ACCEPTED: " + userInput;
        }
    }

    logGameStats(); // take snap-shot of current game state
}


function isValidInput(theInput)
{
    console.log("*** isValidInput("+theInput+") ***");

    theInput = theInput.toUpperCase();

    var valid = false;

    var acceptedInput = [   "A","B","C","D","E","F","G",
                            "H","I","J","K","L","M","N",
                            "O","P","Q","R","S","T","U",
                            "V","W","X","Y","Z"];

    for (var i = 0; i < acceptedInput.length; i++)
    {
        if (theInput === acceptedInput[i])
        {
            valid = true;
            break;
        }
    }

    return valid;
}


// might need to scrap this:
function buildWordArray()
{
    console.log("*** buildWordArray() ***");

    var wordsToUse = [  "PEPSI",
                        "COKE",
                        "SPRITE",
                        "CHEERWINE"];

    var resultArray = []; // must equal same length as wordsToUse

    var arrayIndex = 0;

    while (wordsToUse.length != resultArray.length)
    {
        var randomNum = Math.floor(Math.random() * Math.floor(wordsToUse.length));
        
        var hasWordBeenUsed = false;

        for (var i = 0; i < resultArray.length; i++)
        {
            if (resultArray[i] === wordsToUse[randomNum])
            {
                hasWordBeenUsed = true;
            }
        }

        if (!hasWordBeenUsed)
        {
            resultArray.push(wordsToUse[randomNum]);
        }
    }

    return resultArray;
}


function getSecretWord(indexOfWord)
{
    console.log("*** getSecretWord("+indexOfWord+") ***");

    var resultArray = [];
    var theWord = "";

    // go through characters of word
    // add each character to resultArray

    for (var i = 0; i < words[indexOfWord].length; i++)
    {
        resultArray.push(words[indexOfWord].charAt(i));

        theWord += words[indexOfWord].charAt(i);
    }

    secretWordTester = theWord;

    //guessMax = resultArray.length;

    return resultArray;
}


function initializeCharacterElements(numOfLetters)
{
    //only want to display letter blocks for number of letters in secretWord

    console.log("*** initializeCharacterElements(" + numOfLetters + ") ***");

    // iterate througn characterElements and set default text
    // in relation to the number of characters in secretWord
    // uderscore should be in all elements up to length of secretWord
    for (var i = 0; i < characterElements.length; i++)
    {
        if (i < numOfLetters)
        {
            characterElements[i].textContent = "_";
        }
        else
        {
            characterElements[i].textContent = "";
        }
    }
}


function hasSecretWordBeenFound()
{
    console.log("*** hasSecretWordBeenFound() ***");

    var correctGuessCount = 0;

    for (var i = 0; i < characterElements.length; i++)
    {
        if (isValidInput(characterElements[i].textContent))
        {
            correctGuessCount++;
        }
    }

    if (correctGuessCount === secretWord.length)
    {
        return true;
    }
    else
    {
        return false;
    }
}


function startNextRound()
{
    console.log("*** startNextRound() ***");

    var nextWordIndex = words.indexOf(secretWordTester) + 1;
    console.log("nextWordIndex: " + nextWordIndex);

    if (nextWordIndex > (words.length - 1))
    {
        gameOver();
    }
    else
    {
        alert("NEXT ROUND");

        guessCount = 0;
        numGuessesElement.textContent = guessCount;

        lettersUsed = "";
        guessListElement.textContent = "";

        secretWord = getSecretWord(nextWordIndex);
        initializeCharacterElements(secretWord.length);
    }
}


function gameOver()
{
    console.log("*** gameOver() ***");

    var playAgain = confirm("GAME OVER" + "\n" +
            "You found " + wins + " of " + words.length + " words!" + "\n" +
            "Play again?");

    if (playAgain)
    {
        //reset
        gameOverFlag = false;

        outputElement.textContent = "";

        wins = 0;
        numWinsElement.textContent = wins;

        //guessMax = 0;
        guessCount = 0;
        numGuessesElement.textContent = guessCount;

        lettersUsed = "";
        guessListElement.textContent = "";

        words = buildWordArray();

        secretWordTester = "";
        secretWord = getSecretWord(0);

        initializeCharacterElements(secretWord.length);

        logGameStats();
    }
    else
    {
        gameOverFlag = true;
    }
}


// function to log current state of game
function logGameStats()
{
    console.log("***** CURRENT GAME STATS *****");

    console.log("userInput: " + userInput);

    console.log("gameOverFlag: " + gameOverFlag);

    console.log("wins: " + wins);

    console.log("guessCount: " + guessCount);

    console.log("guessMax: " + guessMax);

    console.log("lettersUsed: " + lettersUsed);

    console.log("words:");

    for (var i = 0; i < words.length; i++)
    {
        console.log(i + ": " + words[i]);
    }

    console.log("secretWordTester: " + secretWordTester);

    console.log("secretWord:");

    for (var j = 0; j < secretWord.length; j++)
    {
        console.log(j + ": " + secretWord[j]);
    }

    console.log("Visable Letters:");

    for (var k = 0; k < characterElements.length; k++)
    {
        console.log(k + ": " + characterElements[k].textContent);
    }

    console.log("******************************");
}
 



