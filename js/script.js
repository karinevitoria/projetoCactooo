import { girias } from "./girias.js"

const NUMBER_OF_GUESSES = 7;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = girias[Math.floor(Math.random() * girias.length)];
// console.log(rightGuessString)

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

function insertLetter (pressedKey) {
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

    console.log(currentGuess)
}

function deleteLetter () {
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
function checkGuess () {
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

            rightGuess[letterPosition] = "#"
        }

        let delay = 250 * i
        setTimeout(()=> {
            //shade box
            box.style.backgroundColor = letterColor
            shadeKeyBoard(letter, letterColor)
        }, delay)
    }

    if (guessString === rightGuessString) {
        result.innerHTML="Acertou, mizeravi!";
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            result.innerHTML="Boy, tu é ruim visse";
            result.innerHTML=`Oia como era facin: "${rightGuessString}"`;
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

    document.dispatchEvent(new KeyboardEvent("keyup", {'key': key}))
})

   

//ESTATÍSTICAS
function calculatePct() {
    var numJogos = document.getElementById("numJogos");
    var winsPct = document.getElementById("winsPct");

    var totalJogos = jogosGanhos + jogosPerdidos;
    var pct = jogosGanhos/totalJogos;

    numJogos.textContent = totalJogos;
    winsPct.textContent = (pct*100).toFixed(0) + "%";
    if(isNaN(pct*100)){
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
}
tentativas();