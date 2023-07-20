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

    const checkWinner = function() {
        for (let i=0; i<winningCombos.length; i++) {
            if (board[winningCombos[i][0]]
                && board[winningCombos[i][0]] === board[winningCombos[i][1]] 
                && board[winningCombos[i][0]] === board[winningCombos[i][2]]) {
                announceWinner(winningCombos[i][0]);
            }
        }
    }
    markPlayer = (box) => {
        // Mark the box based on who's turn is it
        box.classList.remove('unmarked')
        if (turn % 2 === 1){
            board[box.dataset.index-1] = player1.mark;
            box.textContent = player1.mark;
        } else {
            board[box.dataset.index-1] = player2.mark;
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
            newBox.dataset.index = i+1;
            newBox.classList = 'box unmarked'
            gameBoard.appendChild(newBox);
        }
    }


    const startGame = function(){
        renderBoard();
        let boxes = document.querySelectorAll('.box');
        boxes.forEach((box) => {
            box.addEventListener('click', () => {
                //  Trigger event listener only if box is empty
                if (box.textContent === '') {
                    markPlayer(box);
                    checkWinner();
                    turn++;
                }
            })
        })
    }
    return {startGame, checkWinner};
})();

gameBoard.startGame();