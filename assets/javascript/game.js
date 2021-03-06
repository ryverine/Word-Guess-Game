
var gameOverFlag = false;
var wins = 0;
var guessCount = 8;
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

numWinsElement.textContent = 0;
numGuessesElement.textContent = 8;

var goodGuessSound = new Audio("assets/audio/smb3_coin.wav");
var badGuessSound = new Audio("assets/audio/smb3_bump.wav");
var foundWordSound = new Audio("assets/audio/smb3_level_clear.wav");
var missedWordSound = new Audio("assets/audio/smb3_player_down.wav");

goodGuessSound.volume = 0.1;
badGuessSound.volume = 0.1;
foundWordSound.volume = 0.1;
missedWordSound.volume = 0.1;

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

                        goodGuessSound.play();

                        characterElements[j].innerHTML = "<img src='assets/images/icons/big"+ secretWord[j] + ".png'>";

                        letterIsInSecretWord = true;

                        secretWordTracker[j] = userInput.trim();
                    }
                }

                if (!letterIsInSecretWord)
                {
                    guessCount--;
                    numGuessesElement.textContent = guessCount;

                    lettersUsed += userInput;

                    badGuessSound.play();

                    guessListElement.innerHTML += "<img class ='smallLetter' src='assets/images/icons/small"+ userInput + ".png'>";
                }

                if (hasSecretWordBeenFound())
                {
                    outputElement.textContent += "** YOU FOUND " + secretWordTester + " **";
                    wins++;
                    numWinsElement.textContent = wins;

                    addCharacterToPage(secretWordTester);

                    foundWordSound.play();

                    // wait one second and then call startNexRound()
                    setTimeout(startNextRound,1000);
                }
                else
                {
                    if(guessCount === 0)
                    {
                        outputElement.textContent += "** YOU MISSED " + secretWordTester + " **";

                        revealSecretWord();

                        addCharacterToPage(secretWordTester);
                        
                        missedWordSound.play();

                        // wait one second and then call startNexRound()
                        setTimeout(startNextRound,1000);
                    }
                }
            }
        }
        else
        {
            cosole.log("Input Not Accepted: " + userInput);
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

    var resultArray = [];

    var wordsToUse = [  "MARIO","PRINCESS","PEACH","TOAD","LUIGI",
                        "YOSHI","BOWSER","DAISY","WARIO","WALUIGI",
                        "ROSALINA","TOADETTE","KAMEK","BIRDO","BOOMBOOM",
                        "SHYGUY","GOOMBA","KOOPA","BOBOMB","BOO",
                        "LARRY","MORTON","WENDY","IGGY","ROY",
                        "LEMMY","LUDWIG","PAULINE","DONKEYKONG","DIDDYKONG",
                        "GOOMBELLA","KOOPS","VIVIAN","BOBBERY","FLURRIE",
                        "MOWZ","BONETAIL","KAMMYKOOPA","GRODUS","MARILYN",
                        "BELDAM","DARKBONES","CORTEZ","DOOPLISS","GRUBBA",
                        "RAWKHAWK","BLOOPER","HOOKTAIL","ANGRYSUN","PUNIO",
                        "CHAINCHOMP","CHEEPCHEEP","FIREBRO","FLAMECHOMP","FIRESNAKE",
                        "LAVALOTUS","MUNCHER","PARABEETLE","PARAGOOMBA","PTOOIE",
                        "ROTODISC","SLEDGEBRO","SPIKE","SPINY","STRETCH",
                        "SUPERMARIO","TANOOKI","RACCOON","HOTFOOT","FIRESUIT",
                        "FROGSUIT","KURIBO","HAMMERBRO","JELECTRO","STARMAN",
                        "HAMMERSUIT","MAGICWING","SUPERLEAF","MUSHROOM","COBRAT",
                        "BEEZO","NINJI","HOOPSTER","PHANTO","TWEETER",
                        "MOUSER","TRYCLYDE","FRYGUY","BUSTER","BUZZY",
                        "WART","CLAWGRIP","POKEY","PIDGIT","PANSER",
                        "OSTRO","SNIFIT","TROUTER","PORCUPO","FLURRY",
                        "ALBATOSS","PIRANHA","DANKEYKANG","BOWSETTE","KOOPIEKOO",
                        "CAPPY"];

    while(resultArray.length < numOfElements)
    { 
        var randomNum = Math.floor(Math.random() * Math.floor(wordsToUse.length));

        if(resultArray.indexOf(wordsToUse[randomNum]) === -1)
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
            characterElements[i].textContent = "";
        }
    }
}


function hasSecretWordBeenFound()
{
    console.log("hasSecretWordBeenFound()");
 
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

    if (nextWordIndex > (words.length - 1))
    {
        gameOver();
    }
    else
    {
        var keepPlaying = confirm("Continue to next word?");

        if(keepPlaying)
        {
            guessCount = 8;
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

        guessCount = 8;
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

    for (var i = 0; i < secretWordTracker.length; i++)
    {
        characterElements[i].innerHTML = "<img src='assets/images/icons/big" + secretWord[i] + ".png'>";
    }
}


function logGameStats()
{
    console.log("***** CURRENT GAME STATS *****");

    console.log("userInput: " + userInput);

    console.log("gameOverFlag: " + gameOverFlag);

    console.log("wins: " + wins);

    console.log("guessCount: " + guessCount);

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
 



