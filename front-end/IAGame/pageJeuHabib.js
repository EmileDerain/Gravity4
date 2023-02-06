var socket = io();

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

function play(event) {
    const rowNumber = whichColumnHasBeenClicked(event)
    const columnNumber = whichColumnHasBeenClickedNumber(event)

    socket.emit('updatedBoard', JSON.stringify({rowNumber, columnNumber}));
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

