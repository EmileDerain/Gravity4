const column1 = document.getElementById('column1');
const column2 = document.getElementById('column2');
const column3 = document.getElementById('column3');
const column4 = document.getElementById('column4');
const column5 = document.getElementById('column5');
const column6 = document.getElementById('column6');
const column7 = document.getElementById('column7');

column1.addEventListener('click', play)
column2.addEventListener('click', play)
column3.addEventListener('click', play)
column4.addEventListener('click', play)
column5.addEventListener('click', play)
column6.addEventListener('click', play)
column7.addEventListener('click', play)


let currentPlayer = 1;
let wegotawinner = false;

let arrayColumnMinus3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let arrayColumnMinus2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let arrayColumnMinus1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let arrayColumn0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let arrayColumn1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let arrayColumn2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let arrayColumn3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let arrayColumn4 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let arrayColumn5 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let arrayColumn6 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

let arrayColumnPlus7 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let arrayColumnPlus8 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let arrayColumnPlus9 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

var nbPawnForEachColumns = [3, 3, 3, 3, 3, 3, 3];

let pow4 = [arrayColumnMinus3, arrayColumnMinus2, arrayColumnMinus1, arrayColumn0, arrayColumn1, arrayColumn2, arrayColumn3, arrayColumn4, arrayColumn5, arrayColumn6, arrayColumnPlus7, arrayColumnPlus8, arrayColumnPlus9];  //Tab : row = 12, col = 13

function play(event) {
    console.log(wegotawinner)
    if (wegotawinner == false) {
        const rowNumber = whichColumnHasBeenClicked(event) - 3
        const columnNumber = whichColumnHasBeenClickedNumber(event)
        if (!isThatPlayOKay(rowNumber)) {
            return;
        }
        if (currentPlayer == 1) {
            let row = "row";
            row += columnNumber;
            row += rowNumber + 1  //Peut être uniformisé ?!
            document.getElementById(row).className = "case4 case4red"
            document.getElementById("currentPlayer").className = "couleur couleurYellow"
            addPawnForAplayer(event, 1)
            currentPlayer = -1
            console.log(arrayColumn0.length)
            console.log(arrayColumn1.length)
            console.log("Tab :", pow4);
            if (checkPow4(columnNumber)) {
                document.getElementById("currentWinner").className = "couleur couleurRed"
                document.getElementById("winnerscreen").style.visibility = "visible"
                wegotawinner = true;

            }
            return;
        }
        if (currentPlayer == -1) {
            let row = "row";
            row += columnNumber;
            row += rowNumber + 1;
            document.getElementById(row).className = "case4 case4yellow"
            document.getElementById("currentPlayer").className = "couleur couleurRed"
            addPawnForAplayer(event, -1)
            currentPlayer = 1
            console.log(arrayColumn0.length)
            console.log(arrayColumn1.length)
            console.log("Tab :", pow4);
            if (checkPow4(columnNumber)) {
                document.getElementById("currentWinner").className = "couleur couleurYellow"
                document.getElementById("winnerscreen").style.visibility = "visible"
                wegotawinner = true;
            }
            return;
        }
    } else {
        return;
    }


}


function addPawnForAplayer(event, int) {
    switch (event.composedPath()[1].id) {
        case "column1":
            arrayColumn0[nbPawnForEachColumns[0]] = int;
            nbPawnForEachColumns[0] += 1;
            break;
        case "column2":
            arrayColumn1[nbPawnForEachColumns[1]] = int;
            nbPawnForEachColumns[1] += 1;
            break;
        case "column3":
            arrayColumn2[nbPawnForEachColumns[2]] = int;
            nbPawnForEachColumns[2] += 1;
            break;
        case "column4":
            arrayColumn3[nbPawnForEachColumns[3]] = int;
            nbPawnForEachColumns[3] += 1;
            break;
        case "column5":
            arrayColumn4[nbPawnForEachColumns[4]] = int;
            nbPawnForEachColumns[4] += 1;
            break;
        case "column6":
            arrayColumn5[nbPawnForEachColumns[5]] = int;
            nbPawnForEachColumns[5] += 1;
            break;
        case "column7":
            arrayColumn6[nbPawnForEachColumns[6]] = int;
            nbPawnForEachColumns[6] += 1;
    }
}

function whichColumnHasBeenClicked(event) {
    switch (event.composedPath()[1].id) {
        case "column1":
            return nbPawnForEachColumns[0];
        case "column2":
            return nbPawnForEachColumns[1];
        case "column3":
            return nbPawnForEachColumns[2];
        case "column4":
            return nbPawnForEachColumns[3];
        case "column5":
            return nbPawnForEachColumns[4];
        case "column6":
            return nbPawnForEachColumns[5];
        case "column7":
            return nbPawnForEachColumns[6];

    }
}

function whichColumnHasBeenClickedNumber(event) {
    switch (event.composedPath()[1].id) {
        case "column1":
            return 1;
        case "column2":
            return 2;
        case "column3":
            return 3;
        case "column4":
            return 4;
        case "column5":
            return 5;
        case "column6":
            return 6;
        case "column7":
            return 7;
    }
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

function isThatPlayOKay(int) {
    if (int >= 6) {
        alert("Il n'y a plus de place dans cette colonne. Choisissez un autre emplacement");
        return false;
    }
    return true;
}

window.onload = function () {

    const temps = document.getElementById("timer")
    let tempo = 0;

    function timer() {
        let minutes = parseInt(tempo / 60, 10)
        let secondes = parseInt(tempo % 60, 10)
        tempo++
        let textMinutes = (minutes > 9) ? minutes : "0" + minutes;
        let textSecondes = (secondes > 9) ? secondes : "0" + secondes;
        temps.innerText = textMinutes + ":" + textSecondes;
    }

    function colorieBasPlateau() {
        let tab = [];
        tab.push(document.getElementById("column1"));
        tab.push(document.getElementById("column2"));
        tab.push(document.getElementById("column3"));
        tab.push(document.getElementById("column4"));
        tab.push(document.getElementById("column5"));
        tab.push(document.getElementById("column6"));
        tab.push(document.getElementById("column7"));
        tab.forEach(x => colorie(x));
    }

    function colorie(elements) {
        let taille = elements.length
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener("mouseover", function () {

                elements[taille - 1].style.border = "5px #0059ff inset";
            });
            elements[i].addEventListener("mouseout", function () {
                elements[taille - 1].style.border = "5px #00ff15 inset";
            });
        }
    }

    setInterval(timer, 1000);
    colorieBasPlateau();
}

