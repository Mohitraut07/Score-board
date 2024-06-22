let team1Score = 0;
let team2Score = 0;
let team1Wickets = 0;
let team2Wickets = 0;
let currentOver = 0;
let currentBall = 0;
let currentInnings = 1;
let currentTeam = 1;

const maxOvers = 5;
const maxBalls = 6;
const maxWickets = 10;

const team1ScoreElement = document.querySelector('.team1_score');
const team1WicketsElement = document.querySelector('.team1_wickets');
const team2ScoreElement = document.querySelector('.team2_score');
const team2WicketsElement = document.querySelector('.team2_wickets');
const overCountElement = document.querySelector('.over_count');
const ballCountElement = document.querySelector('.ball_count');
const inningsCountElement = document.querySelector('.innings_count');
const teamNameElement = document.querySelector('.team_name');

const buttons = document.querySelectorAll('button.score, button.event');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const action = button.textContent.trim();
        handleAction(action);
    });
});

function handleAction(action) {
    switch(action) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '6':
            addRun(parseInt(action));
            break;
        case 'WD':
            addWide();
            break;
        case 'NB':
            addNoBall();
            break;
        case 'OUT':
            addWicket();
            break;
    }
    updateUI();
    checkInningsSwitch();
    checkMatchEnd();
}

function addRun(run) {
    if (currentTeam === 1) {
        team1Score += run;
    } else {
        team2Score += run;
        if (team2Score > team1Score) {
            determineWinner();
            return;
        }
    }
    incrementBall();
}

function addWide() {
    if (currentTeam === 1) {
        team1Score += 1;
    } else {
        team2Score += 1;
    }
}

function addNoBall() {
    if (currentTeam === 1) {
        team1Score += 1;
    } else {
        team2Score += 1;
    }
}

function addWicket() {
    if (currentTeam === 1) {
        team1Wickets += 1;
        if (team1Wickets === maxWickets) {
            if (currentInnings === 1) {
                currentInnings = 2;
                currentTeam = 2;
                currentOver = 0;
                currentBall = 0;
            } else {
                determineWinner();
                return;
            }
        }
    } else {
        team2Wickets += 1;
        if (team2Wickets === maxWickets) {
            determineWinner();
            return;
        }
    }
    incrementBall();
}

function incrementBall() {
    currentBall += 1;
    if (currentBall === maxBalls) {
        currentBall = 0;
        currentOver += 1;
    }
}

function updateUI() {
    team1ScoreElement.textContent = team1Score;
    team1WicketsElement.textContent = team1Wickets;
    team2ScoreElement.textContent = team2Score;
    team2WicketsElement.textContent = team2Wickets;
    overCountElement.textContent = `Over: ${currentOver}`;
    ballCountElement.textContent = `Ball: ${currentBall}`;
    inningsCountElement.textContent = `Innings: ${currentInnings}`;
    teamNameElement.textContent = `Team: ${currentTeam}`;
}

function checkInningsSwitch() {
    if (currentOver === maxOvers) {
        if (currentInnings === 1) {
            currentInnings = 2;
            currentTeam = 2;
            currentOver = 0;
            currentBall = 0;
        }
    }
}

function checkMatchEnd() {
    if (currentInnings === 2 && currentOver === maxOvers) {
        determineWinner();
    }
}

function determineWinner() {
    let winnerText;
    if (team1Score > team2Score) {
        winnerText = 'Team 1 Wins!';
    } else if (team2Score > team1Score) {
        winnerText = 'Team 2 Wins!';
    } else {
        winnerText = 'It\'s a Tie!';
    }
    alert(winnerText);
    resetGame();
}

function resetGame() {
    team1Score = 0;
    team2Score = 0;
    team1Wickets = 0;
    team2Wickets = 0;
    currentOver = 0;
    currentBall = 0;
    currentInnings = 1;
    currentTeam = 1;
    updateUI();
}
