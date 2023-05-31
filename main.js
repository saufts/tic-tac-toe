// first step, we need to atatch event listener (submit) to the form to get user data

// attach event (click) listeners to each "game box"

// next, initialize the game

// next, we need to check which gamemode we're playing

// we need to set win conditions

// we need to determine current player

// after each move, check win conditions and if not met, set other player as active

// human vs human, next implement easy ai, next impossible ai

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
    // initialize game variables
    initializeVariables(data);

    // add event listeners to the game
    addEventListenersToGameboard(data);
};

const playMove = (box, data) => {
    // is game over? If fame over, don't do anything
    if(data.gameOver) {
        return;
    }
    // check if game box has a letter in it, if so, don't do anything
    if(data.board[box.id] === 'X' || data.board[box.id] === 'O' ) {
        return;
    }
    console.log(box, data);
}