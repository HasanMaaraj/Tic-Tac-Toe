const gameBoard = (function() {
    const playerFactory = function(name, mark){
        return {name, mark}
    }

    const player1 = playerFactory('Hasan', 'X');
    const player2 = playerFactory('Foo', 'O');
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

    const announceWinner = function(mark, combo) {
        if (mark === player1.mark){
            console.log(`Player ${player1.name} Won!`)
        } else {
            console.log(`Player ${player2.name} Won!`)
        }
        for (let i=0; i < combo.length; i++) {
            const comboBox = document.querySelector(`div[data-index="${combo[i]}"]`);
            comboBox.classList.add('winning-combo');
        }
    }

    const onClickEvent = function() {
        //  Trigger event listener only if box is empty
        if (this.textContent === '') {
           markPlayer(this);
           checkWinner();
           turn++;
       }
   }

    const stopGame = function() {
        const boxes = document.querySelectorAll('.box');
        boxes.forEach((box) => {
            box.removeEventListener('click', onClickEvent);
            box.classList.remove('unmarked')
        });
    }

    const checkWinner = function() {
        for (let i=0; i<winningCombos.length; i++) {
            if (board[winningCombos[i][0]]
                && board[winningCombos[i][0]] === board[winningCombos[i][1]] 
                && board[winningCombos[i][0]] === board[winningCombos[i][2]]) {
                stopGame()
                announceWinner(board[winningCombos[i][0]], winningCombos[i]);
            }
        }
    }

    markPlayer = (box) => {
        // Mark the box based on who's turn is it
        box.classList.remove('unmarked')
        if (turn % 2 === 1){
            board[box.dataset.index] = player1.mark;
            box.textContent = player1.mark;
        } else {
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
        renderBoard();
        let boxes = document.querySelectorAll('.box');
        boxes.forEach((box) => {
            box.addEventListener('click', onClickEvent)
        })
    }
    return {startGame, checkWinner};
})();

gameBoard.startGame();