
// https://www.wikihow.com/Play-Hangman

// https://github.com/ryverine

// https://www.mariowiki.com/Super_Mario_Bros._3
// https://www.mariowiki.com/Super_Mario_Bros._2
// https://www.mariowiki.com/Paper_Mario:_The_Thousand-Year_Door
// https://mario.fandom.com/wiki/Category:Characters_in_Super_Mario_Odyssey

// https://help.github.com/en/articles/basic-writing-and-formatting-syntax

var gameOverFlag = false;
var wins = 0;
var guessCount = 0;
var guessMax = 8;
var lettersUsed = "";
var words = buildWordArray(10);

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
var secretWordTracker = [];
var secretWord = getSecretWord(0);
initializeCharacterElements(secretWord.length);

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
            var letterAlreadyUsed = false;
            var letterIsInSecretWord = false;

            for (var i = 0; i < lettersUsed.length; i++)
            {
                if (userInput === lettersUsed.charAt(i))
                {
                    letterAlreadyUsed = true;
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

                        characterElements[j].innerHTML = "<img src='assets/images/icons/big"+ secretWord[j] + ".png'>";

                        letterIsInSecretWord = true;

                        secretWordTracker[j] = userInput.trim();
                    }
                }

                // only want to increment guessCount for incorrect guesses
                if (!letterIsInSecretWord)
                {
                    guessCount++;
                    numGuessesElement.textContent = guessCount;

                    lettersUsed += userInput;
                    // guessListElement.textContent += userInput + ", ";

                    guessListElement.innerHTML += "<img src='assets/images/icons/small"+ userInput + ".png'>";

                }

                if (hasSecretWordBeenFound())
                {
                    outputElement.textContent += " *** YOU FOUND " + secretWordTester + " ***";
                    wins++;
                    numWinsElement.textContent = wins;

                    addCharacterToPage(secretWordTester);

                    // wait one second and then call startNexRound()
                    setTimeout(startNextRound,1000);
                }
                else
                {
                    if(guessCount >= guessMax)
                    {
                        // show secretWord
                        revealSecretWord();
                        addCharacterToPage(secretWordTester);
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


function buildWordArray(numOfElements)
{
    console.log("buildWordArray(" + numOfElements + ")");

    var wordsToUse = [  "MARIO","PRINCESS","PEACH","TOAD","LUIGI","YOSHI","BOWSER","DAISY","WARIO","WALUIGI",
                        "ROSALINA","TOADETTE","KAMEK","BIRDO","BOOMBOOM","SHYGUY","GOOMBA","KOOPA","BOBOMB","BOO",
                        "LARRY","MORTON","WENDY","IGGY","ROY","LEMMY","LUDWIG","PAULINE","DONKEYKONG","DIDDYKONG",
                        "GOOMBELLA","KOOPS","VIVIAN","BOBBERY","FLURRIE","MOWZ","BONETAIL","KAMMYKOOPA","GRODUS","MARILYN",
                        "BELDAM","DARKBONES","CORTEZ","DOOPLISS","GRUBBA","RAWKHAWK","BLOOPER","HOOKTAIL","ANGRYSUN","PUNIO",
                        "CHAINCHOMP","CHEEPCHEEP","FIREBRO","FLAMECHOMP","FIRESNAKE","LAVALOTUS","MUNCHER","PARABEETLE","PARAGOOMBA","PTOOIE",
                        "ROTODISC","SLEDGEBRO","SPIKE","SPINY","STRETCH","SUPERMARIO","TANOOKI","RACCOON","HOTFOOT","FIRESUIT",
                        "FROGSUIT","KURIBO","HAMMERBRO","JELECTRO","STARMAN","HAMMERSUIT","MAGICWING","SUPERLEAF","MUSHROOM","COBRAT",
                        "BEEZO","NINJI","HOOPSTER","PHANTO","TWEETER","MOUSER","TRYCLYDE","FRYGUY","BUSTER","BUZZY",
                        "WART","CLAWGRIP","POKEY","PIDGIT","PANSER","OSTRO","SNIFIT","TROUTER","PORCUPO","FLURRY",
                        "ALBATOSS","PIRANHA","DANKEYKANG","BOWSETTE","KOOPIEKOO"];

                        //"BUZZYBEETLE",

    var resultArray = [];

    var arrayIndex = 0;

    var wordStr = "";

    for (var i = 0; i < numOfElements; i++)
    {
        var randomNum = Math.floor(Math.random() * Math.floor(wordsToUse.length));

        if(!wordStr.includes(wordsToUse[randomNum] + ","))
        {
            wordStr += wordsToUse[randomNum] + ",";
            resultArray.push(wordsToUse[randomNum]);
        }
    }

    return resultArray;
}

/*
//the old function
function buildWordArray()
{
    console.log("buildWordArray()");

    var wordsToUse = ["MARIO","PRINCESS","PEACH","TOAD","LUIGI","YOSHI","BOWSER","DAISY","WARIO","WALUIGI"];

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
*/

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

    for (var j = 0; j < secretWordTester.length; j++)
    {
        secretWordTracker.push("[?]");
    }

    return resultArray;
}


function initializeCharacterElements(numOfLetters)
{

    console.log("initializeCharacterElements(" + numOfLetters + ")");

    for (var i = 0; i < characterElements.length; i++)
    {
        if (i < numOfLetters)
        {
            characterElements[i].innerHTML = "<img src='assets/images/icons/QBLOCK.png'>";
        }
        else
        {
            characterElements[i].innerHTML = "<img src='assets/images/icons/BRICK.png'>";
        }
    }
}


function hasSecretWordBeenFound()
{
    console.log("hasSecretWordBeenFound()");
    //console.log("secretWordTracker: " + secretWordTracker);

    var correctGuessCount = 0;

    for (var i = 0; i < secretWordTracker.length; i++)
    {
        if (isValidInput(secretWordTracker[i]))
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

    //console.log("nextWordIndex: " + nextWordIndex);

    if (nextWordIndex > (words.length - 1))
    {
        gameOver();
    }
    else
    {
        var keepPlaying = confirm("Continue to next word?");

        if(keepPlaying)
        {
            guessCount = 0;
            numGuessesElement.textContent = guessCount;

            lettersUsed = "";
            guessListElement.textContent = "";

            secretWordTracker = [];

            secretWord = getSecretWord(nextWordIndex);

            initializeCharacterElements(secretWord.length);
        }
        else
        {
            gameOverFlag = true;
        }

        logGameStats();
    }
}


function addCharacterToPage(imgName)
{
    console.log("addCharacterToPage("+imgName+")");

    var imgFilePath = "assets/images/character_bank/" + imgName + ".png";

    $("#imageHolder").prepend($("<span>", {class: "imgSpan"}).append($("<img>", {src: imgFilePath})));
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

        imageHolder.innerHTML = "";

        wins = 0;
        numWinsElement.textContent = wins;

        guessCount = 0;
        numGuessesElement.textContent = guessCount;

        lettersUsed = "";
        guessListElement.textContent = "";

        words = buildWordArray(10);

        secretWordTester = "";
        secretWordTracker = [];
        secretWord = getSecretWord(0);

        initializeCharacterElements(secretWord.length);
    }
    else
    {
        gameOverFlag = true;
    }

    logGameStats();
}


function revealSecretWord()
{
    console.log("revealSecretWord()");

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

    console.log("secretWordTracker: ");

    for (var l = 0; l < secretWordTracker.length; l++)
    {
        console.log(l + ": " + secretWordTracker[l]);
    }

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
 



