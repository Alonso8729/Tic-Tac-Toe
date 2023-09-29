
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
                gameHandle.playRound(cell.getAttribute('data-index'));
                displayGameBoard();
            }
        })
    })

    restart.addEventListener('click', (e) => {
        gameBoard.resetBoard();
        displayGameBoard();
    })

    //const setTurnMessage = () => {
    //   return gameHandle.getPlayerTurn() === "X" ? commentary.textContent = "Player X's turn" : commentary.textContent = "Player O's turn";
    //}

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

    return { setCommentary };
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
        if (checkForWin) {
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

    return { playRound, checkGameOver, getPlayerMarker }
})();