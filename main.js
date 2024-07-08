const team1_score = document.querySelector(".team1_score")
const team1_wickets = document.querySelector(".team1_wickets")
const team2_score = document.querySelector(".team2_score")
const team2_wickets = document.querySelector(".team2_wickets")
const innings = document.querySelector(".innings_count")
const team_name = document.querySelector(".team_name")
const buttons = document.querySelectorAll('button.score , button.event')

let over = document.querySelector(".over_count")
let balls = document.querySelector(".ball_count")

let team1Score = 0
let team1Wickets = 0
let team2Score = 0
let team2Wickets = 0
let currentBall = 0
let currentOver = 0
let currentInnings = 1
let currentTeam = 1

const max_balls = 6
const max_overs = 5
const max_wickets = 10

let playGame = true;

if(playGame){
    buttons.forEach(buttons =>{
         button.addEventListener('click',() =>{
            const action = buttons.textContent.trim();
            handleAction(action);
        })
    })
}

function handleAction(action){
    switch(action){
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "6":
            addRun(parseInt(action))
            break;
        case 'WD':
            addWide()
            break;
        case 'NB':
            addNoBall()
            break;
        case 'OUT':
            addWicket()
            break;

    }
    updateUI();
    checkInningsSwitch();
    checkMatchEnd()
}

function addRun(run){
    if(currentTeam == 1){
        team1Score += run
    }else{
        team2Score += run
    }
}

function addWide(){
    if(currentTeam === 1){
        team1Score += run
    }else{
        team2Score += run
        if(team2Score > team1Score){
            determineWinner()
            return;
        }
    }
    incrementBall()
}

function addNoBall(){
    if(currentTeam == 1){
        team1Score += run
    }else{
        team2Score += run
    }
}

function addWicket(){
    if(currentTeam === 1){
        team1Wickets += 1
        if(team1Wickets === max_wickets){
            currentTeam = 2
            currentBall = 0
            currentOver = 0
            currentInnings = 2
        }else{
            determineWinner()
            return;
        }
    }else{
        team2Wickets +=1
        if(team2Wickets === max_wickets){
            determineWinner()
            return;
        }
    }
    incrementBall()
}

function incrementBall(){
    currentBall +=1
    if(currentBall >= max_balls){
        currentBall = 0
        currentOver +=1
    }
}

function updateUI(){
    team1_score.textContent = team1Score
    team1_wickets.textContent = team1Wickets
    team2_score.textContent = team2Score
    team2_wickets.textContent = team2Wickets
    innings.textContent = `Innings: ${currentInnings}`
    team_name.textContent = `Team ${currentTeam}`
    over.textContent = `Over: ${currentOver}`
    balls.textContent = `Ball: ${currentBall}`
}

function checkInningsSwitch(){
    if(currentOver === max_overs){
        if(currentInnings === 1){
            currentInnings = 2
            currentTeam = 2
            currentOver = 0
            currentBall = 0
        }
    }
}

function checkMatchEnd(){
    if(currentInnings === 2 && currentOver === max_overs){
        determineWinner()
    }
}

function determineWinner(){
    if(team1Score > team2Score){
        alert("Team 1 wins")
    }else if(team1Score < team2Score){
        alert("Team 2 wins")
    }else{
        alert("Match Draw")
    }
    resetGame();
}

function resetGame(){
    team1Score = 0
    team1Wickets = 0
    team2Score = 0
    team2Wickets = 0
    currentBall = 0
    currentOver = 0
    currentInnings = 1
    currentTeam = 1
    updateUI()
    playGame = true
}

