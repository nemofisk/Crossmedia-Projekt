function doneMinigame() {
    removeContentEventModal();
    renderDialogue(false, true)
}

// Minigames

//WORDLE
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
        rowContainer.scrollTop = rowContainer.scrollHeight

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

            keyBox.textContent = letter

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
        let letterBoxObjects = [];
        let keyBoxObjects = [];

        let answerLetters = [...wordAnswer]

        let letterCount = [];

        answerLetters.forEach(letterX => {
            let letterExists = false;
            letterCount.forEach(letterObj => {
                if (letterObj.letter == letterX) {
                    letterExists = true;
                }
            })

            if (!letterExists) {
                const letterObj = {
                    letter: letterX,
                    count: 1,
                }

                letterCount.push(letterObj);
            }

            if (letterExists) {
                letterCount.forEach(letterObj => {
                    if (letterObj.letter == letterX) {
                        letterObj.count += letterObj.count
                    }
                })
            }
        })

        console.log(letterCount);

        const activeRowChildren = document.querySelector(".word-row.active").childNodes;

        activeRowChildren.forEach((child, index) => {
            const boxLetter = child.textContent;

            let letterExists = false;
            let rightPlace = false;

            letterCount.forEach(letterObj => {
                if (boxLetter == letterObj.letter && letterObj.count > 0) {
                    letterExists = true;
                }
            })

            if (boxLetter == answerLetters[index]) {
                rightPlace = true;
            }

            if (rightPlace && letterExists) {
                const boxObj = {
                    box: child,
                    addClass: "rightDisplay",
                    boxnum: parseInt(child.dataset.boxnum)
                }
                letterBoxObjects.push(boxObj);

                child.classList.add("wRight");
                letterCount.forEach(letterObj => {
                    if (boxLetter == letterObj.letter) {
                        letterObj.count--
                    }
                })

                const keyboardKeys = document.querySelectorAll(".key-box");

                keyboardKeys.forEach(key => {
                    if (key.textContent == boxLetter) {
                        const keyBoxObj = {
                            keybox: key,
                            addClass: "rightDisplay",
                            removeClass: "wrongDisplay"
                        }
                        keyBoxObjects.push(keyBoxObj);

                        key.classList.remove("wrong");
                        key.classList.add("wRight");
                    }
                })
            }
        })

        activeRowChildren.forEach((child, index) => {
            const boxLetter = child.textContent;

            let letterExists = false;
            let inWord = false;

            letterCount.forEach(letterObj => {
                if (boxLetter == letterObj.letter && letterObj.count > 0 && !child.classList.contains("wRight")) {
                    letterExists = true;
                }
            })

            answerLetters.forEach(letter => {
                if (letter == boxLetter) {
                    inWord = true;
                }
            })

            if (inWord && letterExists) {
                const boxObj = {
                    box: child,
                    addClass: "wrongDisplay",
                    boxnum: parseInt(child.dataset.boxnum)
                }
                letterBoxObjects.push(boxObj);

                child.classList.add("wWrong");
                letterCount.forEach(letterObj => {
                    if (boxLetter == letterObj.letter) {
                        letterObj.count--
                    }
                })

                const keyboardKeys = document.querySelectorAll(".key-box");

                keyboardKeys.forEach(key => {
                    if (key.textContent == boxLetter && !key.classList.contains("wRight")) {
                        const keyBoxObj = {
                            keybox: key,
                            addClass: "wrongDisplay"
                        }

                        keyBoxObjects.push(keyBoxObj);
                        key.classList.add("wWrong");
                    }
                })
            }

            if (!child.classList.contains("wRight") && !child.classList.contains("wWrong")) {
                const boxObj = {
                    box: child,
                    addClass: "nothingDisplay",
                    boxnum: parseInt(child.dataset.boxnum)
                }
                letterBoxObjects.push(boxObj);

                child.classList.add("wNothing");

                const keyboardKeys = document.querySelectorAll(".key-box");

                keyboardKeys.forEach(key => {
                    if (key.textContent == boxLetter && !key.classList.contains("wRight") && !key.classList.contains("wWrong")) {
                        const keyBoxObj = {
                            keybox: key,
                            addClass: "nothingDisplay"
                        }
                        keyBoxObjects.push(keyBoxObj);

                        key.classList.add("wNothing");
                    }
                })
            }
        })

        letterBoxObjects.sort((boxObj1, boxObj2) => {
            return boxObj1.boxnum > boxObj2.boxnum
        })

        setTimeout(function () {
            displayAnswers(0);
        }, 300)

        function displayAnswers(index) {
            if (index < letterBoxObjects.length) {
                const box = letterBoxObjects[index].box;
                const addClass = letterBoxObjects[index].addClass;

                box.classList.add(addClass);

                setTimeout(function () {
                    displayAnswers(index + 1);
                }, 300)
            } else {
                let rightBoxes = 0;

                for (rowbox of activeRowChildren) {
                    if (rowbox.classList.contains("wRight")) {
                        rightBoxes++
                    }
                }

                if (rightBoxes == nLetters) {
                    doneMinigame();
                } else {
                    console.log(keyBoxObjects);
                    keyBoxObjects.forEach(keyObject => {
                        console.log(keyObject);
                        const keybox = keyObject.keybox;
                        const keyAddClass = keyObject.addClass;

                        if (keyObject.removeClass) {
                            keybox.classList.remove(keyObject.removeClass);
                        }

                        keybox.classList.add(keyAddClass);
                    })

                    createNewRow();
                }
            }
        }
    }

    const infoArray = [
        `
        <div>Hur du spelar:</div>
        <div>Lista ut ordet genom att testa olika ord.</div>
        <div>Färgen på rutorna kommer att ändras beroende på hur nära ditt ord var.</div>
        `,
        `
        <div class="infoContainer">
            <div class="wordleRight"></div>
            <div>Grön ruta visar att bokstaven finns och är på rätt plats</div> 
        </div>
        <div class="infoContainer">
            <div class="wordleWrong"></div>
            <div>Gul ruta visar att bokstaven finns men är på fel plats</div> 
        </div>
        <div class="infoContainer">
            <div class="wordleNothing"></div>
            <div>Grå ruta visar att bokstaven inte finns med</div> 
        </div>
        `
    ]

    renderInfoModal(infoArray)

    const wordAnswer = "AVLIVA"

    const gameDiv = document.createElement("div");
    gameDiv.classList.add("minigameBackdrop")
    gameDiv.setAttribute("id", "wordle-game");
    editContentEventModal(gameDiv, false, true)

    const rowContainer = document.createElement("div");
    rowContainer.classList.add("row-container")

    const rowWrapper = document.createElement("div");
    rowWrapper.classList.add("row-wrapper");
    rowWrapper.append(rowContainer)

    gameDiv.append(rowWrapper)

    const nLetters = 6;

    createKeyboard()

    createNewRow()


}

//MEMORY
function render_memory_game() {
    let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9];

    const memoryDiv = document.createElement("div");
    memoryDiv.classList.add("minigameBackdrop");

    memoryDiv.innerHTML = `
    <div class="memory_container">
        <div class="memory_game"></div>
    </div>
    `;

    editContentEventModal(memoryDiv, false, true);

    let shuffle_numbers = shuffle_array(numbers);

    function shuffle_array(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }

        return array;
    }

    for (let i = 0; i < numbers.length; i++) {
        let box = document.createElement("button");
        box.className = "memory_item";
        let number = shuffle_numbers[i];
        img_url = `--img:url(../images/memory_images/${number}.jpg);`
        box.setAttribute("dataset", number);
        box.setAttribute("style", img_url);

        document.querySelector(".memory_game").appendChild(box);

        box.addEventListener("click", click);

        function click() {
            this.classList.add("memory_box_open");

            if (document.querySelectorAll(".memory_box_open").length > 1) {
                let boxes = document.querySelectorAll(".memory_item");

                for (box of boxes) {
                    box.setAttribute("disabled", "true");
                }

                setTimeout(check_match, 1000);

                function check_match() {
                    if (document.querySelectorAll(".memory_box_open")[0].getAttribute("dataset") == document.querySelectorAll(".memory_box_open")[1].getAttribute("dataset")) {
                        document.querySelectorAll(".memory_box_open")[0].classList.add("memory_box_match");
                        document.querySelectorAll(".memory_box_open")[1].classList.add("memory_box_match");

                        let box_1 = document.querySelectorAll(".memory_box_open")[0];
                        let box_2 = document.querySelectorAll(".memory_box_open")[1];

                        box_1.classList.remove("memory_box_open");
                        box_2.classList.remove("memory_box_open");

                        box_1.removeEventListener("click", click);
                        box_2.removeEventListener("click", click);

                        if (document.querySelectorAll(".memory_box_match").length == numbers.length) {
                            doneMinigame();
                        }
                    }
                    else {
                        document.querySelectorAll(".memory_box_open")[1].classList.remove("memory_box_open");
                        document.querySelectorAll(".memory_box_open")[0].classList.remove("memory_box_open");
                    }

                    for (box of boxes) {
                        box.removeAttribute("disabled");
                    }
                }
            }
        }
    }

    const infoArray = [
        `<div>Klicka på en ruta för att vända den och se bilden bakom. Det finns två av varje bild.</div>
        <div>Para ihop bilderna för att vinna.</div>
        <div>Lycka till!</div>
        `
    ]

    renderInfoModal(infoArray)

}

//MAZE
function maze() {
    // https.//keesiemeijer.github.io/maze-generator/#generate

    // Ide till gruppen - Designa minigames som om man spelade dom IRL, gameboy till maze, alfapet till wordle, lägga pussel på ett bord, quiz som tipsrunda, memory på ett bord.

    function checkTargetCell(conditionCol, conditionRow) {
        for (cell of allCells) {
            const cellCol = parseInt(cell.dataset.gridCol);
            const cellRow = parseInt(cell.dataset.gridRow);

            if (cellCol == conditionCol && cellRow == conditionRow) {
                if (!cell.classList.contains("wall")) {
                    if (cellCol == 14 && cellRow == 18) {
                        doneMinigame();
                    }
                    return true;
                }

                return false;
            }


        }
    }

    function goUp(event) {
        const cellIsPath = checkTargetCell(playerObject.col, playerObject.row - 1);

        if (cellIsPath) {
            playerObject.row--;
            player.style.gridRow = playerObject.row;
        }
    }

    function goDown(event) {
        const cellIsPath = checkTargetCell(playerObject.col, playerObject.row + 1);

        if (cellIsPath) {
            playerObject.row++;
            player.style.gridRow = playerObject.row;
        }
    }

    function goRight(event) {
        const cellIsPath = checkTargetCell(playerObject.col + 1, playerObject.row);

        if (cellIsPath) {
            playerObject.col++;
            player.style.gridColumn = playerObject.col;
        }
    }

    function goLeft(event) {
        const cellIsPath = checkTargetCell(playerObject.col - 1, playerObject.row);

        if (cellIsPath) {
            playerObject.col--;
            player.style.gridColumn = playerObject.col;
        }
    }

    function createControls() {
        const container = document.createElement("div");
        container.classList.add("controlsContainer")
        gameWrapper.append(container);

        let arrows = ["left", "up", "right", "down"]

        for (let arrow of arrows) {
            const controlButton = document.createElement("button");
            controlButton.classList.add("controlButton")
            container.append(controlButton);

            if (arrow == "down") {
                controlButton.addEventListener("click", goDown);
                controlButton.classList.add("down");
            }

            if (arrow == "right") {
                controlButton.addEventListener("click", goRight);
                controlButton.classList.add("rightright")
            }

            if (arrow == "left") {
                controlButton.addEventListener("click", goLeft);
                controlButton.classList.add("left")
            }

            if (arrow == "up") {
                controlButton.addEventListener("click", goUp);
                controlButton.classList.add("up")
            }
        }
    }

    const gameWrapper = document.createElement("div");
    gameWrapper.setAttribute("id", "mazeGameWrapper");
    gameWrapper.classList.add("minigameBackdrop")

    const gameArea = document.createElement("div");
    gameArea.setAttribute("id", "mazeGame");
    gameWrapper.append(gameArea);

    editContentEventModal(gameWrapper, false, true)


    let mapArray = "WWWWWWWWWWWWWWWWWWWWWWWWWWPPPPPWPPPPPPPPPPPWPPPPPWWPWWWWWPWPWWWWWWWPWWWWWPWWPWPPPWPWPPPWPWPPPWPPPWPWWPWPWPWPWWWPWPWPWWWPWPWPWWPWPWPPPWPWPWPWPPPWPWPWPWWPWPWWWWWPWPWPWWWPWPWPWPWWPWPWPPPPPWPWPPPPPPPWPPPWWPWPWPWWWPWPWWWWWWWWWWWPWWPPPPPWPPPWPPPPPPPWPWPPPWWPWWWWWWWWWPWWWWWPWPWPWWWWPWPPPPPPPWPWPPPPPWPWPPPWWPWPWWWWWPWPWPWWWWWPWWWPWWPWPPPWPPPWPWPWPPPPPPPWPWWWWWWPWPWWWWWPWPWPWWWWWPWWPPPPPWPPPPPPPWPWPPPPPPPWWPWWWWWPWWWWWWWPWWWWWWWWWWPPPWPPPWPPPWPWPPPPPPPWPWWWWPWPWWWPWPWPWPWWWWWPWPWWPPPWPPPWPWPWPPPWPPPWPPPWWPWWWWWWWPWWWWWWWPWPWWWPWWPWPPPPPPPWPPPPPWPWPWPPPWWPWPWWWWWWWPWPWPWPWPWWWWWWPWPWPPPPPWPWPWPPPWPPPPPWWPWPWWWPWPWWWPWWWWWWWWWPWWPWPPPPPWPPPWPPPWPPPPPWPWWPWWWWWWWWWPWWWPWPWWWWWPWWPPPWPPPPPWPPPPPWPWPPPPPWWPWWWPWPWWWWWWWWWPWPWWWWWWPPPPPWPPPPPPPPPPPPPPPPPWWWWWWWWWWWWWWWWWWWWWWWWWW"

    mapArray = [...mapArray];

    const rows = 31;
    const columns = 25;

    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            const mazeCell = document.createElement("div");
            mazeCell.classList.add("cell");

            if (col == 14 && row == 18) {
                mazeCell.classList.add("mazeGoal");
            }

            mazeCell.style.gridColumn = col;
            mazeCell.style.gridRow = row;

            mazeCell.dataset.gridRow = row;
            mazeCell.dataset.gridCol = col

            gameArea.append(mazeCell);
        }
    }

    const allCells = document.querySelectorAll(".cell");

    for (let i = 0; i < mapArray.length; i++) {
        const currentCell = allCells[i];

        if (mapArray[i] == "W") {
            currentCell.classList.add("wall");
        }

        if (mapArray[i] == "P") {
            currentCell.classList.add("path");
        }
    }

    const playerObject = {
        col: 2,
        row: 30
    }

    const player = document.createElement("div");
    player.classList.add("player");
    player.style.gridColumn = playerObject.col;
    player.style.gridRow = playerObject.row;

    gameArea.append(player)

    createControls();

    const infoArray = [
        `
        <div>Klicka på kontrollerna för att förflytta dig dit du vill gå.</div>
        <div>När du nått slutet vinner du!</div>
        <div>Lycka till!</div>
        `
    ]

    renderInfoModal(infoArray);
}

//PUZZLE
function render_puzzle() {
    let selected_piece;

    function select(event) {
        if (selected_piece) {
            selected_piece.classList.remove("selected");
        }

        let puzzle_piece = event.target;
        selected_piece = puzzle_piece;

        puzzle_piece.classList.add("selected");

        let drop_boxes = document.querySelectorAll(".drop_box");
        drop_boxes.forEach(box => {
            setTimeout(() => {
                box.addEventListener("click", drop);
            }, 1)
        })

        let drag_boxes = document.querySelectorAll(".drag_box");
        drag_boxes.forEach(box => {
            if (!box.childNodes[0]) {
                box.addEventListener("click", drop);
            }
        })
    }

    function drop(event) {
        let drop_boxes = document.querySelectorAll(".drop_box");
        let drag_boxes = document.querySelectorAll(".drag_box");
        let selected_box = event.target;
        selected_box.removeEventListener("click", drop);
        selected_piece.classList.remove("selected");

        console.log(selected_box.parentElement, selected_piece.parentElement);

        if (selected_box.parentElement == selected_piece.parentElement) {
            setTimeout(() => {
                drag_boxes.forEach(box => {
                    box.removeEventListener("click", drop);
                });
                drop_boxes.forEach(box => {
                    box.removeEventListener("click", drop);
                });
            }, 1)
            return;
        }

        selected_box.append(selected_piece);

        let correct_pieces = [];

        drop_boxes.forEach(box => {
            box.removeEventListener("click", drop);
            box.classList.remove("correct");

            if (box.childNodes[0]) {
                let drag_id = box.childNodes[0].id.substring(5);
                let drop_id = box.id.substring(5);

                if (drag_id == drop_id) {
                    box.classList.add("correct");
                    correct_pieces.push(drop_id);

                    if (correct_pieces.length == 36) {
                        setTimeout(() => { doneMinigame() }, 1000);
                    }
                }
            }
        })
    }

    let pieces_box = document.createElement("div");
    pieces_box.classList.add("pieces_box");

    const puzzleDiv = document.createElement("div");
    puzzleDiv.classList.add("minigameBackdrop")

    puzzleDiv.classList.add("parent_puzzle")

    puzzleDiv.append(pieces_box);

    editContentEventModal(puzzleDiv, false, true);

    //Creates drag_boxes (pieces)
    for (let i = 0; i < 36; i++) {
        let id = `drag_${i}`;
        img_url = `--img:url(../images/puzzle_pieces/${i}.jpg);`;

        let drag_box = document.createElement("div");
        drag_box.classList.add("drag_box");
        pieces_box.append(drag_box);

        let img = document.createElement("div");
        img.classList.add("puzzle_image");
        img.setAttribute("id", id);
        img.setAttribute("style", img_url);
        drag_box.append(img);

        img.addEventListener("click", select);
    }

    let board = document.createElement("div");
    board.classList.add("board");
    puzzleDiv.append(board);

    //Creates drop_boxes
    for (let i = 0; i < 36; i++) {
        let id = `drop_${i}`;
        let drop_box = document.createElement("div");
        drop_box.classList.add("drop_box");
        drop_box.setAttribute("id", id)
        board.append(drop_box);

        if (i == 35) scramblePieces();
    }

    function scramblePieces() {
        let pieces_box = document.querySelector(".pieces_box");
        let frag = document.createDocumentFragment();
        while (pieces_box.children.length) {
            frag.append(pieces_box.children[Math.floor(Math.random() * pieces_box.children.length)]);
        }
        pieces_box.append(frag);
        pieces_box.style.opacity = 1;
    }

    const infoArray = [
        `
        <div>Klicka på en pusselbit för att sedan klicka på platsen du vill lägga pusselbiten</div>
        <div>När alla bitar är på rätt plats vinner du!</div>
        <div>Lycka till!</div>
        `
    ]

    renderInfoModal(infoArray);
}

//QUIZ


function render_quiz() {
    let quiz = [
        {
            question: "Var är Zlatan född?",
            answers: [
                {
                    answer: "Malmö",
                    true: true
                },
                {
                    answer: "Stockholm",
                    true: false
                },
                {
                    answer: "Göteborg",
                    true: false
                },
                {
                    answer: "Helsingborg",
                    true: false
                }
            ]
        },
        {
            question: "Vilket år debuterade Zlatan i svenska landslaget?",
            answers: [
                {
                    answer: 2006,
                    true: false
                },
                {
                    answer: 2001,
                    true: true
                },
                {
                    answer: 1995,
                    true: false
                },
                {
                    answer: 1989,
                    true: false
                }
            ]
        },
        {
            question: "Vilken är Zlatans favoritmat?",
            answers: [
                {
                    answer: "Korv med bröd. Dansk ketchup",
                    true: true
                },
                {
                    answer: "Tacos",
                    true: false
                },
                {
                    answer: "Pizza",
                    true: false
                },
                {
                    answer: "Kebab",
                    true: false
                }
            ]
        },
        {
            question: "Vad åt Zlatan till frukost?",
            answers: [
                {
                    answer: "Korv med bröd. Dansk ketchup",
                    true: true
                },
                {
                    answer: "Tacos",
                    true: false
                },
                {
                    answer: "Pizza",
                    true: false
                },
                {
                    answer: "Kebab",
                    true: false
                }
            ]
        },
        {
            question: "När lämnade Zlatan sitt hus senast?",
            answers: [
                {
                    answer: "11:32",
                    true: false
                },
                {
                    answer: "Vet inte",
                    true: false
                },
                {
                    answer: "10:26",
                    true: false
                },
                {
                    answer: "8:13",
                    true: true
                },
            ]
        },
        {
            question: "Vad brukar Zlatan göra innan han går och lägger sig?",
            answers: [
                {
                    answer: "Äta en macka med ost. Prästost",
                    true: true
                },
                {
                    answer: "Kolla fotboll på tv",
                    true: false
                },
                {
                    answer: "Vet inte",
                    true: false
                },
                {
                    answer: "Diska",
                    true: false
                },
            ]
        },
        "end"
    ]

    const quizDiv = document.createElement("div");
    quizDiv.classList.add("minigameBackdrop");
    quizDiv.classList.add("parent_quiz");

    const questionh3 = document.createElement("h3");
    questionh3.classList.add("quiz_question");
    questionh3.textContent = `${quiz[0].question}`


    quizDiv.append(questionh3);

    let button_container = document.createElement("div");
    button_container.classList.add("button_container_quiz");

    let current_question = 0;
    let points = 0;
    quizDiv.append(button_container)
    update_quiz(quiz, current_question);

    editContentEventModal(quizDiv, false, true);

    function update_quiz(quiz, current_question) {
        if (quiz[current_question] == "end") {
            doneMinigame();
            return;
        }

        button_container.innerHTML = ``;
        let correct_answer;

        quiz[current_question].answers.forEach((answer => {
            questionh3.textContent = quiz[current_question].question;
            let button = document.createElement("button");
            button.classList.add("answer");
            button.innerHTML = answer.answer;
            button_container.append(button);
            if (answer.true) {
                correct_answer = answer.answer;
            }
            button.addEventListener("click", e => {
                let answers = quizDiv.querySelectorAll(".answer");

                for (answerr of answers) {
                    answerr.setAttribute("disabled", "true");
                }

                if (answer.true) {
                    console.log("correct")
                    points++;
                    current_question++;
                    button.classList.add("right");
                    setTimeout(() => {
                        update_quiz(quiz, current_question);
                    }, 1000);
                }
                else {
                    console.log("false");
                    current_question++;
                    button.classList.add("wrong");

                    let options = document.querySelectorAll(".answer");

                    options.forEach(option => {
                        console.log(option.textContent);
                        if (option.textContent == correct_answer) {
                            option.classList.add("right");
                        }
                    })

                    setTimeout(() => {
                        update_quiz(quiz, current_question);
                    }, 2000);
                }
            })
        }))
    }

    const infoArray = [
        `
        <div>Svara på frågorna som ställs, varje fråga har fyra svarsalternativ.</div>
        <div>När du svarat på alla frågor har du klarat frågesporten.</div>
        <div>Lycka till!</div>
        `
    ]

    renderInfoModal(infoArray)
}

//CHOOSE SUSPECT
function choose_sus() {
    let chosen_suspect;
    const main_page = document.createElement("div");
    main_page.classList.add("minigameBackdrop");
    main_page.classList.add("parent_choose_sus");

    editContentEventModal(main_page, true, false);

    const storyIndex = JSON.parse(window.localStorage.getItem("storyIndex"));

    data[storyIndex].notebookData.suspects.forEach(suspect => {
        let sus_div = document.createElement("div");
        sus_div.classList.add("sus_div");
        main_page.append(sus_div);

        let name = suspect.name;
        console.log(name);
        img_url = `--img:url(../images/clues/${name.toLowerCase()}.jpg);`

        if (name == "Göran") {
            img_url = `--img:url(../images/clues/goran.jpg);`
        }
        sus_div.setAttribute("style", img_url);

        let p = document.createElement("p");
        p.classList.add("sus_name");
        p.textContent = name;
        sus_div.append(p);

        p.addEventListener("click", e => {
            e.stopPropagation();
        })

        sus_div.addEventListener("click", (e) => {

            let overlay = document.createElement("div");
            overlay.classList.add("overlay_sus");

            let message = document.createElement("div");
            message.classList.add("sus_message");

            overlay.append(message);

            main_page.append(overlay);
            console.log(e.target.childNodes[0].textContent)
            chosen_suspect = e.target.childNodes[0].textContent;
            message.textContent = `Är du säker på att du vill välja ${chosen_suspect}?`;
            message.innerHTML += `
                <div class="sus_button_container">
                    <button class="sus_button yes">JA</button>
                    <button class="sus_button no">NEJ</button>
                </div>
            `

            document.querySelector(".yes").addEventListener("click", () => {
                console.log(chosen_suspect);
                let dialogueAfter;
                if (data[storyIndex].location == "Nordic Wellness") {
                    if (chosen_suspect == "Göran") {
                        dialogueAfter = {
                            speaker: "Helena",
                            line: "Göran? Det namnet känner jag inte igen, men om han har kidnappat min man hoppas jag att ni sätter dit honom!",
                            img: "./images/dialogue/helena.jpg"
                        }
                    }
                    else if (chosen_suspect == "Sara") {
                        dialogueAfter = {
                            speaker: "Helena",
                            line: "Jaså Sara? Jag har aldrig gillat Sara, men inte trodde jag att hon var kapabel av kidnappning. Ifall hon tagit min älskling hoppas jag verkligen att ni sätter henne bakom lås och bom.",
                            img: "./images/dialogue/helena.jpg"
                        }
                    }
                    else if (chosen_suspect == "Eva") {
                        dialogueAfter = {
                            speaker: "Helena",
                            line: "Eva?? Det låter inte likt henne, jag har själv inte hunnit berätta för henne vad som har hänt, men antar att ni hann före. Hade varit en tragedi om det hade varit min nära vän som huggit mig i ryggen.",
                            img: "./images/dialogue/helena.jpg"
                        }
                    }
                    else if (chosen_suspect == "Stefan") {
                        dialogueAfter = {
                            speaker: "Helena",
                            line: "Stefan!? Tror ni verkligen att Zlatans bäste vän har huggit honom i ryggen? Det vore fruktansvärt om det var så, i så fall hoppas jag verkligen att han får vad han förtjänar.",
                            img: "./images/dialogue/helena.jpg"
                        }
                    }

                    data[storyIndex].dialogueAfter = [
                        dialogueAfter,
                        {
                            speaker: "Du",
                            line: "Vet du någon som har velat Zlatan illa?",
                            img: "./images/dialogue/player.png"
                        },
                        {
                            speaker: "Helena",
                            line: "Hmm… Vi har haft problem med en stalker som vi aldrig har lyckats identifiera, han har aldrig varit våldsam än så länge... jag hoppas inte att det är han som har slagit till…  Jag har heller aldrig gillat Sara, jag misstänker att hon fortfarande är kär i Zlatan. Sen ber jag innerligt att det varken är Eva eller Stefan.",
                            img: "./images/dialogue/helena.jpg"
                        },
                        {
                            speaker: "Helena",
                            line: "Jag ska erkänna att jag haft lite svårt för Stefan, det känns som att han alltid drar med Zlatan på massa idiotiska äventyr. Jag kommer aldrig glömma när Stefan bröt sig in i vårt hus för att väcka Zlatan med en fest på hans födelsedag… Jag blev nog mer rädd än Zlatan.",
                            img: "./images/dialogue/helena.jpg"
                        },
                        {
                            speaker: "Helena",
                            line: "Även om Eva är min nära vän så måste jag erkänna att hon är en aning opålitlig, hennes fixering vid pengar kan ibland äventyra hennes moral. Hon är väldigt svartsjuk och jag har känt av hennes avund på vår ekonomi.",
                            img: "./images/dialogue/helena.jpg"
                        },
                        {
                            speaker: "Du",
                            line: "Tack så mycket, detta kommer vara till hjälp. Dags att bege mig till St Petri Kyrka.",
                            img: "./images/dialogue/player.png"
                        },
                    ]

                    doneMinigame();
                }
                else if (data[storyIndex].location == "Malmö Hovrätt") {

                    if (chosen_suspect == "Stefan") {
                        data[storyIndex].dialogueBG = "./images/dialogue/stefanend.jpg"
                        dialogueAfter =
                        {
                            speaker: "Kommissarie Lestrade",
                            line: "Du har rätt, Stefan är Zlatans kidnappare. De har åkt till vegas för att ha en oförglömlig svensexa inför bröllopet, något som hållits hemligt för alla icke- inblandade. Zlatan är i hyfsat säkert förvar, tack för din insats, du är en sann detektiv.",
                            img: "./images/dialogue/lestrade.jpg",
                            correct: true
                        }
                    }
                    else if (chosen_suspect == "Göran") {
                        data[storyIndex].dialogueBG = "./images/dialogue/goranend.jpg"
                        dialogueAfter =
                        {
                            speaker: "Kommissarie Lestrade",
                            line: "Du har satt en oskyldig man bakom lås och bom. Göran är visserligen en kuslig stalker, men har ingenting med någon kidnappning att göra. Han kunde inte varit kidnapparen eftersom han tog bilder under förloppet.",
                            img: "./images/dialogue/lestrade.jpg",
                            correct: false
                        }
                    }
                    else if (chosen_suspect == "Sara") {
                        data[storyIndex].dialogueBG = "./images/dialogue/saraend.jpg"
                        dialogueAfter =
                        {
                            speaker: "Kommissarie Lestrade",
                            line: "Du har satt en oskyldig kvinna bakom lås och bom! Sara har visserligen en ilska riktad mot Zlatan men en eventuell avlivning gällde deras gemensamma hund. Sara kan inte vara skyldig till kidnappningen eftersom hon har alibi i hennes och Evas vinkväll stunden då kidnappningen ägde rum.",
                            img: "./images/dialogue/lestrade.jpg",
                            correct: false
                        }
                    }
                    else if (chosen_suspect == "Eva") {
                        data[storyIndex].dialogueBG = "./images/dialogue/evaend.jpg"
                        dialogueAfter =
                        {
                            speaker: "Kommissarie Lestrade",
                            line: "Du har satt en oskyldig kvinna bakom lås och bom! Eva hade visserligen inte tackat nej till en större lösensumma, men hon hade ett alibi från den kvällen då kidnappningen inträffade - hon var med på en vinprovning tillsammans med Sara.",
                            img: "./images/dialogue/lestrade.jpg",
                            correct: false
                        }
                    }

                    data[storyIndex].dialogueAfter = [
                        dialogueAfter
                    ]

                    doneMinigame();
                }
            })
            document.querySelector(".no").addEventListener("click", () => {
                overlay.remove();
            })
        })
    })

    const notebookButton = document.createElement("div");
    notebookButton.classList.add("notebook_button");

    notebookButton.addEventListener("click", render_notebook_page);

    main_page.append(notebookButton);
}