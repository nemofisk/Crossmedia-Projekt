// Dialogue array and function, guess villain
function renderDialogue(beforeGame, afterGame) {
    const storyIndex = JSON.parse(window.localStorage.getItem("storyIndex"));
    const currentStory = data[storyIndex];
    let dialogue;

    if (beforeGame) {
        dialogue = currentStory.dialogueBefore;
    }

    if (afterGame) {
        dialogue = currentStory.dialogueAfter;
    }

    removeContentEventModal();
    activateEventModal();

    const dialogueContainer = document.createElement("div");
    dialogueContainer.classList.add("dialogueContainer");
    dialogueContainer.classList.add("dialogueBackground");

    dialogueContainer.style.backgroundImage = `url(${currentStory.dialogueBG})`;

    const dialogueWindow = document.createElement("div");
    dialogueWindow.classList.add("dialogueWindow");
    dialogueContainer.append(dialogueWindow);

    let currentLine = 0;

    function writeLine(event) {
        dialogueWindow.removeEventListener("click", writeLine);

        dialogueWindow.innerHTML = `
        <div>
            <p class="p-speaker">${dialogue[currentLine].speaker}</p>
            <p class="p-line"></p>
        </div>
        `

        const pLine = dialogueWindow.querySelector(".p-line");

        const lineLetters = [...dialogue[currentLine].line];

        let currentLetter = 0;
        let currentString = ""

        function writeLetters() {
            if (currentLetter >= lineLetters.length) {
                pLine.textContent = dialogue[currentLine].line;
                dialogueWindow.removeEventListener("click", endEarly);
                endOfLine();
            } else {
                currentString = currentString + lineLetters[currentLetter];
                currentLetter++;

                pLine.textContent = currentString;

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
                    renderMap();
                    render_nav();
                });
            }
        }
    }

    editContentEventModal(dialogueContainer)

    writeLine();
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