// Minigames

//WORDLE
function wordle() { }


//MEMORY
//parent should have class memory_parent
function render_memory(parent) {
    let numbers = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
    
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

        box.onclick = function() {
            this.classList.add("memory_box_open");

            if(document.querySelectorAll(".memory_box_open").length > 1) {
                let boxes = document.querySelectorAll(".memory_item");

                for (box of boxes) {
                    box.setAttribute("disabled", "true");
                }

                setTimeout(check_match, 500);

                function check_match () {
                    if(document.querySelectorAll(".memory_box_open")[0].innerHTML == document.querySelectorAll(".memory_box_open")[1].innerHTML) {
                        document.querySelectorAll(".memory_box_open")[0].classList.add("memory_box_match");
                        document.querySelectorAll(".memory_box_open")[1].classList.add("memory_box_match");

                        document.querySelectorAll(".memory_box_open")[1].classList.remove("memory_box_open");
                        document.querySelectorAll(".memory_box_open")[0].classList.remove("memory_box_open");

                        if(document.querySelectorAll(".memory_box_match").length == numbers.length) {
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

//MAZE
function maze() { }

//PUZZLE
//parent should have class parent_puzzle
function drag (event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allow_drop (event) {
    event.preventDefault();
}

function drop (event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text");
    event.target.append(document.getElementById(data));

    let drop_boxes = document.querySelectorAll(".drop_box");
    let correct_pieces = [];

    drop_boxes.forEach( box => {
        if(box.childNodes[0]) {
            box.removeAttribute("ondrop");
            let drag_id = box.childNodes[0].id.substring(5);
            let drop_id = box.id.substring(5);

            if(drag_id == drop_id) {
                box.removeAttribute("ondrop");

                correct_pieces.push(drop_id);
            
                if(correct_pieces.length == 36) {
                    setTimeout(() => {alert("YOU WIN")}, 500);
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
        if(quiz[current_question] == "end") {
            alert(`YOU WIN. You got ${points} points.`);
            parent.innerHTML = ``;
            return;
        }
        
        button_container.innerHTML = ``;

        quiz[current_question].answers.forEach(( answer => {
            document.querySelector(".quiz_question").textContent = quiz[current_question].question;
            let button = document.createElement("button");
            button.classList.add("answer");
            button.innerHTML = answer.answer;
            button_container.append(button);
            
            button.addEventListener( "click", e => {
                if(answer.true) {
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

