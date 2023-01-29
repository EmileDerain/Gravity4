
const column1 = document.getElementById('column1');
const column2 = document.getElementById('column2');
const column3 = document.getElementById('column3');
const column4 = document.getElementById('column4');
const column5 = document.getElementById('column5');
const column6 = document.getElementById('column6');
const column7 = document.getElementById('column7');

column1.addEventListener('click',play)
column2.addEventListener('click',play)
column3.addEventListener('click',play)
column4.addEventListener('click',play)
column5.addEventListener('click',play)
column6.addEventListener('click',play)
column7.addEventListener('click',play)


let currentPlayer=1;

let arrayColumn0 = [];
let arrayColumn1 = [];
let arrayColumn2 = [];
let arrayColumn3 = [];
let arrayColumn4 = [];
let arrayColumn5 = [];
let arrayColumn6 = [];

let pow4 =[arrayColumn0,arrayColumn1,arrayColumn2,arrayColumn3,arrayColumn4,arrayColumn5,arrayColumn6];

function play(event){
   


    const rowNumber=whichColumnHasBeenClicked(event)
    const columnNumber=whichColumnHasBeenClickedNumber(event)
    if(!isThatPlayOKay(rowNumber)){
        return;
    }
    if(currentPlayer==1){
        let row="row";
        row+=columnNumber;
        row+=rowNumber+1
        document.getElementById(row).className="case4red"
        addPawnForAplayer(event,1)
        currentPlayer=-1
        console.log(arrayColumn0.length)
        console.log(arrayColumn1.length)
        return;
    }
    if(currentPlayer==-1){
        let row="row";
        row+=columnNumber;
        row+=rowNumber+1;
        document.getElementById(row).className="case4yellow"
        addPawnForAplayer(event,-1)
        currentPlayer=1
        console.log(arrayColumn0.length)
        console.log(arrayColumn1.length)
        return;
    }
}




function addPawnForAplayer(event,int){
    switch (event.composedPath()[1].id) {
        case "column1":
            arrayColumn0.push(int)
            break
        case "column2":
            arrayColumn1.push(int)
            break
        case "column3":
            arrayColumn2.push(int)
            break
        case "column4":
            arrayColumn3.push(int)
            break
        case "column5":
            arrayColumn4.push(int)
            break
        case "column6":
            arrayColumn5.push(int)
            break
        case "column7":
            arrayColumn6.push(int)
    }
}

function whichColumnHasBeenClicked(event) {
    switch (event.composedPath()[1].id) {
        case "column1": return arrayColumn0.length
        case "column2": return arrayColumn1.length
        case "column3": return arrayColumn2.length
        case "column4": return arrayColumn3.length
        case "column5": return arrayColumn4.length
        case "column6": return arrayColumn5.length
        case "column7": return arrayColumn6.length

    }
}

function whichColumnHasBeenClickedNumber(event){
    switch (event.composedPath()[1].id) {
        case "column1": return 1
        case "column2": return 2
        case "column3": return 3
        case "column4": return 4
        case "column5": return 5
        case "column6": return 6
        case "column7": return 7
    }
}

function isThatPlayOKay(int){
    if(int>=7){
        alert("Il n'y a plus de place dans cette colonne. Choisissez un autre emplacement")

        return false
    }
    return true
}

