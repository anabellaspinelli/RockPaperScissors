var computerObj = {
    options: ["Piedra", "Papel", "Tijera"],
    choice: undefined,
    choiceImg: undefined,
    score: 0, 
    scoreElem: document.getElementById("computer-score")
};

var userObj = {
    choice: undefined,
    choiceImg: undefined,
    score: 0, 
    scoreElem: document.getElementById("user-score")
};

var imgs = document.getElementsByTagName("img");
var buttonWrapper = document.getElementById("button-wrapper");
var result = document.getElementById("result");

var resultText;

/* THE WHOLE GAME IN A SINGLE LINE: */
buttonWrapper.addEventListener("click", turn, false);
/*==================================*/


/* FUNCTION DEFINITIONS 
===================================*/

/* Computer choice functions */

function selectComputerChoice() {
    var random = Math.round(Math.random() * (computerObj.options.length - 1));
    computerObj.choice = computerObj.options[random];
    computerObj.choiceImg = document.getElementById("pc-img-" + computerObj.choice);
}


/* User choice functions */

function defineUserChoice(e) {
    userObj.choice = e.target.value;
    userObj.choiceImg = document.getElementById("user-img-" + userObj.choice);
}

/* Game logic functions */

function hideOldImagesAndDisplayNew() {
    result.innerHTML = "";

    for (var i = 0; i < imgs.length; i++) {     
        imgs[i].style.display = "none";
        imgs[i].classList.remove("fade-in");
    };
    userObj.choiceImg.offsetWidth = userObj.choiceImg.offsetWidth; // http://css-tricks.com/restart-css-animation/ 
    userObj.choiceImg.classList.add("fade-in");
    userObj.choiceImg.style.display = "inline-block";
    userObj.choiceImg.style.visibility = "visible";
    computerObj.choiceImg.offsetWidth = computerObj.choiceImg.offsetWidth;
    computerObj.choiceImg.classList.add("fade-in");
    computerObj.choiceImg.style.display = "inline-block";
    computerObj.choiceImg.style.visibility = "visible";

}

function decideWinner() {
    if (userObj.choice == computerObj.choice) {
        resultText = "Empatan!";
    } else if ((userObj.choice == "Piedra" && computerObj.choice == "Tijera") || (userObj.choice == "Tijera" && computerObj.choice == "Papel") || (userObj.choice == "Papel" && computerObj.choice == "Piedra")) {
        resultText = "Ganaste!";
        userObj.score++;
    } else {
        resultText = "Perdiste!";
        computerObj.score++;
    }
}

function displayWinner() {
    result.innerHTML = resultText;
    userObj.scoreElem.innerText = userObj.score;
    computerObj.scoreElem.innerText = computerObj.score;
}

function showResultAfterAnimationEnds() {
    userObj.choiceImg.addEventListener("webkitAnimationEnd", displayWinner, false);
    userObj.choiceImg.addEventListener("animationend", displayWinner, false);
    userObj.choiceImg.addEventListener("oanimationend", displayWinner, false);
}
 
function turn(e) {
    selectComputerChoice();
    /* Protection to not trigger the event when #button-wrapper is clicked */
    if (e.target !== e.currentTarget) {
        /* User play determined by the ID of the button triggering the event */
        defineUserChoice(e);
    }
    hideOldImagesAndDisplayNew();
    decideWinner();
    showResultAfterAnimationEnds();
    displayScore();
    /* Avoid the event going further up the DOM after #button-wrapper */
    e.stopPropagation();
}