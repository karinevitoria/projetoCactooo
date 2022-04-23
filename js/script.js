
import { girias } from "./girias.js"

const NUMBER_OF_GUESSES = 7;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = girias[Math.floor(Math.random() * girias.length)];
console.log(rightGuessString)

function shareText() {

    let jogoPreenchido = $(".filled-box");
    let allFilledBoxesColors = []

    for (let i = 0; i < jogoPreenchido.length; i++) {
        allFilledBoxesColors.push(jogoPreenchido[i].style.backgroundColor);
        // a gente vai pegar todos os indices de cada cor aham. e colocar numa array q q a gente faz com a arraa? SPLICE NELAS FOR CADA I QUE O I VAI SER A ARRAY.LENGTH VAMO PEGAR O VALOR DAR UM SPLICE NELA E SUBSITUIR . eh isso gatas
    }
    var colorGray = [];
    allFilledBoxesColors.reduce(function (a, e, i) {
        if (e == 'rgb(182, 169, 145)')
            colorGray.push(i);
        return colorGray;
    }, [])
    for (let index = 0; index < colorGray.length; index++) {
        allFilledBoxesColors.splice(colorGray[index], 1, '⬛');
    }


    var colorYellow = [];
    allFilledBoxesColors.reduce(function (a, e, i) {
        if (e == 'rgb(238, 187, 77)')
            colorYellow.push(i);
        return colorYellow;
    }, [])
    for (let index = 0; index < colorYellow.length; index++) {
        allFilledBoxesColors.splice(colorYellow[index], 1, '☀');
    }

    var colorGreen = [];
    allFilledBoxesColors.reduce(function (a, e, i) {
        if (e == 'rgb(93, 112, 20)' || e == '')
            colorGreen.push(i);
        return colorGreen;
    }, [])
    for (let index = 0; index < colorGreen.length; index++) {
        allFilledBoxesColors.splice(colorGreen[index], 1, '🌵');
    }

    var coresTexto

    if(allFilledBoxesColors.length == 6){
        var coresTexto = allFilledBoxesColors.toString().replace(/,/g, '');
    } else if (allFilledBoxesColors.length == 12){
        allFilledBoxesColors.splice(6, 0, '%0A');
        var coresTexto = allFilledBoxesColors.toString().replace(/,/g, '');
    } else if (allFilledBoxesColors.length == 18){
        allFilledBoxesColors.splice(6, 0, '%0A');
        allFilledBoxesColors.splice(13, 0, '%0A');
        var coresTexto = allFilledBoxesColors.toString().replace(/,/g, '');
    } else if (allFilledBoxesColors.length == 24){
        allFilledBoxesColors.splice(6, 0, '%0A');
        allFilledBoxesColors.splice(13, 0, '%0A');
        allFilledBoxesColors.splice(20, 0, '%0A');
        var coresTexto = allFilledBoxesColors.toString().replace(/,/g, '');
    } else if (allFilledBoxesColors.length == 30){
        allFilledBoxesColors.splice(6, 0, '%0A');
        allFilledBoxesColors.splice(13, 0, '%0A');
        allFilledBoxesColors.splice(20, 0, '%0A');
        allFilledBoxesColors.splice(27, 0, '%0A');
        var coresTexto = allFilledBoxesColors.toString().replace(/,/g, '');
    } else if (allFilledBoxesColors.length == 36){
        allFilledBoxesColors.splice(6, 0, '%0A');
        allFilledBoxesColors.splice(13, 0, '%0A');
        allFilledBoxesColors.splice(20, 0, '%0A');
        allFilledBoxesColors.splice(27, 0, '%0A');
        allFilledBoxesColors.splice(34, 0, '%0A');
        var coresTexto = allFilledBoxesColors.toString().replace(/,/g, '');
    } else if (allFilledBoxesColors.length == 42){
        allFilledBoxesColors.splice(6, 0, '%0A');
        allFilledBoxesColors.splice(13, 0, '%0A');
        allFilledBoxesColors.splice(20, 0, '%0A');
        allFilledBoxesColors.splice(27, 0, '%0A');
        allFilledBoxesColors.splice(34, 0, '%0A');
        allFilledBoxesColors.splice(41, 0, '%0A');
        var coresTexto = allFilledBoxesColors.toString().replace(/,/g, '');
    }


    let texto = `<a href="https://twitter.com/intent/tweet?text=Joguei Cactos: %0A${coresTexto}%0Ahttps://cact-ooo.netlify.app/" target="_blank">Compartilhar para o Twitter</a>`;

    $('#btnCompartilhar').html(texto);
}



function initBoard() {
    let board = document.getElementById("telaJogo");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"

        for (let j = 0; j < 6; j++) {
            let box = document.createElement("div")
            box.className = "letter-box"
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

initBoard()


document.addEventListener("keyup", (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === "Backspace" && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/g)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

function insertLetter(pressedKey) {
    if (nextLetter === 6) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName("letter-row")[7 - guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add("filled-box")
    currentGuess.push(pressedKey)
    nextLetter += 1
}

function deleteLetter() {
    let row = document.getElementsByClassName("letter-row")[7 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ""
    box.classList.remove("filled-box")
    currentGuess.pop()
    nextLetter -= 1
}


function shadeKeyBoard(letter, color) {
    for (const elem of document.getElementsByClassName("btnTeclado")) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            }

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}
function checkGuess() {
    let row = document.getElementsByClassName("letter-row")[7 - guessesRemaining];
    let guessString = '';
    let rightGuess = Array.from(rightGuessString);
    let result = document.getElementById("result");
    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 6) {
        result.innerHTML = "É 6 letras, bicho besta!";
        return
    }

    if (!girias.includes(guessString)) {
        result.innerHTML = "Isso num é nem do nordeste!";

        return
    }


    for (let i = 0; i < 7; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i])
        // is letter in the correct guess
        if (letterPosition === -1) {
            letterColor = '#b6a991'
        } else {
            // now, letter is definitely in word
            // if letter index and right guess index are the same
            // letter is in the right position 
            if (currentGuess[i] === rightGuess[i]) {
                // shade green 
                letterColor = '#5d7014'
            } else {
                // shade box yellow
                letterColor = '#EEBB4D'
            }

            rightGuess[letterPosition] = "#5d7014"
        }

        let delay = 250 * i
        setTimeout(() => {
            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === rightGuessString) {
        setTimeout(function () { clickEstatisticas() }, 6000);
        result.innerHTML = "Acertou, mizeravi!";
        guessesRemaining = 0
        shareText()
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            result.innerHTML = "Boy, tu é ruim visse";
            result.innerHTML = `Oia como era facin: "${rightGuessString}"`;
            shareText()
            setTimeout(function () { clickEstatisticas() }, 0);
        }
    }
}
document.getElementById("teclado").addEventListener("click", (e) => {
    const target = e.target

    if (!target.classList.contains("btnTeclado")) {
        return
    }
    let key = target.textContent

    if (key === "del") {
        key = "Backspace"
    }

    document.dispatchEvent(new KeyboardEvent("keyup", { 'key': key }))
})

//parte do local storage

//declarando a variavel e fazendo Json Parse
let localStorageJogosGanhos = JSON.parse(localStorage.getItem('jogosGanhos'))
let localStorageJogosPerdidos = JSON.parse(localStorage.getItem('jogosPerdidos'))
let localStoragerow0 = JSON.parse(localStorage.getItem('row0'))
let localStoragerow1 = JSON.parse(localStorage.getItem('row1'))
let localStoragerow2 = JSON.parse(localStorage.getItem('row2'))
let localStoragerow3 = JSON.parse(localStorage.getItem('row3'))
let localStoragerow4 = JSON.parse(localStorage.getItem('row4'))
let localStoragerow5 = JSON.parse(localStorage.getItem('row5'))
let localStoragerow6 = JSON.parse(localStorage.getItem('row6'))

//Colocando a variavel no local storage
let jogosGanhos = localStorage.getItem('jogosGanhos') !== null ? localStorageJogosGanhos : 0
let jogosPerdidos = localStorage.getItem('jogosPerdidos') !== null ? localStorageJogosPerdidos : 0
let pontosrow0 = localStorage.getItem('row0') !== null ? localStoragerow0 : 0
let pontosrow1 = localStorage.getItem('row1') !== null ? localStoragerow1 : 0
let pontosrow2 = localStorage.getItem('row2') !== null ? localStoragerow2 : 0
let pontosrow3 = localStorage.getItem('row3') !== null ? localStoragerow3 : 0
let pontosrow4 = localStorage.getItem('row4') !== null ? localStoragerow4 : 0
let pontosrow5 = localStorage.getItem('row5') !== null ? localStoragerow5 : 0
let pontosrow6 = localStorage.getItem('row6') !== null ? localStoragerow6 : 0


//ESTATÍSTICAS
function calculatePct() {
    var numJogos = document.getElementById("numJogos");
    var winsPct = document.getElementById("winsPct");

    var totalJogos = jogosGanhos + jogosPerdidos;
    var pct = jogosGanhos / totalJogos;

    numJogos.textContent = totalJogos;
    winsPct.textContent = (pct * 100).toFixed(0) + "%";
    if (isNaN(pct * 100)) {
        winsPct.textContent = 0 + "%"; //Valor inicial do percentual de vitórias. É porque tava aparecendo "NaN%"
    }
}
calculatePct();


function tentativas() {
    var rows = document.getElementsByClassName("stats_histo");
    if (pontosrow0 != 0) {
        rows[0].style.width = "100%";
        rows[0].textContent = pontosrow0;
    }
    if (pontosrow1 != 0) {
        rows[1].style.width = "100%";
        rows[1].textContent = pontosrow1;
    }
    if (pontosrow2 != 0) {
        rows[2].style.width = "100%";
        rows[2].textContent = pontosrow2;
    }
    if (pontosrow3 != 0) {
        rows[3].style.width = "100%";
        rows[3].textContent = pontosrow3;
    }
    if (pontosrow4 != 0) {
        rows[4].style.width = "100%";
        rows[4].textContent = pontosrow4;
    }
    if (pontosrow5 != 0) {
        rows[5].style.width = "100%";
        rows[5].textContent = pontosrow5;
    }
    if (pontosrow6 != 0) {
        rows[6].style.width = "100%";
        rows[6].textContent = pontosrow6;
    }
    if (jogosPerdidos != 0) {
        rows[7].style.width = "100%";
        rows[7].textContent = jogosPerdidos;
    }
};


function clickEstatisticas() {
    $("#estatisticas").click();
}

tentativas();


