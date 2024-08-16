const player1 = createPlayer("Glohny","X",document.querySelector(".Score1"));
const player2 = createPlayer("Andrew","O",document.querySelector(".Score2"));
let AllButtons = document.querySelectorAll(".BoardButton");

const GameController = (function() {
    let PlayerTurn = true
    const GetTurnSymbol = function() {
        if (PlayerTurn) {
            PlayerTurn = false;
            return player1.GetSymbol();
        }
        else {
            PlayerTurn = true;
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
            AttributeChanger.HighlightButton();
            AttributeChanger.ChangeScore(player1);
            AllButtons.forEach(button => {
                button.disabled = true;
            });
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
            AttributeChanger.HighlightButton();
            AttributeChanger.ChangeScore(player2);
            AllButtons.forEach(button => {
                button.disabled = true;
            });
        } 
        else if (gameboard.every(row => row.every(cell => cell !== ''))) {
            AttributeChanger.HighlightButton();
        }
    }

    const reset = function(gameboard) {
        AllButtons.disabled = false;
        for(let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                gameboard[i][j] = "";
            }
        }

        for (let i = 0; i < 9; i++) {
            AllButtons[i].innerHTML = "";
        }

        AllButtons.forEach(button => {
            button.disabled = false;
        });

        AttributeChanger.unHighlightButton();
    }

    return {
        GetTurnSymbol, CheckWinner, reset
    }
})();

const AttributeChanger = (function() {
    const ResetButton = document.querySelector(".ResetButton");
    const HighlightButton = function() {
        ResetButton.style.transition = ".5s";
        ResetButton.style.height = "60px";
        ResetButton.style.width = "210px";
        ResetButton.style.fontSize = "50px";
        ResetButton.style.boxShadow = "0 5px 8px -1px rgba(255, 255, 255, 0.4)";
    }
    
    const unHighlightButton = function() {
        ResetButton.style.transition = ".25s";
        ResetButton.style.height = "50px";
        ResetButton.style.width = "200px";
        ResetButton.style.fontSize = "45px";
        ResetButton.style.boxShadow = "none";
    }
    
    const ChangeScore = function(player) {
        let ScoreText = player.GetDivStation().innerHTML.substring(0,9);
        let CurrentScore = parseInt(player.GetDivStation().innerHTML.substring(9));
        let NewScoreText = ScoreText + (CurrentScore + 1);
        player.GetDivStation().innerHTML = NewScoreText;
    }

    return {
        HighlightButton, unHighlightButton, ChangeScore
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
        let mySound = new Audio("Assets/SoundEffects/click.wav");
        mySound.volume = 0.3;
        mySound.play();
        if (gameboard[pos1][pos2] != "") {
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

function createPlayer (name,symbol,DivStation) {
    this.name = name;
    this.symbol = symbol;
    this.DivStation = DivStation;
    const GetName = function() {
        return symbol;
    };
    const GetSymbol = function() {
        return symbol;
    };

    const GetDivStation = function() {
        return DivStation;
    };

    return {
        GetName, GetSymbol, GetDivStation
    }
}