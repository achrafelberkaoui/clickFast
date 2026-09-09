const startGameBtn = document.querySelector('#startGameBtn') 
const btnPlay = document.querySelector('#btnPlay') 
const scoreValue = document.querySelector('#scoreValue')
const timeValue = document.querySelector('#timeValue')
const gameArena = document.querySelector('#gameArena')
const target = document.querySelector('#target')
const homeView = document.querySelector('.view--home')
const configView = document.querySelector('.view--config')
const gameView = document.querySelector('.view--game')
const resultsView = document.querySelector('.view--results')
const finalScoreValue = document.querySelector("#finalScoreValue");
const durationButtons = document.querySelectorAll("[data-duration]");
const difficultyButtons = document.querySelectorAll("[data-difficulty]");


let score = 0;
let selectedDuration = 20;
let timeLeft = 10;
let selectedDifficulty = "medium";
let gameRuning = false;
let finTimer = null;

function showViews(view){
    document.querySelectorAll('.view').forEach((item)=>{
        item.style.display = "none";
    })
    view.style.display = 'block'
}
showViews(homeView);
btnPlay.addEventListener("click", ()=>{
    showViews(configView);
})

durationButtons.forEach((button)=>{
    button.addEventListener("click", ()=>{
        selectedDuration = Number(button.dataset.duration)
        console.log("Durée choisie :", selectedDuration);
    })
})
difficultyButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedDifficulty = button.dataset.difficulty;
        console.log("Difficulté choisie :", selectedDifficulty);
    });
});
function setTargetSize(){
    if(selectedDifficulty === "medium"){
        target.style.width = "80px"
        target.style.height = "80px"
    }
    if(selectedDifficulty === "easy"){
        target.style.width = "60"
        target.style.height = "60px"
    }
    if(selectedDifficulty === "hard"){
        target.style.width = "40px"
        target.style.height = "40px"
    }

}

function gameStart(){
    score = 0;
    timeLeft = selectedDuration;
    gameRuning = true;
    scoreValue.textContent = score;
    timeValue.textContent = timeLeft;
    showViews(gameView)
    moveTarget()
    setTargetSize()
    startTime()
}
startGameBtn.addEventListener("click", gameStart)

function endGame(){
    clearInterval(finTimer)
    gameRuning = false;
    finalScoreValue.textContent = score;
    showViews(resultsView);
}
function startTime(){
    
    finTimer = setInterval(() =>{
        timeLeft -= 1;
        timeValue.textContent = timeLeft;
        if(timeLeft === 0){
            endGame()
        }

    }, 1000)
}

function moveTarget(){
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