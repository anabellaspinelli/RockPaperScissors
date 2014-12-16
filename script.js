var computerObj = {
    options: ["Piedra", "Papel", "Tijera"],
    choice: undefined,
    choiceImg: undefined,
    score: 0
};

var userObj = {
    choice: undefined,
    choiceImg: undefined,
    score: 0
};

var imgs = document.getElementsByTagName("img");
var buttonWrapper = document.getElementById("button-wrapper");
var result = document.getElementById("result");

/* THE WHOLE GAME IN A SINGLE LINE: */
buttonWrapper.addEventListener("click", turn, false);
/*==================================*/


/* FUNCTION DEFINITIONS 
===================================*/

/* Computer choice functions */

function selectComputerChoice() {
    /* No uso Math.round() porque --> https://stackoverflow.com/questions/7377735/random-numbers-and-floor-vs-round-function/7377769#7377769 */
    /*var random = Math.round(Math.random() * (computerObj.options.length - 1));*/
	var random = Math.floor(Math.random() * (computerObj.options.length));
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
        result.innerText = "Empatan!";
    } else if ((userObj.choice == "Piedra" && computerObj.choice == "Tijera") || (userObj.choice == "Tijera" && computerObj.choice == "Papel") || (userObj.choice == "Papel" && computerObj.choice == "Piedra")) {
        result.innerText = "Ganaste!";
        userObj.score++;
    } else {
        result.innerText = "Perdiste!";
        computerObj.score++;
    }
}

function displayScore() {    
    document.getElementById("computer-score").innerText = computerObj.score;
    document.getElementById("user-score").innerText = userObj.score;
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
    displayScore();
    /* Avoid the event going further up the DOM after #button-wrapper */
    e.stopPropagation();
}