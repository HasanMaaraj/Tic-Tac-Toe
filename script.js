const gameBoard = (function() {
    const playerFactory = function(name, mark){
        return {name, mark}
    }

    const player1 = playerFactory('Hasan', 'X');
    const player2 = playerFactory('Foo', 'O');
    let turn = 1;
    let board = ["", "", "", "", "", "", "", "", ""];
    let winner = null;

    markPlayer = (box) => {
        // Mark the box based on who's turn is it
        if (turn % 2 === 0){
            box.textContent = player1.mark;
        } else {
            box.textContent = player2.mark;
        }
    }

    const renderBoard = function() {
        const gameBoard = document.querySelector('.gameboard');
        // clear the board
        Array.from(gameBoard.childNodes).forEach((box) => {
            box.remove()
        })
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
            // Empty all boxes
            box.textContent = '';
            box.addEventListener('click', () => {
                //  Trigger event listener only if box is empty
                if (box.textContent === '') {
                    markPlayer(box);
                    turn++;
                }
            })
        })
    }
    startGame();
})();