const player1 = createPlayer("Glohny","X");
const player2 = createPlayer("Andrew","O");

const GameController = (function() {
    let PlayerTurn = true
    const GetTurnSymbol = function() {
        if (PlayerTurn) {
            PlayerTurn = false;
            console.log("Returning: " + player1)
            return player1.GetSymbol();
        }
        else {
            PlayerTurn = true;
            console.log("Returning: " + player2)
            return player2.GetSymbol();
        }
    }

    const CheckWinner = function(gameboard) {
        if (
            (gameboard[0][0] === 'X' && gameboard[0][1] === 'X' && gameboard[0][2] === 'X') || // Top row
            (gameboard[1][0] === 'X' && gameboard[1][1] === 'X' && gameboard[1][2] === 'X') || // Middle row
            (gameboard[2][0] === 'X' && gameboard[2][1] === 'X' && gameboard[2][2] === 'X') || // Bottom row
            (gameboard[0][0] === 'X' && gameboard[1][0] === 'X' && gameboard[2][0] === 'X') || // Left column
            (gameboard[0][1] === 'X' && gameboard[1][1] === 'X' && gameboard[2][1] === 'X') || // Middle column
            (gameboard[0][2] === 'X' && gameboard[1][2] === 'X' && gameboard[2][2] === 'X') || // Right column
            (gameboard[0][0] === 'X' && gameboard[1][1] === 'X' && gameboard[2][2] === 'X') || // Main diagonal
            (gameboard[0][2] === 'X' && gameboard[1][1] === 'X' && gameboard[2][0] === 'X')    // Anti-diagonal
        ) {
            console.log("X wins!");
        }
        
        // Check if O wins
        else if (
            (gameboard[0][0] === 'O' && gameboard[0][1] === 'O' && gameboard[0][2] === 'O') || // Top row
            (gameboard[1][0] === 'O' && gameboard[1][1] === 'O' && gameboard[1][2] === 'O') || // Middle row
            (gameboard[2][0] === 'O' && gameboard[2][1] === 'O' && gameboard[2][2] === 'O') || // Bottom row
            (gameboard[0][0] === 'O' && gameboard[1][0] === 'O' && gameboard[2][0] === 'O') || // Left column
            (gameboard[0][1] === 'O' && gameboard[1][1] === 'O' && gameboard[2][1] === 'O') || // Middle column
            (gameboard[0][2] === 'O' && gameboard[1][2] === 'O' && gameboard[2][2] === 'O') || // Right column
            (gameboard[0][0] === 'O' && gameboard[1][1] === 'O' && gameboard[2][2] === 'O') || // Main diagonal
            (gameboard[0][2] === 'O' && gameboard[1][1] === 'O' && gameboard[2][0] === 'O')    // Anti-diagonal
        ) {
            console.log("O wins!");
        } else {
            console.log("No winner yet!");
        }
    }

    const reset = function(gameboard) {
        for(let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameboard[i][j] = "";
            }
        }

        let AllButtons = document.querySelectorAll(".BoardButton");
        console.log(AllButtons);
        for (let i = 0; i < 9; i++) {
            AllButtons[i].innerHTML = "";
        }

        console.table(gameboard)
    }

    return {
        GetTurnSymbol, CheckWinner, reset
    }
})();

const GameBoard = (function() {
    const gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    document.querySelector(".ResetButton").addEventListener("click", () => GameController.reset(gameboard));
    const DefineSymbol = function(pos1,pos2,but) {
        if (gameboard[pos1][pos2] != "") {
            console.log("Choose Different Spot");
        }
        else {
            gameboard[pos1][pos2] = GameController.GetTurnSymbol();
            but.innerHTML = gameboard[pos1][pos2];
            GameController.CheckWinner(gameboard);   
        }
    }

    return {
        DefineSymbol
    };
})();

function createPlayer (name,symbol) {
    this.name = name;
    this.symbol = symbol;
    const GetName = function() {
        return symbol;
    };
    const GetSymbol = function() {
        return symbol;
    };

    return {
        GetName, GetSymbol
    }
}