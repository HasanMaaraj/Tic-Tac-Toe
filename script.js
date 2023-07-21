const gameBoard = (function() {
    const playerFactory = function(name, mark){
        return {name, mark}
    }

    let player1 = playerFactory('Player 1', 'X');
    let player2 = playerFactory('Player 2', 'O');
    let turn = 1;
    let board = ["", "", "", "", "", "", "", "", ""];
    let winner = null;
    const winningCombos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ]
    const displayControll = (function(){
        const getPlayersInformation = function() {
            let player1Name = prompt('Player 1 Name:');
            let player2Name = prompt('Player 2 Name:');
            // Re-assign player names if inputed
            if (player1Name) {
                player1 = playerFactory(player1Name, 'X');
            }
            if (player2Name) {
                player2 = playerFactory(player2Name, 'O');
            }
        }
        const displayPlayers = function() {
            const display = document.querySelector('#players-display');
            Array.from(display.childNodes).forEach(node => {node.remove()});
            const player1Display = document.createElement('div');
            player1Display.classList = 'player-display X';
            const player1Name = document.createElement('div');
            player1Name.className = 'player-name';
            player1Name.textContent = player1.name;
            player1Display.appendChild(player1Name);
            const player1Mark = document.createElement('div');
            player1Mark.className = 'player-mark';
            player1Mark.textContent = player1.mark;
            player1Display.appendChild(player1Mark);
            display.appendChild(player1Display);
    
            const player2Display = document.createElement('div');
            player2Display.classList = 'player-display O';
            const player2Name = document.createElement('div');
            player2Name.className = 'player-name';
            player2Name.textContent = player2.name;
            player2Display.appendChild(player2Name);
            const player2Mark = document.createElement('div');
            player2Mark.className = 'player-mark';
            player2Mark.textContent = player2.mark;
            player2Display.appendChild(player2Mark);
            display.appendChild(player2Display);
        }

        const displayWinner = function(player) {
            const statusDisplay = document.querySelector('#status-display');
            statusDisplay.textContent = `${player.name} Won!`;
            statusDisplay.className = player.mark;
        }

        const displayTie = function() {
            const statusDisplay = document.querySelector('#status-display');
            statusDisplay.textContent = 'It\'s a Tie!'
            statusDisplay.classList = '';
        }

        const clearResult = function() {
            const statusDisplay = document.querySelector('#status-display');
            statusDisplay.textContent = '';
            statusDisplay.classList = ''; 
        }

        const displayPlayersTurn = function() {
            const statusDisplay = document.querySelector('#status-display');
            if (turn % 2 === 1){
                statusDisplay.textContent = `${player1.name}'s Turn ${player1.mark}`;
                statusDisplay.className = player1.mark;
            } else {
                statusDisplay.textContent = `${player2.name}'s Turn ${player2.mark}`;
                statusDisplay.className = player2.mark;
            }
        }

        return {getPlayersInformation, displayPlayers, displayWinner, displayTie, clearResult, displayPlayersTurn}
    })();


    const announceWinner = function(mark, combo) {
        if (mark === player1.mark){
            winner = player1;
            displayControll.displayWinner(player1)
        } else {
            winner = player2;
            displayControll.displayWinner(player2)
        }
        for (let i=0; i < combo.length; i++) {
            const comboBox = document.querySelector(`div[data-index="${combo[i]}"]`);
            comboBox.classList.add('winning-combo');
        }
    }

    // const announceTie = function() {
    //     displayControll.displayTie();
    // }
    const stopGame = function() {
        const boxes = document.querySelectorAll('.box');
        boxes.forEach((box) => {
            box.removeEventListener('click', onClickEvent);
            box.classList.remove('unmarked')
        });
    }

    const onClickEvent = function() {
        //  Trigger event listener only if box is empty
        if (this.textContent === '') {
            markPlayer(this);
            turn++;
            checkWinner();
            if (winner === null) displayControll.displayPlayersTurn();
            if (turn === 10 && winner === null){
                stopGame();
                displayControll.displayTie();
            }
            console.log(turn)
       }
   }


    const checkWinner = function() {
        for (let i=0; i<winningCombos.length; i++) {
            if (board[winningCombos[i][0]]
                && board[winningCombos[i][0]] === board[winningCombos[i][1]] 
                && board[winningCombos[i][0]] === board[winningCombos[i][2]]) {
                stopGame();
                announceWinner(board[winningCombos[i][0]], winningCombos[i]);
            }
        }
    }

    const markPlayer = (box) => {
        // Mark the box based on who's turn is it
        box.classList.remove('unmarked')
        if (turn % 2 === 1){
            box.classList.add(`${player1.mark}`)
            board[box.dataset.index] = player1.mark;
            box.textContent = player1.mark;
        } else {
            box.classList.add(`${player2.mark}`)
            board[box.dataset.index] = player2.mark;
            box.textContent = player2.mark;
        }
        console.log(board)
    }

    const renderBoard = function() {
        const gameBoard = document.querySelector('.gameboard');
        // clear the board
        Array.from(gameBoard.childNodes).forEach((box) => {
            box.remove()
        })
        // Add nine boxes
        for (let i=0; i < 9; i++) {
            const newBox = document.createElement('div');
            newBox.textContent = board[i];
            newBox.dataset.index = i;
            newBox.classList = 'box unmarked'
            gameBoard.appendChild(newBox);
        }
    }

    const startGame = function(){
        turn = 1;
        board = ["", "", "", "", "", "", "", "", ""];
        winner = null;
        displayControll.clearResult();
        displayControll.displayPlayersTurn();
        renderBoard();
        let boxes = document.querySelectorAll('.box');
        boxes.forEach((box) => {
            box.addEventListener('click', onClickEvent)
        })
    }
    return {startGame, displayControll};
})();

gameBoard.startGame();
gameBoard.displayControll.displayPlayers();

const restartButton = document.querySelector('#restart');
restartButton.addEventListener('click', gameBoard.startGame);
const editPlayersButton = document.querySelector('#edit');
editPlayersButton.addEventListener('click', () => {
    gameBoard.displayControll.getPlayersInformation();
    gameBoard.displayControll.displayPlayers();
});