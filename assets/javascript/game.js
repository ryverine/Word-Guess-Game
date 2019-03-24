var words = []; //array to hold all words player will guess

// find # of char in longest word, make array that size
var spanElements = [];

//the key that the user pressed
var userInput = "";

//starts game
document.onkeyup = function(event) 
{
    userInput = event.key.toUpperCase();
    //get user input, only want A-Z
    var validInput = isValidInput(userInput);
}

function isValidInput(theInput)
{
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
 

