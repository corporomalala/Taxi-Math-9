"use strict";

var chkbx4calculator = document.querySelector("#chkbx4calculator"),
	inputsMoney = document.querySelectorAll(".js-input-money"),
	inputsPeople = document.querySelectorAll(".js-input-people"),
	contentsDistance = document.querySelectorAll(".js-toggle"),
	tagTotal = document.querySelector(".js-total");
	screen;

var mathScreen = document.querySelector('.js-math-screen'),
	keyboardDigits = document.querySelectorAll('.js-math-digit'),
	keyboardOperators = document.querySelectorAll('.js-math-operator'),
	keyboardEqual = document.querySelector('.js-math-equal'),
	keyboardDelete = document.querySelector('.js-math-delete'),
	mathResultDisplayed = false;

/*** EVENTS ***/
for (var i = 0; i < keyboardDigits.length; i++) {
	keyboardDigits[i].addEventListener("click", keyboardDigitsClicked);
}
for (var i = 0; i < keyboardOperators.length; i++) {
  keyboardOperators[i].addEventListener("click", keyboardOperatorsClicked);
}

keyboardEqual.addEventListener("click", keyboardEqualClicked);
keyboardDelete.addEventListener("click", keyboardDeleteClicked);

for (var i = 0; i < inputsMoney.length; i++) {
	inputsMoney[i].addEventListener("click", keyboardScreenChanged);
}
for (var i = 0; i < inputsPeople.length; i++) {
	inputsPeople[i].addEventListener("click", keyboardScreenChanged);
}
for (var i = 0; i < contentsDistance.length; i++) {
	contentsDistance[i].addEventListener("click", contentsDistanceToggled);
}
/*** EVENTS ***/

/*** FUNCTIONS ***/
function keyboardScreenChanged() {
	screen = this.querySelector(".u-input-box");
}
function contentsDistanceToggled() {
//	this.classList.remove("is-active");
}

function calculateAll() {
	var change = 0, total = 0,
		money = 0, people = 0,
		taxiFare = 15,
		rows = document.querySelectorAll(".js-row"),
		row,
		tagChange;
	for (var i = 0; i < rows.length; i++) {

		row = rows[i];
		change = parseInt(row.querySelector(".js-change").innerHTML);
		total += change;
	}
	tagTotal.innerHTML = total;

	money = parseInt(row.querySelector(".js-money").innerHTML);
	people = parseInt(row.querySelector(".js-people").innerHTML);

	change = parseFloat(money - (people * taxiFare));
	row.querySelector(".js-change").innerHTML = change;
}
function keyboardDigitsClicked() {
	if(chkbx4calculator.checked) { screen = mathScreen; }
		var currentString = screen.innerHTML;
		var lastChar = currentString[currentString.length - 1];

	if (mathResultDisplayed === false) {
		screen.innerHTML += this.innerHTML;
	} else if (mathResultDisplayed === true && lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
		mathResultDisplayed = false;
		screen.innerHTML += this.innerHTML;
	} else {
		mathResultDisplayed = false;
		screen.innerHTML = "";
		screen.innerHTML += this.innerHTML;
	}

	calculateAll();
}
function keyboardOperatorsClicked() {
	if(chkbx4calculator.checked) {
		screen = mathScreen;
		
		var currentString = screen.innerHTML;
		var lastChar = currentString[currentString.length - 1];

		if (lastChar === "+" || lastChar === "-" || lastChar === "×" || lastChar === "÷") {
			var newString = currentString.substring(0, currentString.length - 1) + this.innerHTML;
			screen.innerHTML = newString;
		} else if (currentString.length == 0) {
			console.log("enter a keyboardDigits first");
		} else {
			screen.innerHTML += this.innerHTML;
		}
	}
}
function keyboardEqualClicked() {
	if(chkbx4calculator.checked) {
		screen = mathScreen;
		
	var mathScreenString = screen.innerHTML;
	var keyboardDigitss = mathScreenString.split(/\+|\-|\×|\÷/g);
	var keyboardOperatorss = mathScreenString.replace(/[0-9]|\./g, "").split("");

  console.log(mathScreenString);
  console.log(keyboardOperatorss);
  console.log(keyboardDigitss);
  console.log("----------------------------");

  var divide = keyboardOperatorss.indexOf("÷");
  while (divide != -1) {
    keyboardDigitss.splice(divide, 2, keyboardDigitss[divide] / keyboardDigitss[divide + 1]);
    keyboardOperatorss.splice(divide, 1);
    divide = keyboardOperatorss.indexOf("÷");
  }

  var multiply = keyboardOperatorss.indexOf("×");
  while (multiply != -1) {
    keyboardDigitss.splice(multiply, 2, keyboardDigitss[multiply] * keyboardDigitss[multiply + 1]);
    keyboardOperatorss.splice(multiply, 1);
    multiply = keyboardOperatorss.indexOf("×");
  }

  var subtract = keyboardOperatorss.indexOf("-");
  while (subtract != -1) {
    keyboardDigitss.splice(subtract, 2, keyboardDigitss[subtract] - keyboardDigitss[subtract + 1]);
    keyboardOperatorss.splice(subtract, 1);
    subtract = keyboardOperatorss.indexOf("-");
  }

  var add = keyboardOperatorss.indexOf("+");
  while (add != -1) {
    keyboardDigitss.splice(add, 2, parseFloat(keyboardDigitss[add]) + parseFloat(keyboardDigitss[add + 1]));
    keyboardOperatorss.splice(add, 1);
    add = keyboardOperatorss.indexOf("+");
  }

		screen.innerHTML = keyboardDigitss[0];
		mathResultDisplayed = true;
	}
}
function keyboardDeleteClicked() {
	screen.innerHTML = "";
}
/*** FUNCTIONS ***/