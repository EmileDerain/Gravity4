const {Server} = require("socket.io");
const aiLogic = require('../logic/ai.js');

function initSocket(server) {
    const io = new Server(server);

    io.on('connection', socket => {
        console.log('Connexion pour une partie contre IA, socketID');

        //Creation du game state
        let gameState;

        socket.on('setup', (msg) => {
            const AIplays = JSON.parse(msg).AIplays;
            if (AIplays === 1) {
                gameState = new GameState(2, 1);
                gameState.play(aiLogic.computeMove(gameState)[0], gameState.IANumber);
                console.log("gameState.IANumber: ", gameState.IANumber);
                socket.emit('updatedBoard', JSON.stringify({"board": gameState.board}));
            } else {
                gameState = new GameState(1, 2);
                socket.emit('updatedBoard', JSON.stringify({"board": gameState.board}));
            }
        })

        socket.on('updatedBoard', (msg) => {
            const obj = JSON.parse(msg);
            if (gameState.play(obj[0], gameState.playerNumber)) {
                console.log('WIN du joueur ', gameState.playerNumber);
                socket.emit('gameOver', {"winner": gameState.playerNumber});
                wegotawinner = true;
            }
            console.log('obj: ', obj);
            if (gameState.play(aiLogic.computeMove(gameState)[0], gameState.IANumber)) {
                console.log('WIN du joueur ', gameState.IANumber);
                socket.emit('gameOver', {"winner": gameState.IANumber});
                wegotawinner = true;
            }

            socket.emit('updatedBoard', JSON.stringify({"board": gameState.board}));
        });

        socket.on('disconnect', () => {
            console.log("Fin d'une partie contre IA");
        });
    });
}

exports.initSocket = initSocket;

class GameState {
    arrayColumnMinus3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arrayColumnMinus2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arrayColumnMinus1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    arrayColumn0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arrayColumn1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arrayColumn2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arrayColumn3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arrayColumn4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arrayColumn5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arrayColumn6 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    arrayColumnPlus7 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arrayColumnPlus8 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    arrayColumnPlus9 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    nbPawnForEachColumns = [3, 3, 3, 3, 3, 3, 3];

    pow4 = [this.arrayColumnMinus3, this.arrayColumnMinus2, this.arrayColumnMinus1, this.arrayColumn0, this.arrayColumn1, this.arrayColumn2, this.arrayColumn3,
        this.arrayColumn4, this.arrayColumn5, this.arrayColumn6, this.arrayColumnPlus7, this.arrayColumnPlus8, this.arrayColumnPlus9];  //Tab : row = 12, col = 13

    board = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];  //Tab : row = 12, col = 13

    IANumber;
    playerNumber;

    constructor(numberPlayer, numberIA) {
        this.playerNumber = numberPlayer;
        this.IANumber = numberIA;
    }

    play(column, player) {
        switch (column) {
            case 0:
                this.arrayColumn0[this.nbPawnForEachColumns[0]] = player;
                this.board[0][this.nbPawnForEachColumns[0] - 3] = player;
                this.nbPawnForEachColumns[0] += 1;
                break;
            case 1:
                this.arrayColumn1[this.nbPawnForEachColumns[1]] = player;
                this.board[1][this.nbPawnForEachColumns[1] - 3] = player;
                this.nbPawnForEachColumns[1] += 1;
                break;
            case 2:
                this.arrayColumn2[this.nbPawnForEachColumns[2]] = player;
                this.board[2][this.nbPawnForEachColumns[2] - 3] = player;
                this.nbPawnForEachColumns[2] += 1;
                break;
            case 3:
                this.arrayColumn3[this.nbPawnForEachColumns[3]] = player;
                this.board[3][this.nbPawnForEachColumns[3] - 3] = player;
                this.nbPawnForEachColumns[3] += 1;
                break;
            case 4:
                this.arrayColumn4[this.nbPawnForEachColumns[4]] = player;
                this.board[4][this.nbPawnForEachColumns[4] - 3] = player;
                this.nbPawnForEachColumns[4] += 1;
                break;
            case 5:
                this.arrayColumn5[this.nbPawnForEachColumns[5]] = player;
                this.board[5][this.nbPawnForEachColumns[5] - 3] = player;
                this.nbPawnForEachColumns[5] += 1;
                break;
            case 6:
                this.arrayColumn6[this.nbPawnForEachColumns[6]] = player;
                this.board[6][this.nbPawnForEachColumns[6] - 3] = player;
                this.nbPawnForEachColumns[6] += 1;
        }
        return this.checkPow4(column);
    }

    isThatPlayOKay(colunm) {
        if (this.nbPawnForEachColumns[this.nbPawnForEachColumns] - 3 >= 6) {
            alert("Il n'y a plus de place dans cette colonne. Choisissez un autre emplacement");
            return false;
        }
        return true;
    }

    checkPow4(columnNumberForCheck) {
        let column = columnNumberForCheck + 3; //car de base col0 = 1
        let row = this.nbPawnForEachColumns[column - 3] - 1//car de base col0 = 1
        console.log("Center :", column, row);
        //Row :
        for (let pas = -3; pas < 1; pas++) {
            let sum = 0;
            for (let col = 0; col < 4; col++) {
                sum += this.pow4[column + pas + col][row] === 0 ? 0 : -1;
            }
            if (sum === 4 || sum === -4) {
                return true;
            }
        }

        //Column
        for (let pas = -3; pas < 1; pas++) {
            let sum = 0;
            for (let ro = 0; ro < 4; ro++) {
                sum += this.pow4[column][row + pas + ro] === 1 ? 1 : -1;
            }
            if (sum === 4 || sum === -4) {
                return true;
            }
        }

        //SO - NE
        for (let pas = -3; pas < 1; pas++) {
            let sum = 0;
            for (let pas2 = -3; pas2 < 1; pas2++) {
                sum += this.pow4[column + pas2][row + pas2] === 1 ? 1 : -1;
            }
            if (sum === 4 || sum === -4) {
                return true;
            }
        }

        //NO - SE
        for (let pas = -3; pas < 1; pas++) {
            let sum = 0;
            for (let pas2 = -3; pas2 < 1; pas2++) {
                sum += this.pow4[column - pas2][row + pas2] === 1 ? 1 : -1;
            }
            if (sum === 4 || sum === -4) {
                return true;
            }
        }

        return false;

    }

}