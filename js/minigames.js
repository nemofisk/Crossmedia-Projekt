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

        createNewRow();
    }

    const wordAnswer = "FUNNY"

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


//MEMORY
//parent should have class memory_parent
function render_memory(parent) {
    let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];

    parent.innerHTML = `
    <div class="memory_container">
        <div class="memory_game"></div>
    </div>
    `;

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
        box.innerHTML = shuffle_numbers[i];
        document.querySelector(".memory_game").appendChild(box);

        box.onclick = function () {
            this.classList.add("memory_box_open");

            if (document.querySelectorAll(".memory_box_open").length > 1) {
                let boxes = document.querySelectorAll(".memory_item");

                for (box of boxes) {
                    box.setAttribute("disabled", "true");
                }

                setTimeout(check_match, 500);

                function check_match() {
                    if (document.querySelectorAll(".memory_box_open")[0].innerHTML == document.querySelectorAll(".memory_box_open")[1].innerHTML) {
                        document.querySelectorAll(".memory_box_open")[0].classList.add("memory_box_match");
                        document.querySelectorAll(".memory_box_open")[1].classList.add("memory_box_match");

                        document.querySelectorAll(".memory_box_open")[1].classList.remove("memory_box_open");
                        document.querySelectorAll(".memory_box_open")[0].classList.remove("memory_box_open");

                        if (document.querySelectorAll(".memory_box_match").length == numbers.length) {
                            alert("YOU WIN");
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
}

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
                controlButton.classList.add("right")
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
    document.querySelector("body").append(gameWrapper);

    const gameArea = document.createElement("div");
    gameArea.setAttribute("id", "mazeGame");
    gameWrapper.append(gameArea);

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
}

//PUZZLE
//parent should have class parent_puzzle
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allow_drop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    event.target.append(document.getElementById(data));

    let drop_boxes = document.querySelectorAll(".drop_box");
    let correct_pieces = [];

    drop_boxes.forEach(box => {
        if (box.childNodes[0]) {
            box.removeAttribute("ondrop");
            let drag_id = box.childNodes[0].id.substring(5);
            let drop_id = box.id.substring(5);

            if (drag_id == drop_id) {
                box.removeAttribute("ondrop");

                correct_pieces.push(drop_id);

                if (correct_pieces.length == 36) {
                    setTimeout(() => { alert("YOU WIN") }, 500);
                }
            }
        }
        else {
            box.setAttribute("ondrop", "drop(event)")
        }
    })
}

function render_puzzle(parent) {
    let pieces_box = document.createElement("div");
    pieces_box.classList.add("pieces_box");
    pieces_box.style.opacity = 0;
    parent.append(pieces_box);

    //Creates drag_boxes (pieces)
    for (let i = 0; i < 36; i++) {
        let id = `drag_${i}`;
        img_url = `--img:url(./puzzle_pieces/${i}.jpg);`;

        let drag_box = document.createElement("div");
        drag_box.classList.add("drag_box");
        drag_box.setAttribute("ondrop", "drop(event)")
        drag_box.setAttribute("ondragover", "allow_drop(event)")
        pieces_box.append(drag_box);

        let img = document.createElement("div");
        img.classList.add("puzzle_image");
        img.setAttribute("draggable", "true");
        img.setAttribute("id", id);
        img.setAttribute("style", img_url);
        img.setAttribute("ondragstart", "drag(event)")
        drag_box.append(img);
    }

    let board = document.createElement("div");
    board.classList.add("board");
    parent.append(board);

    //Creates drop_boxes
    for (let i = 0; i < 36; i++) {
        let id = `drop_${i}`;
        let drop_box = document.createElement("div");
        drop_box.classList.add("drop_box");
        drop_box.setAttribute("id", id)
        drop_box.setAttribute("ondrop", "drop(event)")
        drop_box.setAttribute("ondragover", "allow_drop(event)")
        board.append(drop_box);
    }

    onload = function () {
        let pieces_box = document.querySelector(".pieces_box");
        let frag = document.createDocumentFragment();
        while (pieces_box.children.length) {
            frag.append(pieces_box.children[Math.floor(Math.random() * pieces_box.children.length)]);
        }
        pieces_box.append(frag);
        pieces_box.style.opacity = 1;
    }
}

//QUIZ
//parent should have class parent_quiz
// Example of quiz-question obeject
// {
//     question: "Vad är 1+1?",
//     answers: [
//         {
//             answer: 1,
//             true: false
//         },
//         {
//             answer: 2,
//             true: true
//         },
//         {
//             answer: 3,
//             true: false
//         },
//         {
//             answer: 4,
//             true: false
//         }
//     ]
// }
function render_quiz(parent, quiz) {
    parent.innerHTML = `
        <h3 class="quiz_question">${quiz[0].question}</h3>
    `
    let button_container = document.createElement("div");
    button_container.classList.add("button_container");
    let current_question = 0;
    let points = 0;
    parent.append(button_container)
    update_quiz(quiz, current_question);

    function update_quiz(quiz, current_question) {
        if (quiz[current_question] == "end") {
            alert(`YOU WIN. You got ${points} points.`);
            parent.innerHTML = ``;
            return;
        }

        button_container.innerHTML = ``;

        quiz[current_question].answers.forEach((answer => {
            document.querySelector(".quiz_question").textContent = quiz[current_question].question;
            let button = document.createElement("button");
            button.classList.add("answer");
            button.innerHTML = answer.answer;
            button_container.append(button);

            button.addEventListener("click", e => {
                if (answer.true) {
                    console.log("correct")
                    points++;
                    current_question++;
                    console.log("Points: " + points);
                    update_quiz(quiz, current_question);
                }
                else {
                    console.log("false");
                    current_question++;
                    update_quiz(quiz, current_question);
                }
            })
        }))
    }
}

