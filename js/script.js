import { girias } from "./girias.js"

const NUMBER_OF_GUESSES = 7;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = girias[Math.floor(Math.random() * girias.length)];
console.log(rightGuessString)

function initBoard() {
    let board = document.getElementById("telaJogo");

    for (let i = 0; i < NUMBER_OF_GUESSES; i++) {
        let row = document.createElement("div")
        row.className = "letter-row"
        row.setAttribute('id', `row${i}`)

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
    if (pressedKey === "Backspace" && nextLetter > 0) {
        deleteLetter()
        return
    }

    if (pressedKey === "Enter") {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
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
let wins
function checkGuess () {
    let row = document.getElementsByClassName("letter-row")[7 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString)

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 6) {
        toastr.error("É 6 letras, bicho besta!")
        return
    }

    if (!girias.includes(guessString)) {
        toastr.error("Isso num é nem do nordeste!")
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
        toastr.success("Acertou, mizeravi!")
        wins = true;
        let rowId = row.getAttribute('id')
        if (rowId == 'row0') {
        pontosrow0++
        localStorage.setItem(rowId, pontosrow0)}
        if (rowId == 'row1') {
        pontosrow1++
        localStorage.setItem(rowId, pontosrow1)}
        if (rowId == 'row2') {
        pontosrow2++
        localStorage.setItem(rowId, pontosrow2)}
        if (rowId == 'row3') {
        pontosrow3++
        localStorage.setItem(rowId, pontosrow3)}
        if (rowId == 'row4') {
        pontosrow4++
        localStorage.setItem(rowId, pontosrow4)}
        if (rowId == 'row5') {
        pontosrow5++
        localStorage.setItem(rowId, pontosrow5)}
        if (rowId == 'row6') {
        pontosrow6++
        localStorage.setItem(rowId, pontosrow6)}
        jogosGanhos ++
        localStorage.setItem('jogosGanhos', jogosGanhos)
        guessesRemaining = 0
        return
    } else {
        guessesRemaining -= 1;
        currentGuess = [];
        nextLetter = 0;

        if (guessesRemaining === 0) {
            toastr.error("Boy, tu é ruim visse")
            toastr.info(`Oia como era facin: "${rightGuessString}"`)
            wins = false;
            jogosPerdidos ++
            localStorage.setItem('jogosPerdidos', jogosPerdidos)
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

