
// number of times word was found before guesses run out
var wins = 0;

// number of attempts player has to find word
// guessCount needs to at least match word length
var guessCount = 0;

// all the letters the player has tried
// ignore a guess if letter is already in lettersUsed
var lettersUsed = "";

// the array of words
// make function to load array in random order
var words = []; // array to hold all words player will guess

// find # of char in longest word, make array that size
var characterElements = [];

// the key that the user pressed
var userInput = "";

// starts game
document.onkeyup = function(event) 
{
    userInput = event.key.toUpperCase();
    // get user input, only want A-Z
    var validInput = isValidInput(userInput);
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
    var wordsToUse = [];

    // must equal same length as wordsTo Use
    var resultArray = [];

    var arrayIndex = 0;

    while(wordsToUse.length != resultArray.length)
    {
        console.log("wordsToUse[" + i + "]: " +  wordsToUse[i]);

        // get random number, between 0 and length
        var rng = Math.floor(Math.random() * Math.floor(wordsToUse.length));
        
        // get the word at that index of wordsTouse
        // is that word already in resultArray?
        // array.indexOf(item, start)
        // if so: break and run loop again
        // if not: resultArray.push(wordsToUse[random#])
        // arrayIndex++;



        
                // need to look at this math more...

    }

    //return wordsToUse

}
 

