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
const accuracyValue = document.querySelector('#accuracyValue');
const missesValue = document.querySelector('#missesValue');
const resultBestValue = document.querySelector('#resultBestValue');
const resultHitsValue = document.querySelector('#resultHitsValue');
const resultMissesValue = document.querySelector('#resultMissesValue');
const resultAccuracyValue = document.querySelector('#resultAccuracyValue');
const playAgainBtn = document.querySelector('#playAgainBtn');
const backHomeBtn = document.querySelector('#backHomeBtn');
const viewHistoryBtn = document.querySelector('#viewHistoryBtn');
const viewHistorique = document.querySelector('.view--history');
const pseudoInput = document.querySelector('#pseudoInput');
const modeButtons = document.querySelectorAll("[data-mode]");
const historyTableBody = document.querySelector(".history-table tbody")
const filterMode = document.querySelector('#filterMode');
let score = 0;
let misses = 0;
let accuracy = 0;
let selectedDuration = 10;
let timeLeft = 10;
let selectedDifficulty = "medium";
let gameRuning = false;
let finTimer = null;
let selectedMode = "classic";
let timerChallange = null;
let gameFinished = false;

function saveSettings(){
    const settings = {
        pseudo : pseudoInput.value.trim(),
        mode : selectedMode,
        duration : selectedDuration,
        difficulty : selectedDifficulty
    }

    localStorage.setItem(
        "clickFast.settings",
        JSON.stringify(settings)
    )
    
}

function loadSettings(){
    const savedSettings = localStorage.getItem("clickFast.settings");

    if(savedSettings === null){
        return;
    }

    const settings = JSON.parse(savedSettings);    
    pseudoInput.value = settings.pseudo;
    selectedDifficulty =settings.difficulty;
    selectedMode = settings.mode;
    selectedDuration = settings.duration;
    restoreActiveButton();
}

function selectedButton(button, buttons){
    buttons.forEach((button)=>{
        button.classList.remove("is-active");
        button.setAttribute("aria-pressed", "false");
    })
    button.classList.add("is-active");
    button.setAttribute("aria-pressed", "true");
}
function showViews(view){
    document.querySelectorAll('.view').forEach((item)=>{
        item.style.display = "none";
    })
    view.style.display = 'block'
}

function restoreActiveButton(){
    modeButtons.forEach((button)=>{
        const active = button.dataset.mode === selectedMode;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active);
    })
    difficultyButtons.forEach((button)=>{
        const active = button.dataset.difficulty === selectedDifficulty;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active);
    })
    durationButtons.forEach((button)=>{
        const active = Number(button.dataset.duration) === selectedDuration;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", active);
    })
}

function getRecordKey(){
    return `${selectedMode}_${selectedDifficulty}_${selectedDuration}`
}

function getRecords(){
    const savedRecords = localStorage.getItem("clickFast.records");

    if(savedRecords === null){
        return {};
    }

    return JSON.parse(savedRecords);
}

function saveRecord(){
    const key = getRecordKey();
    const record = getRecords();

    if(!record[key] || record[key] < score){
        record[key] = score;
    }

    localStorage.setItem("clickFast.records",JSON.stringify(record));
}

function saveHistory(){
    const savedHistory = localStorage.getItem("clickFast.history");
    let history = [];

    if(savedHistory !== null){
        history = JSON.parse(savedHistory);
    }

    const record = {
        date: new Date().toISOString(),
        pseudo: pseudoInput.value.trim(),
        mode: selectedMode,
        difficulty: selectedDifficulty,
        duration: selectedDuration,
        score: score,
        hits: score,
        misses: selectedMode === "precision" ? misses : null,
        accuracy: selectedMode === "precision" ? Math.round(accuracy) : null
    };
    history.push(record);
    if(history.length > 20){
        history.shift()
    }

    localStorage.setItem("clickFast.history", JSON.stringify(history))
}

function renderHistory(){
    const savedHistory = localStorage.getItem("clickFast.history")
    if(savedHistory === null){
        return;
    }

    const history = JSON.parse(savedHistory);
    const selectedFilter = filterMode.value;
    console.log(selectedFilter);
    
    const filterHistory = history.filter((record)=>{
        if(selectedFilter === "all"){
            return true;
        }

       return record.mode === selectedFilter;
    })
    console.log(filterHistory);
    historyTableBody.innerHTML = "";

    filterHistory.forEach((record)=>{
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${new Date(record.date).toLocaleString()}</td>
            <td>${record.pseudo}</td>
            <td>${record.mode}</td>
            <td>${record.difficulty}</td>
            <td>${record.duration}s</td>
            <td>${record.score}</td>
            <td>${record.accuracy === null ? "Not measured" : record.accuracy + "%"}</td>
        `;
        
        historyTableBody.appendChild(row)
    })

}
renderHistory()
showViews(homeView);
loadSettings();
restoreActiveButton();

filterMode.addEventListener("change", () => {
    renderHistory();
});

btnPlay.addEventListener("click", ()=>{
    showViews(configView);
})

durationButtons.forEach((button)=>{
    button.addEventListener("click", ()=>{
        selectedDuration = Number(button.dataset.duration)
        selectedButton(button, durationButtons);
        console.log("Durée choisie :", selectedDuration);
    })
})
difficultyButtons.forEach((button) => {
    button.addEventListener("click", () => {
        selectedDifficulty = button.dataset.difficulty;
        selectedButton(button, difficultyButtons);
        console.log("Difficulté choisie :", selectedDifficulty);
    });
});
function setTargetSize(){
    if(selectedDifficulty === "easy"){
        target.style.width = "80px"
        target.style.height = "80px"
    }
    if(selectedDifficulty === "medium"){
        target.style.width = "60px"
        target.style.height = "60px"
    }
    if(selectedDifficulty === "hard"){
        target.style.width = "40px"
        target.style.height = "40px"
    }

}

function startTimerChallange(){
    timerChallange = setTimeout(()=>{
        moveTarget();
        startTimerChallange();
    },1000)
}

function gameStart(){
    const pseudo = pseudoInput.value.trim();
    if(pseudo.length < 2 || pseudo.length > 20){
        alert("Le pseudo doit contenir entre 2 et 20 caractères.");
        return;
    }
    if(selectedMode === "challenge"){
        startTimerChallange();
    }
    if (selectedMode === "classic") {
        missesValue.textContent = "Not measured";
        accuracyValue.textContent = "Not measured";
    } else {
        missesValue.textContent = misses;
        accuracyValue.textContent = "0%";
    }
    saveSettings()
    score = 0;
    misses = 0;
    accuracy = 0;
    timeLeft = selectedDuration;
    gameFinished = false;
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
    clearTimeout(timerChallange)
    if (gameFinished) {
    return;
    }
    gameFinished = true;
    gameRuning = false;
    saveRecord();
    saveHistory();
    finalScoreValue.textContent = score;
    resultHitsValue.textContent = score;
    if(selectedMode === "precision"){
        resultMissesValue.textContent = misses;
        resultAccuracyValue.textContent = Math.round(accuracy) + "%";
    }else{
        resultMissesValue.textContent = "Not measured";
        resultAccuracyValue.textContent = "Not measured";
    }
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

function moveTarget() {
    const maxX = gameArena.clientWidth - target.offsetWidth;
    const maxY = gameArena.clientHeight - target.offsetHeight;
    const moveX = Math.random() * maxX;
    const moveY = Math.random() * maxY;
    target.style.transform = `translate(${moveX}px, ${moveY}px)`;
}

function handleArenaClick(event){
    if(!gameRuning){
        return;
    }
    if(event.target === target){
        return;
    }
    if(selectedMode !== "precision"){
     return;
    }
    misses += 1;
    missesValue.textContent = misses;
    updateAccuracy();
}

function handleTargetClick (){   
    if(!gameRuning){
        return;
    }
    score += 1;
    scoreValue.textContent = score;
    updateAccuracy()
    moveTarget();

    if(selectedMode === "challenge"){
        clearTimeout(timerChallange)
        startTimerChallange()
    }
}

function updateAccuracy(){
    
    if (selectedMode === "classic") {
        accuracyValue.textContent = "Not measured";
        return;
    }
    let totalClicks = score + misses;
    
    if(totalClicks === 0){
        accuracy = 0;
    }else{
        accuracy = ( score / totalClicks ) * 100; 
    }
    accuracyValue.textContent = Math.round(accuracy) + "%"
}

gameArena.addEventListener("click", handleArenaClick)
target.addEventListener("click", handleTargetClick)
viewHistoryBtn.addEventListener("click", ()=>{
    showViews(viewHistorique)
    renderHistory();
})
backHomeBtn.addEventListener("click", ()=>{
    showViews(homeView)
})
playAgainBtn.addEventListener("click", ()=>{
    gameStart()
})
modeButtons.forEach((button)=>{
    button.addEventListener("click", ()=>{
        selectedMode = button.dataset.mode;
        selectedButton(button, modeButtons);
        console.log("Mode choisi :", selectedMode);
    })
})
