// https://github.com/ryverine
// number of times word was found before guesses run out
var wins = 0;

// all the letters the player has tried
// ignore a guess if letter is already in lettersUsed
var lettersUsed = "";

// initialize array of words 
var words = buildWordArray();

// find # of char in longest word, make array that size
var characterElements = [
    document.getElementById("charElement00"),
    document.getElementById("charElement01"),
    document.getElementById("charElement02"),
    document.getElementById("charElement03"),
    document.getElementById("charElement04"),
    document.getElementById("charElement05"),
    document.getElementById("charElement06"),
    document.getElementById("charElement07"),
    document.getElementById("charElement08"),
    document.getElementById("charElement09")];

var secretWord = getSecretWord(0);

// number of attempts player has to find word
// guessCount needs to at least match word length
var guessCount = 0; //WHAT SHOULD BE THE MAX?

// the key that the user pressed
var userInput = "";

var outputElement = document.getElementById("output");
var guessListElement = document.getElementById("guessList");
var numGuessesElement = document.getElementById("numGuesses");

//testing function
function run()
{

}

// starts game
document.onkeyup = function(event) 
{
    userInput = event.key.toUpperCase();
    lettersUsed.toUpperCase();
    // get user input, only want A-Z

    if(isValidInput(userInput))
    {
        //test if letter has been used
        var letterAlreadyUsed = false;

        for (var i = 0; i < lettersUsed.length; i++)
        {
            if(userInput === lettersUsed.charAt(i))
            {
                letterAlreadyUsed = true;
                console.log("Letter already used: " + userInput);
                outputElement.textContent += " *** " + userInput + " has already been used.";
                break;
            }
        }

        if(!letterAlreadyUsed)
        {
            lettersUsed += userInput;
            guessListElement.textContent += userInput + ", ";

            guessCount++;
            numGuessesElement.textContent = guessCount;


            /*test the input against the secret word
            for (var j = 0; j < secretWord.length; j++)
            {
                if(userInput === secretWord[j])
                {
                    // put userInput in element 
                }
            }*/
        }

    }
    else
    {
        outputElement.textContent += " *** INPUT NOT ACCEPTED: " + userInput;
    }
}

function isValidInput(theInput)
{
    console.log("*** isValidInput("+theInput+") ***");

    theInput = theInput.toUpperCase();

    var valid = false;

    var acceptedInput = [
        "A","B","C","D","E","F","G","H","I",
        "J","K","L","M","N","O","P","Q","R",
        "S","T","U","V","W","X","Y","Z"];

    for (var i = 0; i < acceptedInput.length; i++)
    {
        if(theInput === acceptedInput[i])
        {
            valid = true;
            break;
        }
    }

    if(valid === true)
    {
        console.log("User entered: " + theInput);
    }
    else
    {
        console.log("User entered invalid character: " + theInput);
    }

    return valid;
}


// might need to scrap this:
function buildWordArray()
{
    console.log("*** buildWordArray() ***");

    // pre-defined values
    var wordsToUse = ["PEPSI",
                        "COKE",
                        "SPRITE",
                        "CHEERWINE"];

    // must equal same length as wordsTo Use
    var resultArray = [];

    var arrayIndex = 0;

    while(wordsToUse.length != resultArray.length)
    {
        console.log("wordsToUse[" + i + "]: " +  wordsToUse[i]);

        // get random number, between 0 and length
        var randomNum = Math.floor(Math.random() * Math.floor(wordsToUse.length));
        
        var hasWordBeenUsed = false;

        for (var i = 0; i < resultArray.length; i++)
        {
            if(resultArray[i] === wordsToUse[randomNum])
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

    // go through characters of word
    // add each character to resultArray

    for(var i = 0; i < words[indexOfWord].length; i++)
    {
        resultArray.push(words[indexOfWord].charAt(i));
    }

    return resultArray;
}

// function to log current state of game
function logGameStats()
{

}
 



