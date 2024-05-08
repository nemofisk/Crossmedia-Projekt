function doneMinigame() {
    removeContentEventModal();
    disableEventModal();
    check_for_notice(); // behöver köras när storyIndex uppdateras.
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
                child.classList.add("right");
                letterCount.forEach(letterObj => {
                    if (boxLetter == letterObj.letter) {
                        letterObj.count--
                    }
                })

                const keyboardKeys = document.querySelectorAll(".key-box");

                keyboardKeys.forEach(key => {


                    if (key.textContent == boxLetter) {
                        key.classList.remove("wrong");
                        key.classList.add("right");
                    }
                })
            }
        })

        activeRowChildren.forEach((child, index) => {
            const boxLetter = child.textContent;

            let letterExists = false;
            let inWord = false;

            letterCount.forEach(letterObj => {
                if (boxLetter == letterObj.letter && letterObj.count > 0 && !child.classList.contains("right")) {
                    letterExists = true;
                }
            })

            answerLetters.forEach(letter => {
                if (letter == boxLetter) {
                    inWord = true;
                }
            })

            if (inWord && letterExists) {
                child.classList.add("wrong");
                letterCount.forEach(letterObj => {
                    if (boxLetter == letterObj.letter) {
                        letterObj.count--
                    }
                })

                const keyboardKeys = document.querySelectorAll(".key-box");

                keyboardKeys.forEach(key => {
                    if (key.textContent == boxLetter && !key.classList.contains("right")) {
                        key.classList.add("wrong");
                    }
                })
            }

            if (!child.classList.contains("right") && !child.classList.contains("wrong")) {
                child.classList.add("nothing");

                const keyboardKeys = document.querySelectorAll(".key-box");

                keyboardKeys.forEach(key => {
                    if (key.textContent == boxLetter && !key.classList.contains("right") && !key.classList.contains("wrong")) {
                        key.classList.add("nothing");
                    }
                })
            }
        })

        let rightBoxes = 0;

        for (rowbox of activeRowChildren) {
            if (rowbox.classList.contains("right")) {
                rightBoxes++
            }
        }

        if (rightBoxes == nLetters) {
            doneMinigame();
        } else {
            createNewRow();
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
    editContentEventModal(gameDiv, true)

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

    editContentEventModal(memoryDiv, true);

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
    // https://keesiemeijer.github.io/maze-generator/#generate

    // Ide till gruppen - Designa minigames som om man spelade dom IRL, gameboy till maze, alfapet till wordle, lägga pussel på ett bord, quiz som tipsrunda, memory på ett bord.

    function checkTargetCell(conditionCol, conditionRow) {
        for (cell of allCells) {
            const cellCol = parseInt(cell.dataset.gridCol);
            const cellRow = parseInt(cell.dataset.gridRow);

            if (cellCol == conditionCol && cellRow == conditionRow) {
                if (!cell.classList.contains("wall")) {
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

        let arrows = ["←", "↑", "→", "↓"]

        for (let arrow of arrows) {
            const controlButton = document.createElement("button");
            controlButton.textContent = arrow;
            controlButton.classList.add("controlButton")
            container.append(controlButton);

            if (arrow == "↓") {
                controlButton.addEventListener("click", goDown);
                controlButton.classList.add("down");
            }

            if (arrow == "→") {
                controlButton.addEventListener("click", goRight);
                controlButton.classList.add("rightright")
            }

            if (arrow == "←") {
                controlButton.addEventListener("click", goLeft);
                controlButton.classList.add("left")
            }

            if (arrow == "↑") {
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

    editContentEventModal(gameWrapper, true)


    let mapArray = "WWWWWWWWWWWWWWWWWWWWWWWWWWPPPPPWPPPPPPPPPPPWPPPPPWWPWWWWWPWPWWWWWWWPWWWWWPWWPWPPPWPWPPPWPWPPPWPPPWPWWPWPWPWPWWWPWPWPWWWPWPWPWWPWPWPPPWPWPWPWPPPWPWPWPWWPWPWWWWWPWPWPWWWPWPWPWPWWPWPWPPPPPWPWPPPPPPPWPPPWWPWPWPWWWPWPWWWWWWWWWWWPWWPPPPPWPPPWPPPPPPPWPWPPPWWPWWWWWWWWWPWWWWWPWPWPWWWWPWPPPPPPPWPWPPPPPWPWPPPWWPWPWWWWWPWPWPWWWWWPWWWPWWPWPPPWPPPWPWPWPPPPPPPWPWWWWWWPWPWWWWWPWPWPWWWWWPWWPPPPPWPPPPPPPWPWPPPPPPPWWPWWWWWPWWWWWWWPWWWWWWWWWWPPPWPPPWPPPWPWPPPPPPPWPWWWWPWPWWWPWPWPWPWWWWWPWPWWPPPWPPPWPWPWPPPWPPPWPPPWWPWWWWWWWPWWWWWWWPWPWWWPWWPWPPPPPPPWPPPPPWPWPWPPPWWPWPWWWWWWWPWPWPWPWPWWWWWWPWPWPPPPPWPWPWPPPWPPPPPWWPWPWWWPWPWWWPWWWWWWWWWPWWPWPPPPPWPPPWPPPWPPPPPWPWWPWWWWWWWWWPWWWPWPWWWWWPWWPPPWPPPPPWPPPPPWPWPPPPPWWPWWWPWPWWWWWWWWWPWPWWWWWWPPPPPWPPPPPPPPPPPPPPPPPWWWWWWWWWWWWWWWWWWWWWWWWWW"

    mapArray = [...mapArray];

    const rows = 31;
    const columns = 25;

    for (let row = 1; row <= rows; row++) {
        for (let col = 1; col <= columns; col++) {
            const mazeCell = document.createElement("div");
            mazeCell.classList.add("cell");
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

    editContentEventModal(puzzleDiv, true);

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

    editContentEventModal(quizDiv, true);

    function update_quiz(quiz, current_question) {
        if (quiz[current_question] == "end") {
            doneMinigame();
            return;
        }

        button_container.innerHTML = ``;

        quiz[current_question].answers.forEach((answer => {
            questionh3.textContent = quiz[current_question].question;
            let button = document.createElement("button");
            button.classList.add("answer");
            button.innerHTML = answer.answer;
            button_container.append(button);

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
                    setTimeout(() => {
                        update_quiz(quiz, current_question);
                    }, 1000);
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

