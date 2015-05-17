/*
	timothytw
*/

player_money = 5;
min = 1;
max = 3;
winNum = -1;
gameEnd = false;
hackCost = 3;
friendCost = 2;
santaCost = 5;
satanCost = 1;

function updateRange() {
	generateRandMax();
	document.getElementById("twoNum").innerHTML =  (min + " to " + max);
}

function generateRandMax() {
	max = Math.floor(Math.random() * ((max + Math.floor(Math.random() * (5 - 2)) + 2) - max)) + max;
}

function generateWinNumber() {
	winNum = Math.floor(Math.random() * (max - min)) + min;
}

function updateMoney() {
	document.getElementById("playerAmt").innerHTML = "$" + player_money;
}

function checkGameStatus() {
	if (player_money > 500) {
		document.getElementById("result").innerHTML = "Winner!";
		gameEnd = true;
	} else if (player_money < 1) {
		document.getElementById("result").innerHTML = "You are a bum now :'(<br/><input type='submit' value='Play Again' onclick='location.reload();'/>";
		gameEnd = true;
	}
	document.getElementById("betAmt").value = '';
	document.getElementById("guessNum").value = '';
}

function clearHelp() {
	document.getElementById("hackerGuess").innerHTML = "";
	document.getElementById("friendGuess").innerHTML = "";
	document.getElementById("santaGuess").innerHTML = "";
	document.getElementById("satanGuess").innerHTML = "";
}

function guess() {
	if (gameEnd) return; 
	var betAmt = document.getElementById("betAmt").value;
	var guessNum = document.getElementById("guessNum").value;
	if (betAmt > player_money || betAmt < 1 || isNaN(betAmt) || isNaN(guessNum)) {
		document.getElementById("result").innerHTML = "You think you are slick?";
	}
	else if (betAmt % 1 != 0) {
		document.getElementById("result").innerHTML = "Sorry coins are not accepted";
	} else if (guessNum == winNum) {
		player_money += 2*betAmt;
		document.getElementById("result").innerHTML = "You won $" + 2*betAmt + "! :)";
		updateRange();
	} else {
		player_money -= betAmt;
		document.getElementById("result").innerHTML = "Oops you lost $" + betAmt + " :(";
	}
	updateMoney();
	checkGameStatus();
	generateWinNumber();
	clearHelp();
}

function hackerGuess() {
	if (player_money >= hackCost && (player_money - hackCost) >= 0) {
		lower = winNum - (Math.floor(Math.random() * (3 - 1)) + 1);
		while (lower <= 0) {
			lower = winNum - (Math.floor(Math.random() * (3 - 0)) + 0);
		}
		upper = winNum + (Math.floor(Math.random() * (3 - 0)) + 0);
		while (upper > max) {
			upper = winNum + (Math.floor(Math.random() * (3 - 0)) + 0);
		}
		document.getElementById("hackerGuess").innerHTML = lower + " to " + upper;
		player_money -= hackCost;
		updateMoney();
	}
}

function friendWillGuess() {
	if (player_money >= friendCost && (player_money - friendCost) >= 0) {
		friendGuessChance = Math.floor(Math.random() * (100 - 1)) + 1;
		if (friendGuessChance > 10) {
			friendGuess = Math.floor(Math.random() * (max - min)) + min;
			document.getElementById("friendGuess").innerHTML = friendGuess;
		} else {
			document.getElementById("friendGuess").innerHTML = winNum;
		}
		//document.getElementById("friendGuess").innerHTML = 
		player_money -= friendCost;
		updateMoney();
	}
}

function santaWillGuess() {
	if (player_money >= santaCost && (player_money - santaCost) >= 0) {
		player_money -= santaCost;
		updateMoney();
		goodAns = Math.random() < 0.5 ? -1 : 1;
		if (goodAns > 0) {
			document.getElementById("santaGuess").innerHTML = winNum;
		} else {
			document.getElementById("santaGuess").innerHTML = Math.floor(Math.random() * (max - min) + min);
		}
	}
}

function satanWillGuess() {
	if (player_money >= satanCost && (player_money - satanCost) >= 0) {
		player_money -= satanCost;
		updateMoney();
		theBadGuess = Math.floor(Math.random() * (max - min)) + min;
		while (theBadGuess == winNum) {
			theBadGuess = Math.floor(Math.random() * (max - min)) + min;
		}
		document.getElementById("satanGuess").innerHTML = theBadGuess;
	}
}

console.log = function() {}