const {Server} = require("socket.io");
const gameManager = require('../logic/gameManager.js');
const aiLogic = require('../logic/ai.js');


function initSocket(server) {
    const io = new Server(server);

    io.on('connection', (socket) => {
        console.log('Début de partie');

        let boardPlay = new Board();

        socket.on('disconnect', () => {
            console.log('Fin de partie');
        });

        socket.on('updatedBoard', (msg) => {
            const obj = JSON.parse(msg);
            console.log(obj);

        });
    });
}

exports.initSocket = initSocket;

class Board {
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

    constructor() {
    }

    play(colunm, player) {
        switch (colunm) {
            case 1:
                arrayColumn0[nbPawnForEachColumns[0]] = player;
                nbPawnForEachColumns[0] += 1;
                break;
            case 2:
                arrayColumn1[nbPawnForEachColumns[1]] = player;
                nbPawnForEachColumns[1] += 1;
                break;
            case 3:
                arrayColumn2[nbPawnForEachColumns[2]] = player;
                nbPawnForEachColumns[2] += 1;
                break;
            case 4:
                arrayColumn3[nbPawnForEachColumns[3]] = player;
                nbPawnForEachColumns[3] += 1;
                break;
            case 5:
                arrayColumn4[nbPawnForEachColumns[4]] = player;
                nbPawnForEachColumns[4] += 1;
                break;
            case 6:
                arrayColumn5[nbPawnForEachColumns[5]] = player;
                nbPawnForEachColumns[5] += 1;
                break;
            case 7:
                arrayColumn6[nbPawnForEachColumns[6]] = player;
                nbPawnForEachColumns[6] += 1;
        }
    }

    isThatPlayOKay(colunm) {
        if (nbPawnForEachColumns[nbPawnForEachColumns] - 3 >= 6) {
            alert("Il n'y a plus de place dans cette colonne. Choisissez un autre emplacement");
            return false;
        }
        return true;
    }

    checkPow4(columnNumberForCheck) {
        let column = columnNumberForCheck + 2; //car de base col0 = 1
        let row = nbPawnForEachColumns[column - 3] - 1 //car de base col0 = 1
        console.log("Center :", column, row);
        //Row :
        for (let pas = -3; pas < 1; pas++) {
            let sum = 0;
            for (let col = 0; col < 4; col++) {
                sum += pow4[column + pas + col][row];
            }
            if (sum === 4 || sum === -4) {
                return true;
            }
        }

        //Column
        for (let pas = -3; pas < 1; pas++) {
            let sum = 0;
            for (let ro = 0; ro < 4; ro++) {
                sum += pow4[column][row + pas + ro];
            }
            if (sum === 4 || sum === -4) {
                return true;
            }
        }

        //SO - NE
        for (let pas = -3; pas < 1; pas++) {
            let sum = 0;
            for (let pas2 = -3; pas2 < 1; pas2++) {
                sum += pow4[column + pas2][row + pas2];
            }
            if (sum === 4 || sum === -4) {
                return true;
            }
        }

        //NO - SE
        for (let pas = -3; pas < 1; pas++) {
            let sum = 0;
            for (let pas2 = -3; pas2 < 1; pas2++) {
                sum += pow4[column - pas2][row + pas2];
            }
            if (sum === 4 || sum === -4) {
                return true;
            }
        }

    }

}