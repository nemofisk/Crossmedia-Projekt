// Minigames

function wordle() {
    function keyEvent(event) {
        const activeBox = document.querySelector(".letter-box.active");
        const activeBoxNum = parseInt(activeBox.dataset.boxnum);
        const activeParent = activeBox.parentElement;

        activeBox.textContent = event.target.dataset.letter;

        activeBox.classList.remove("active");

        if (activeBoxNum != nLetters - 1) {
            activeParent.childNodes[activeBoxNum + 1].classList.add("active")
        } else {
            const allKeys = document.querySelectorAll(".key-box");
            allKeys.forEach(key => {
                key.setAttribute("disabled", "true")
            })

            document.querySelector(".enter-key").removeAttribute("disabled");
        }
    }

    function eraseEvent(event) {
        const activeRow = document.querySelector(".word-row.active");
        const activeRowBoxes = activeRow.childNodes;

        let anyBoxActive = false;
        let boxToErase;

        activeRowBoxes.forEach(function (box, index) {
            if (box.classList.contains("active")) {
                anyBoxActive = true;
                if (index != 0) {
                    boxToErase = activeRowBoxes[index - 1];
                    box.classList.remove("active");
                }
            }
        })

        if (!anyBoxActive) {
            boxToErase = activeRowBoxes[nLetters - 1]

            const allKeys = document.querySelectorAll(".key-box");
            allKeys.forEach(key => {
                key.removeAttribute("disabled")
            })

            document.querySelector(".enter-key").setAttribute("disabled", "true");
        }

        if (boxToErase) {
            boxToErase.classList.add("active");
            boxToErase.textContent = "";
        }

    }

    function enterEvent(event) {
        const activeRow = document.querySelector(".word-row.active");
        const activeRowBoxes = activeRow.childNodes;

        let anyBoxActive = false;

        activeRowBoxes.forEach(function (box, index) {
            if (box.classList.contains("active")) {
                anyBoxActive = true;
            }
        })

        if (!anyBoxActive) {
            checkAnswer();
        }
    }

    function createNewRow() {
        document.querySelector(".enter-key").setAttribute("disabled", "true");

        const allKeys = document.querySelectorAll(".key-box");
        allKeys.forEach(key => {
            key.removeAttribute("disabled")
        })

        if (document.querySelector(".word-row.active")) {
            document.querySelector(".word-row.active").classList.remove("active");
        }

        const wordRow = document.createElement("div");
        wordRow.classList.add("word-row", "active")

        for (let i = 0; i < nLetters; i++) {
            const letterBox = document.createElement("div");
            letterBox.classList.add("letter-box")
            letterBox.dataset.boxnum = i;

            if (i == 0) {
                letterBox.classList.add("active");
            }

            wordRow.appendChild(letterBox);
        }

        rowContainer.append(wordRow)
    }

    function createKeyboard() {
        const keyboardWrapper = document.createElement("div");
        keyboardWrapper.classList.add("keyboard-wrapper")
        gameDiv.append(keyboardWrapper)

        const keyboardContainer = document.createElement("div");
        keyboardContainer.classList.add("keyboard-container");
        keyboardWrapper.append(keyboardContainer)

        const qwerty = "QWERTYUIOPÅASDFGHJKLÖÄZXCVBNM"

        const letterArray = [...qwerty]

        letterArray.forEach(letter => {
            const keyBox = document.createElement("button");
            keyBox.classList.add("key-box")

            keyBox.dataset.letter = letter;

            keyBox.innerHTML = `
                <p>${letter}</p>
            `

            keyBox.addEventListener("click", keyEvent)

            keyboardContainer.append(keyBox)
        })

        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("buttons-container");

        const eraseButton = document.createElement("button");
        eraseButton.classList.add("erase-key")
        eraseButton.textContent = "⌫"
        eraseButton.addEventListener("click", eraseEvent)

        const enterButton = document.createElement("button");
        enterButton.setAttribute("disabled", "true")
        enterButton.classList.add("enter-key")
        enterButton.textContent = "ENTER"
        enterButton.addEventListener("click", enterEvent)


        buttonsContainer.append(eraseButton);
        buttonsContainer.append(enterButton);
        keyboardWrapper.append(buttonsContainer)
    }

    function checkAnswer() {
        let wordGuess = "";
        let answerLetters = [...wordAnswer]

        const activeRowChildren = document.querySelector(".word-row.active").childNodes;

        activeRowChildren.forEach(child => {
            wordGuess += child.textContent;
        })

        activeRowChildren.forEach((child, index) => {
            const boxLetter = child.textContent;

            let inWord = false;
            let rightPlace = false;

            if (boxLetter == answerLetters[index]) {
                rightPlace = true;
            }

            answerLetters.forEach(letter => {
                if (letter == boxLetter) {
                    inWord = true;
                }
            })

            if (inWord == true && rightPlace == true) {
                child.classList.add("right");
            } else if (inWord) {
                child.classList.add("wrong");
            } else {
                child.classList.add("nothing")
            }
        })

        createNewRow();
    }

    const wordAnswer = "AVLIV"

    const gameDiv = document.createElement("div");
    gameDiv.setAttribute("id", "wordle-game");
    document.querySelector("body").append(gameDiv);

    const rowContainer = document.createElement("div");
    rowContainer.classList.add("row-container")
    gameDiv.append(rowContainer)

    const nLetters = 5;

    createKeyboard()

    createNewRow()
}

function memory() { }

function maze() { }

function puzzle() { }

function quiz() { }

