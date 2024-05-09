// Dialogue array and function, guess villain
function renderDialogueUnlock(pressed) {
    const storyIndex = JSON.parse(window.localStorage.getItem("storyIndex"));
    const currentStory = data[storyIndex];
    const password = currentStory.dialoguePassword;

    const backdropDiv = document.createElement("div");
    backdropDiv.classList.add("dialoguePassContainer")

    const passwordDiv = document.createElement("div");
    passwordDiv.classList.add("dialoguePassContainer");

    const passIcon = document.createElement("div");
    passIcon.classList.add("passLockedIcon");

    const passHeader = document.createElement("div");
    passHeader.classList.add("passHeader");
    passHeader.textContent = "Svara rätt på frågan för att starta dialogen"

    const passQuestion = document.createElement("div");
    passQuestion.classList.add("passQuestion");
    passQuestion.textContent = currentStory.passQuestion;

    const passInput = document.createElement("input");
    passInput.classList.add("passInput");

    const passButton = document.createElement("button");
    passButton.classList.add("passButton")
    passButton.textContent = "Enter";

    passButton.addEventListener("click", e => {
        if (passInput.value == password) {
            passIcon.classList.add("passUnlocked");
            setTimeout(function () {
                renderDialogue(true, false)
            }, 1000)
        } else {
            passInput.classList.add("wrongPass");
            setTimeout(function () {
                passInput.classList.remove("wrongPass")
            }, 500)
        }
    })

    const headerDiv = document.createElement("div");
    headerDiv.classList.add("passHeaderDiv");
    headerDiv.append(passIcon)
    headerDiv.append(passHeader)

    const questionDiv = document.createElement("div");
    questionDiv.classList.add("passQuestionDiv");
    questionDiv.append(passQuestion);
    questionDiv.append(passInput);
    questionDiv.append(passButton);

    backdropDiv.append(headerDiv);
    backdropDiv.append(questionDiv);
    passwordDiv.append(backdropDiv);

    if (pressed) {
        const backButton = document.createElement("div");
        backButton.classList.add("du-back-button")

        backButton.addEventListener("click", ev => {
            removeContentEventModal();
            disableEventModal();
            renderMap()
        })

        backdropDiv.append(backButton);
    }

    removeContentEventModal();
    activateEventModal();
    editContentEventModal(passwordDiv, true);
}

function renderDialogue(beforeGame, afterGame) {
    const storyIndex = JSON.parse(window.localStorage.getItem("storyIndex"));
    const currentStory = data[storyIndex];
    let dialogue;

    const dialogueContainer = document.createElement("div");
    dialogueContainer.classList.add("blur")

    setTimeout(function () {
        dialogueContainer.classList.add("dialogueContainer");
    }, 1)

    activateEventModal();
    editContentEventModal(dialogueContainer, true)

    if (beforeGame) {
        if (!currentStory.dialogueBefore) {
            renderDialogue(false, true);
            return;
        }
        dialogue = currentStory.dialogueBefore;
    }

    if (afterGame) {
        dialogue = currentStory.dialogueAfter;
        const storyIndex = JSON.parse(window.localStorage.getItem("storyIndex"));
        window.localStorage.setItem("storyIndex", storyIndex + 1);
    }

    dialogueContainer.addEventListener("transitionend", e => {
        const dialogueWindow = document.createElement("div");
        dialogueWindow.classList.add("dialogueWindow");
        dialogueContainer.append(dialogueWindow);

        let currentLine = 0;

        function writeLine(event) {
            dialogueWindow.removeEventListener("click", writeLine);

            dialogueWindow.innerHTML = `
                <p class="p-speaker">${dialogue[currentLine].speaker}</p>
                <p class="p-line"></p>
            `

            const talkingHead = document.createElement("div");
            talkingHead.classList.add("talkingHead");
            talkingHead.style.backgroundImage = `url(${dialogue[currentLine].img})`;
            dialogueWindow.prepend(talkingHead);


            const pLine = dialogueWindow.querySelector(".p-line");

            const lineLetters = [...dialogue[currentLine].line];

            let currentLetter = 0;
            let currentString = ""

            function fadeText(el) {

                let topMaskSize = el.scrollTop * 3;
                let bottomMaskSize = ((el.scrollHeight - el.offsetHeight) - el.scrollTop) * 3;

                if (topMaskSize > 48) {
                    topMaskSize = 48;
                }

                if (bottomMaskSize > 48) {
                    bottomMaskSize = 48;
                }

                el.style.setProperty("--bottom-mask-size", `${bottomMaskSize}px`)
                el.style.setProperty("--top-mask-size", `${topMaskSize}px`)
            }

            pLine.addEventListener('scroll', (e) => {
                const el = e.currentTarget;
                fadeText(el);
            });

            function writeLetters() {
                if (currentLetter >= lineLetters.length) {
                    pLine.textContent = dialogue[currentLine].line;
                    fadeText(pLine)
                    dialogueWindow.removeEventListener("click", endEarly);
                    endOfLine();
                } else {
                    currentString = currentString + lineLetters[currentLetter];
                    currentLetter++;

                    pLine.textContent = currentString;

                    pLine.scrollTop = pLine.scrollHeight;

                    setTimeout(writeLetters, 50)
                }
            }

            dialogueWindow.addEventListener("click", endEarly);

            writeLetters();

            function endEarly() {
                currentLetter = lineLetters.length;
            }

        }

        function endOfLine(ev) {
            dialogueWindow.removeEventListener("click", endOfLine);

            if (currentLine + 1 != dialogue.length) {
                currentLine++;
                dialogueWindow.addEventListener("click", writeLine);
            } else {
                if (beforeGame) {
                    dialogueWindow.removeEventListener("click", writeLine)
                    dialogueWindow.addEventListener("click", currentStory.minigame)
                }

                if (afterGame) {
                    dialogueWindow.removeEventListener("click", writeLine)
                    dialogueWindow.addEventListener("click", e => {
                        disableEventModal();
                        removeContentEventModal();
                        render_nav();
                        renderMap();
                    });
                }
            }
        }

        writeLine();
    })

}

/*

Exempel på ett objekt:

{
    talkingTo: Göran,
    lines: [
        {
            speaker: Göran,
            line: "Jag är riktigt sus"
        },
        {
            speaker: (Playername),
            line: "Ja det är du"
        }
    ]
}


*/