
const Player = (marker) => {
    return { marker };
};

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const setMarker = ((index, marker) => {
        board[index] = marker;
    })

    const getMarker = ((index) => {
        return board[index];
    })

    resetBoard = () => {
        for (let i = 0; i < board.length; i++)
            board[i] = "";
    }

    isCellEmpty = ((index) => {
        return board[index] === "";
    })

    return { setMarker, getMarker, resetBoard, isCellEmpty };
})();


const displayController = (() => {

    const commentary = document.getElementById('commentary');
    const restart = document.getElementById('restart');
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.addEventListener('click', (event) => {
            if (!gameHandle.checkGameOver() && gameBoard.isCellEmpty(index)) {
                gameHandle.playRound(parseInt(cell.getAttribute('data-index')));
                displayGameBoard();
            }
        })
    })

    restart.addEventListener('click', (e) => {
        gameHandle.resetGame();
        gameBoard.resetBoard();
        displayGameBoard();
        setCommentary("Player X's turn");
    })

    const setCommentary = ((message) => {
        commentary.textContent = message;
    });

    const setWinner = (marker) => {
        commentary.textContent = `Player ${marker} is the winner!`
    }

    const displayGameBoard = () => {
        for (let i = 0; i < cells.length; i++) {
            cells[i].textContent = gameBoard.getMarker(i);
        }
    }

    return { setCommentary, setWinner };
})();



const gameHandle = (() => {
    let playerX = Player("X");
    let playerO = Player("O");
    let isGameOver;
    let round = 1;

    const getPlayerMarker = () => {
        return round % 2 === 0 ? playerO.marker : playerX.marker;
    }



    const playRound = ((index) => {
        gameBoard.setMarker(index, getPlayerMarker());
        if (checkForWin(index)) {
            displayController.setWinner(getPlayerMarker());
            isGameOver = true;
            return;
        }
        if (round == 9) {
            displayController.setCommentary("It's a draw!");
            isGameOver = true;
            return;
        }


        round++;
        displayController.setCommentary(`Player ${getPlayerMarker()}'s turn`);
    });

    const resetGame = (() => {
        round = 1;
        isGameOver = false;
    })

    checkGameOver = (() => {
        return isGameOver;
    })

    const checkForWin = ((index) => {
        console.log("checkForWin called");
        console.log(index)
        const winCombos =
            [
                [0, 1, 2], // Top row
                [3, 4, 5], // Middle row
                [6, 7, 8], // Bottom row
                [0, 3, 6], // Left column
                [1, 4, 7], // Middle column
                [2, 5, 8], // Right column
                [0, 4, 8], // Diagonal from top-left to bottom-right
                [2, 4, 6], // Diagonal from top-right to bottom-left
            ];
        for (const combo of winCombos) {
            console.log("Combo:", combo);
            if (combo.includes(index)) {
                console.log("Index:", index);
                console.log("Current Player Marker:", getPlayerMarker());
                if (combo.every(position => gameBoard.getMarker(position) === getPlayerMarker())) {
                    console.log("true"); // Debug statement
                    return true; // Return true only if a winning combo is found
                }
            }
        }

        console.log("false"); // Debug statement
        return false; // Return false if no winning combo is found
    });


    return { playRound, checkGameOver, resetGame }
})();