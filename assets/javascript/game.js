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


function runTest()
{

}


document.onkeyup = function(event) 
{
    if (!gameOverFlag)
    {
        userInput = event.key.toUpperCase();
        lettersUsed.toUpperCase();

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

                    lettersUsed += userInput;
                    guessListElement.textContent += userInput + ", ";
                }

                if (hasSecretWordBeenFound())
                {
                    outputElement.textContent += " *** YOU FOUND THE SECRET WORD ***";
                    wins++;
                    numWinsElement.textContent = wins;

                    // wait one second and then call startNexRound()
                    setTimeout(startNextRound,1000);
                }
                else
                {
                    if(guessCount >= guessMax)
                    {
                        // show secretWord
                        revealSecretWord();
                        // wait one second and then call startNexRound()
                        setTimeout(startNextRound,1000);
                    }
                }
            }
        }
        else
        {
            outputElement.textContent += " *** INPUT NOT ACCEPTED: " + userInput;
        }
    }

    logGameStats();
}


function isValidInput(theInput)
{
    console.log("isValidInput("+theInput+")");

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


function buildWordArray()
{
    console.log("buildWordArray()");

    var wordsToUse = [  "MARIO",
                        "PRINCESS",
                        "PEACH",
                        "TOAD",
                        "LUIGI",
                        "YOSHI",
                        "BOWSER",
                        "DAISY",
                        "WARIO",
                        "WALUIGI",
                        "ROSALINA",
                        "TOADETTE",
                        "KAMEK",
                        "BIRDO",
                        "BOOMBOOM",
                        "SHYGUY",
                        "GOOMBA",
                        "KOOPA",
                        "BOBOMB",
                        "BOO",
                        "LARRY",
                        "MORTON",
                        "WENDY",
                        "IGGY",
                        "ROY",
                        "LEMMY",
                        "LUDWIG",
                        "PAULINE",
                        "DONKEYKONG",
                        "DIDDYKONG"];

    var resultArray = [];

    var arrayIndex = 0;

    while (wordsToUse.length != resultArray.length)
    {
        var randomNum = Math.floor(Math.random() * Math.floor(wordsToUse.length));
        // this gives a number between 0 and (wordsToUse.length - 1)
        // beacsue zero is included this will match the indexes of wordsToUse, not the number of elements
        
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
    console.log("getSecretWord("+indexOfWord+")");

    var resultArray = [];
    var theWord = "";

    for (var i = 0; i < words[indexOfWord].length; i++)
    {
        resultArray.push(words[indexOfWord].charAt(i));

        theWord += words[indexOfWord].charAt(i);
    }

    secretWordTester = theWord;

    return resultArray;
}


function initializeCharacterElements(numOfLetters)
{

    console.log("initializeCharacterElements(" + numOfLetters + ")");

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
    console.log("hasSecretWordBeenFound()");

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
    console.log("startNextRound()");

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
    console.log("gameOver()");

    var playAgain = confirm("GAME OVER" + "\n" +
            "You found " + wins + " of " + words.length + " words!" + "\n" +
            "Play again?");

    if (playAgain)
    {
        gameOverFlag = false;

        outputElement.textContent = "";

        wins = 0;
        numWinsElement.textContent = wins;

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


function revealSecretWord()
{
    for (var i = 0; i < characterElements.length; i++)
    {
        characterElements[i].textContent = secretWord[i];
    }
}


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
 



