let playerTime = 'x';
let playerXPoints = 0;
let playerOPoints = 0;
let oldWomanPoints = 0;
const wins = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];
let playerXPositions = [];
let playerOPositions = [];
let playerWin = false;

const newGameBox = document.getElementById('new-game');
const newGameButton = document.getElementById('button-new-game');
const positions = document.querySelectorAll('.card-position');
const xPoints = document.getElementById('count-x');
const oPoints = document.getElementById('count-o');
const drawPoints = document.getElementById('count-draw');

/**
 * 
 * @param {HTMLButtonElement} element 
 * @param {number} position 
 */
function addPlayerOnPosition(element, position) {
    element.textContent = playerTime;

    element.setAttribute('data-player', playerTime);

    if (playerTime === 'x') {
        playerXPositions.push(Number(position));
    } else {
        playerOPositions.push(Number(position));
    }
}

function togglePlayer() {
    playerTime = playerTime === 'x' ? 'o' : 'x';
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {number} points 
 */
function addPointsToCounter(element, points) {
    element.textContent = points;
}

function showBoxNewGame() {
    newGameBox.classList.remove('hidden');
}

function hiddenBoxNewGame() {
    newGameBox.classList.add('hidden');
}

/**
 * 
 * @param {string} playerWin 
 */
function verifyIfNobodyWins(playerWin) {
    const positions = document.querySelectorAll('[data-player]');
    if (positions.length === 9 && !playerWin) {
        oldWomanPoints += 1;
        addPointsToCounter(drawPoints, oldWomanPoints);
        showBoxNewGame();
    }
}

function resetGame() {
    positions.forEach((element) => {
        element.textContent = '';
        element.removeAttribute('data-player');
    });

    playerWin = false;
    playerXPositions = [];
    playerOPositions = [];
}

/**
 * 
 * @param {Array<Array<number>>} wins 
 * @param {Array<number>} playerOPositions 
 * @param {Array<number>} playerXPositions 
 * @param {HTMLDivElement} oPoints 
 * @param {HTMLDivElement} xPoints 
 * @param {Function} addPointsToCounter 
 * @returns void
 */
function verifyWin(wins, playerOPositions, playerXPositions, oPoints, xPoints, addPointsToCounter) {
    return wins.forEach((win) => {
        const playerXWin = win.every((positionWin) => playerXPositions.includes(positionWin));
        const playerOWin = win.every((positionWin) => playerOPositions.includes(positionWin));

        if (playerOWin) {
            playerWin = 'o';
            playerOPoints += 1;
            addPointsToCounter(oPoints, playerOPoints);
            return;
        }

        if (playerXWin) {
            playerWin = 'x';
            playerXPoints += 1;
            addPointsToCounter(xPoints, playerXPoints);
            return;
        }
    })
}

/**
 * 
 * @param {Event} event 
 * @param {HTMLButtonElement} elementPosition 
 * @returns 
 */
function initGame(event, elementPosition) {
    if (playerWin) {
        return;
    }

    const position = event.target.getAttribute('data-position');
    const player = event.target.getAttribute('data-player');

    if (player) {
        return;
    }

    addPlayerOnPosition(elementPosition, position);

    togglePlayer();

    verifyWin(wins, playerOPositions, playerXPositions, oPoints, xPoints, addPointsToCounter);

    if (playerWin) {
        showBoxNewGame();
    }

    verifyIfNobodyWins(playerWin);
}

newGameButton.addEventListener('click', () => {
    resetGame();
    hiddenBoxNewGame();
});

document.addEventListener('DOMContentLoaded', () => {
    positions.forEach((elementPosition) => {
        elementPosition.addEventListener('click', (event) => {    
            initGame(event, elementPosition);
        })
    })
})
