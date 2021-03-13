wordList = ["arctic", "balaclava", "blanket", "blizzard", "boots", "chill", "chimney", "eggnog", "evergreen", "fireplace", "firewood", "flannel",
	"fleece", "flu", "flurries", "fog", "freezing", "frigid", "frostbite", "frostbitten", "frosty", "frozen", "fruitcake", "furnace", "gale", "gingerbread", "glacial", "glacier",
	"gloves", "gust", "hailstone", "harsh", "heat", "heater", "hibernate", "hockey", "hoodie", "hypothermia", "ice", "iceberg", "icicle", "icy", "insulation", "jacket", "January",
	"log", "longjohns", "luge", "melt", "mittens", "muffler", "nippy", "overcast", "overcoat", "overshoes", "parka", "pinecone", "polar", "pullover", "quilt", "radiator", "raw",
	"reindeer", "scarf", "shiver", "skate", "ski", "sled", "sledge", "sleet", "slippery", "slush", "sneeze", "sniffle", "snowball", "snowbound", "snowfall", "snowflake", "snowman",
	"snowplow", "snowstorm", "snowy", "socks", "solstice", "storm", "stove", "sugarplum", "sweater", "thaw", "thermometer", "toboggan", "turtleneck", "whiteout", "wind", "windy",
	"winter", "wintertime", "wintry", "wool"]

//Variables
var secretword = "";
var secretwordUnique = [];
var guessesSoFar = [];
var guessesLeft = 0;
var wins = 0;
var correctGuesses = [];

var secretwordText = document.getElementById("secretword");
var guessesSoFarText = document.getElementById("guessesSoFar");
var guessesLeftText = document.getElementById("guessesLeft");
var winsText = document.getElementById("wins");

//Functions
function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

function chooseWord() {
	//computer chooses and guesses set
	secretword = wordList[Math.floor(Math.random() * wordList.length)];
	guessesLeft = secretword.length + 5;
	secretwordUnique = secretword.split('');
	secretwordUnique = secretwordUnique.filter(onlyUnique);
}
//UpdateDOM
function writeCurrent() {
	var secretwordDOM = [];
	for (var i = 0; i < secretword.length; i++) {
		if (guessesSoFar.includes(secretword[i])) {
			secretwordDOM.push(secretword[i].toUpperCase());
		} else {
			secretwordDOM.push(" _ ");
		};
	}
	secretwordText.textContent = secretwordDOM.join(" ");
	guessesSoFarText.textContent = "Letters Guessed: " + guessesSoFar.join(" ").toUpperCase();
	guessesLeftText.textContent = "Incorrect Guesses Left: " + guessesLeft;
	winsText.textContent = "Wins: " + wins;
}
//Start new game when word is guessed
function resetGame() {
	guessesLeft = 0;
	guessesSoFar = [];
	guessesLeft = secretword.length + 5;
	chooseWord();
	writeCurrent();
}
//Initiate Game
chooseWord();
writeCurrent();
//Player guess a letter
document.onkeyup = function (event) {
	userGuess = event.key;
	//Check that letter hasn't been guessed
	if (guessesSoFar.includes(userGuess)) {
		//If letter has been guessed do nothing
		return;
	//Input is letter that has not been guessed    
	} else {
		guessesSoFar.push(userGuess);
		//check guess against secret word
		if (secretword.includes(userGuess)) {
			//if correct
			//Add guess to correct guess list
			correctGuesses.push(userGuess);
			writeCurrent();
			//check if all letters guessed
			if (correctGuesses.length === secretwordUnique.length) {
				writeCurrent();
				wins++;
				alert("You win! The secret word is " + secretword + ".");
				resetGame();
			}
		} else {
			//if incorrect
			guessesLeft--;
			if (guessesLeft === 0) {
				alert("You lost! The secret word was " + secretword + ".");
				resetGame();
			}
			writeCurrent();
		};
	}
};