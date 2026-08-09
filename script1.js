console.log("Welcome to Tic Tac Toe");

// ----------------------
// Sounds
// ----------------------
let turnSound = new Audio("dragon-studio-mouse-click-405462.mp3");

// ----------------------
// Variables
// ----------------------
let turn = "X";
let gameover = false;
let vsComputer = true;

// Score
let xScore = 0;
let oScore = 0;
let drawScore = 0;

// Winning combinations
const wins = [
    [0,1,2,5,5,0],
    [3,4,5,5,15,0],
    [6,7,8,5,25,0],
    [0,3,6,-5,15,90],
    [1,4,7,5,15,90],
    [2,5,8,15,15,90],
    [0,4,8,5,15,45],
    [2,4,6,5,15,135]
];

// DOM Elements
let boxes = document.getElementsByClassName("box");
let info = document.querySelector(".info");
let line = document.querySelector(".line");
let img = document.querySelector(".imagebox img");

// ----------------------
// Change Turn
// ----------------------
function changeTurn(){
    return turn === "X" ? "O" : "X";
}

// ----------------------
// Update Scoreboard
// ----------------------
function updateScore(){

    document.getElementById("xscore").innerText = xScore;

    document.getElementById("oscore").innerText = oScore;

    document.getElementById("drawscore").innerText = drawScore;

}

// ----------------------
// Check Winner
// ----------------------
function checkWin(){

    let boxtext = document.querySelectorAll(".boxtext");

    wins.forEach(e=>{

        if(
            boxtext[e[0]].innerText !== "" &&
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[1]].innerText === boxtext[e[2]].innerText
        ){

            let winner = boxtext[e[0]].innerText;

            info.innerText = winner + " Won 🎉";

            gameover = true;

            if(winner === "X"){
                xScore++;
            }else{
                oScore++;
            }

            updateScore();

            img.style.width = "200px";

            line.style.width = "20vw";
            line.style.transform =
            `translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;

        }

    });

}
// ----------------------
// Check Draw
// ----------------------
function checkDraw() {

    let boxtext = document.querySelectorAll(".boxtext");
    let filled = true;

    boxtext.forEach(box => {
        if (box.innerText === "") {
            filled = false;
        }
    });

    if (filled && !gameover) {
        drawScore++;
        updateScore();
        info.innerText = "🤝 Game Draw!";
        gameover = true;
    }

}

// ----------------------
// Computer Move (AI)
// ----------------------
function computerMove() {

    if (gameover) return;

    let emptyBoxes = [];

    let boxtext = document.querySelectorAll(".boxtext");

    boxtext.forEach((box, index) => {
        if (box.innerText === "") {
            emptyBoxes.push(index);
        }
    });

    if (emptyBoxes.length === 0) return;

    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];

    boxtext[randomIndex].innerText = "O";

    turnSound.play();

    checkWin();
    checkDraw();

    if (!gameover) {
        turn = "X";
        info.innerText = "Turn for X";
    }

}

// ----------------------
// Box Click Event
// ----------------------
Array.from(boxes).forEach(box => {

    let boxtext = box.querySelector(".boxtext");

    box.addEventListener("click", () => {

        if (boxtext.innerText === "" && !gameover && turn === "X") {

            boxtext.innerText = "X";

            turnSound.play();

            checkWin();
            checkDraw();

            if (!gameover) {

                turn = "O";
                info.innerText = "Computer Thinking...";

                setTimeout(() => {
                    computerMove();
                }, 500);

            }

        }

    });

});
// ----------------------
// Reset Game
// ----------------------
document.getElementById("reset").addEventListener("click", () => {

    let boxtexts = document.querySelectorAll(".boxtext");

    boxtexts.forEach(box => {
        box.innerText = "";
    });

    gameover = false;
    turn = "X";

    info.innerText = "Turn for X";

    img.style.width = "0px";

    line.style.width = "0";
    line.style.transform = "translate(0,0) rotate(0deg)";

});

// ----------------------
// Reset Score
// ----------------------
document.getElementById("resetScore").addEventListener("click", () => {

    xScore = 0;
    oScore = 0;
    drawScore = 0;

    updateScore();

});

// ----------------------
// Initialize
// ----------------------
updateScore();

info.innerText = "Turn for X";