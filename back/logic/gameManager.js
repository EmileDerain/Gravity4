function gameChecker(gameState, move) {

}

function isThatPlayOKay(int) {
    if (int >= 6) {
        alert("Il n'y a plus de place dans cette colonne. Choisissez un autre emplacement");
        return false;
    }
    return true;
}

function checkPow4(columnNumberForCheck) {
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

exports.gameChecker = gameChecker;