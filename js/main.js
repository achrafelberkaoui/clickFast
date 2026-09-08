const startGameBtn = document.querySelector('#startGameBtn')
const scoreValue = document.querySelector('#scoreValue')
const timeValue = document.querySelector('#timeValue')
const gameArena = document.querySelector('#gameArena')
const target = document.querySelector('#target')

let score = 0;
let timeLeft = 10;
let gameRuning = false;
console.log(gameRuning);
function gameStart(){
    score = 0;
    timeLeft = 10;
    gameRuning = true;
    scoreValue.textContent = score;
    timeValue.textContent = timeLeft;
        console.log(score);
    console.log(timeLeft);
    console.log(gameRuning);
}
startGameBtn.addEventListener("click", gameStart)


function moveTarget(){
    console.log('tttttt');
    let moveX = Math.random() * 440
    let moveY = Math.random() * 440
    target.style.transform = `translate(${moveX}px, ${moveY}px)`  
}
function handleTargetClick (){   
    if(!gameRuning){
        return;
    }
    score += 1;
    scoreValue.textContent = score;
    moveTarget();
}
target.addEventListener("click", handleTargetClick)