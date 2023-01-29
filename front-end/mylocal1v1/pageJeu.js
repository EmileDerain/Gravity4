window.onload = function() {

    const temps = document.getElementById("timer")
    let tempo = 0;

    function timer() {
        let minutes = parseInt(tempo / 60, 10)
        let secondes = parseInt(tempo % 60, 10)
        tempo++
        let textMinutes = (minutes>9)?minutes:"0"+minutes;
        let textSecondes = (secondes>9)?secondes:"0"+secondes;
        temps.innerText = textMinutes + ":" + textSecondes;
    }

    function colorieBasPlateau(){
        let tab = [];
        tab.push(document.getElementsByClassName("colonne1"));
        tab.push(document.getElementsByClassName("colonne2"));
        tab.push(document.getElementsByClassName("colonne3"));
        tab.push(document.getElementsByClassName("colonne4"));
        tab.push(document.getElementsByClassName("colonne5"));
        tab.push(document.getElementsByClassName("colonne6"));
        tab.push(document.getElementsByClassName("colonne7"));
        tab.forEach(x => colorie(x));
    }
    function colorie(elements){
        let taille = elements.length
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener("mouseover", function() {
                elements[taille-1].style.border = "5px #0059ff inset";
            });
            elements[i].addEventListener("mouseout", function() {
                elements[taille-1].style.border = "5px #00ff15 inset";
            });
        }
    }

    setInterval(timer, 1000);
    colorieBasPlateau();
}