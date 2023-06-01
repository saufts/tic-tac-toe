// first step, we need to atatch event listener (submit) to the form to get user data

// attach event (click) listeners to each "game box"

// next, initialize the game

// next, we need to check which gamemode we're playing

// we need to set win conditions

// we need to determine current player

// after each move, check win conditions and if not met, set other player as active

// human vs human, next implement easy ai, next impossible ai

const winningConditions = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // diagonals
    [0, 4, 8],
    [2, 4, 6]
]

const form = document.querySelector('#myForm');

form.addEventListener('submit', (event) => {
    // prevent page refresh
    event.preventDefault();
    // initialize user form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    document.querySelector('.modal-wrapper').setAttribute('hidden', true);
    initializeGame(data);
    
});

const initializeVariables = (data) => {
    data.choice = +data.choice; // convert a string to a number
    data.board = [0,1,2,3,4,5,6,7,8];
    data.player1 = "X";
    data.player2 = "O";
    data.round = "0";
    data.currentPlayer = "X";
    data.gameOver = false;
}

const addEventListenersToGameboard = (data) => {
    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('click', (event) => {
            playMove(event.target, data);
        })
    })
}

const initializeGame = (data) => {
    adjustDom('displayTurn', `${data.player1Name}'s turn`);
    // initialize game variables
    initializeVariables(data);

    // add event listeners to the game
    addEventListenersToGameboard(data);
};

const playMove = (box, data) => {
    // is game over? If fame over, don't do anything
    if(data.gameOver || data.round > 8) {
        return;
    }
    // check if game box has a letter in it, if so, don't do anything
    if(data.board[box.id] === 'X' || data.board[box.id] === 'O' ) {
        return;
    }

    // adjust the DOM for player move, and then check win conditions
    data.board[box.id] = data.currentPlayer;
    box.textContent = data.currentPlayer;
    // one way
    // box.className = data.currentPlayer === 'X' ? 'box player1' : 'box player2';

    // the second way
    box.classList.add(data.currentPlayer === 'X' ? 'player1' : 'player2');
    // increase the round #
    data.round++;

    console.log(box, data);

    // check end contidions
    if(endConditions(data)) {
        return;
    }
    // change current player
    // change the dom, and change data.currentPlayer
    changePlayer(data);

};

const endConditions = (data) => {
    // 3 potential options
    // winner
    // tie
    // game not over yet
    if(checkWinner(data)) {
        // adjust the dom to reflect win
        let winnerName =  data.currentPlayer === 'X' ? data.player1Name : data.player2Name;
        adjustDom('displayTurn', winnerName + ' has won the game');
        return true;
    } else if (data.round === 9) {
        // adjust the dom to reflect tie
        adjustDom('displayTurn', 'It\'s a Tie!');
        data.gameOver = true;
        return true;
    }
    return false;
}

const checkWinner = (data) => {
    let result = false;
    winningConditions.forEach(condition => {
        if(data.board[condition[0]] === data.board[condition[1]] && data.board[condition[1]] === data.board[condition[2]]) {
            console.log('player has won');
            data.gameOver = true;
            result = true;
        }
    })
    return result;
}

const adjustDom = (className, textContent) => {
   const elem = document.querySelector(`.${className}`);
   elem.textContent = textContent;
}

const changePlayer = (data) => {
    data.currentPlayer = data.currentPlayer === 'X' ? '0' : 'X';
    // adjust the dom
    let displayTurnText = data.currentPlayer === 'X' ? data.player1Name : data.player2Name;
    adjustDom('displayTurn', `${displayTurnText}'s turn`);
}