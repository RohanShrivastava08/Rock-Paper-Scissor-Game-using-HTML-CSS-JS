const userScoreElement = document.getElementById("user-score");
const computerScoreElement = document.getElementById("computer-score");
const resultMessageElement = document.getElementById("result-message");
const computerChoiceElement = document.getElementById("computer-choice-icon");
const winLossDrawRatioElement = document.getElementById("win-loss-draw-ratio");

const choices = document.querySelectorAll(".choice");
const restartButton = document.getElementById("restart-btn");

let userScore = 0;
let computerScore = 0;
let wins = 0;
let losses = 0;
let draws = 0;

choices.forEach(choice => choice.addEventListener("click", playGame));
restartButton.addEventListener("click", resetGame);

function playGame(event) {
    const userChoice = event.currentTarget.id;
    const computerChoice = getComputerChoice();
    const winner = determineWinner(userChoice, computerChoice);
    displayResult(winner, userChoice, computerChoice);
    updateScores(winner);
    updateWinLossDrawRatio(winner);
}

function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    const randomIndex = Math.floor(Math.random() * 3);
    return choices[randomIndex];
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return "draw";
    }

    if (
        (userChoice === "rock" && computerChoice === "scissors") ||
        (userChoice === "scissors" && computerChoice === "paper") ||
        (userChoice === "paper" && computerChoice === "rock")
    ) {
        return "user";
    } else {
        return "computer";
    }
}

function displayResult(winner, userChoice, computerChoice) {
    computerChoiceElement.innerHTML = getIconHtml(computerChoice);

    if (winner === "user") {
        resultMessageElement.textContent = `You win! ${capitalize(userChoice)} beats ${capitalize(computerChoice)}`;
    } else if (winner === "computer") {
        resultMessageElement.textContent = `You lose! ${capitalize(computerChoice)} beats ${capitalize(userChoice)}`;
    } else {
        resultMessageElement.textContent = "It's a draw!";
    }
}

function updateScores(winner) {
    if (winner === "user") {
        userScore++;
    } else if (winner === "computer") {
        computerScore++;
    }
    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
}

function updateWinLossDrawRatio(winner) {
    if (winner === "user") {
        wins++;
    } else if (winner === "computer") {
        losses++;
    } else {
        draws++;
    }
    winLossDrawRatioElement.textContent = `Wins: ${wins} | Losses: ${losses} | Draws: ${draws}`;
}

function getIconHtml(choice) {
    const icons = {
        rock: '<i class="fas fa-hand-rock"></i> Rock',
        paper: '<i class="fas fa-hand-paper"></i> Paper',
        scissors: '<i class="fas fa-hand-scissors"></i> Scissors'
    };
    return icons[choice];
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    wins = 0;
    losses = 0;
    draws = 0;

    userScoreElement.textContent = userScore;
    computerScoreElement.textContent = computerScore;
    winLossDrawRatioElement.textContent = `Wins: ${wins} | Losses: ${losses} | Draws: ${draws}`;
    resultMessageElement.textContent = "Make your move!";
    computerChoiceElement.innerHTML = "...";
}
