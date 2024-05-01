// TODO:
// Startup/Startpage - Loading screen > Click start to begin > välj namn > gå till karta
// Info om hur man spelar?
// Map function - Basen fungerar (nästan klar)
// Dialogue function - Ossian
// Dialogue array - Ossian
// fixa kartan - Ossian
// Clues & Suspects page - Isak
// Phone page - Isak
// Guess the villain

startUp();

function startUp() {

    const startUpContainer = document.createElement("div");
    startUpContainer.classList.add("startUpContainer");

    const startUpTitle = document.createElement("div");
    startUpTitle.classList.add("startUpTitle");
    startUpTitle.textContent = "Malmö Mysteries: Sherlock Holmes";
    startUpContainer.append(startUpTitle);

    const startButton = document.createElement("button");
    startButton.classList.add("startUpButton");
    startButton.textContent = "Starta"
    startUpContainer.append(startButton)
    window.localStorage.clear();
    startButton.addEventListener("click", e => {
        renderDialogue(false, true);
    })

    activateEventModal();
    editContentEventModal(startUpContainer);

    if (!window.localStorage.getItem("storyIndex")) {
        window.localStorage.setItem("storyIndex", 0);
        console.log("no story index... adding");
    }
}

function renderPhone() {
}

function renderCluesSuspects() {
}

function activateEventModal() {
    const eventDiv = document.querySelector("#eventModal");
    eventDiv.classList.remove("modalDisabled");
    eventDiv.classList.add("modalActive");

    return eventDiv;
}

function disableEventModal() {
    const eventDiv = document.querySelector("#eventModal");
    eventDiv.classList.remove("modalActive");
    eventDiv.classList.add("modalDisabled")

    return eventDiv;
}

function editContentEventModal(content, dialogue) {

    const eventDiv = document.querySelector("#eventModal");


    if (!dialogue) {
        eventDiv.innerHTML = "";
        eventDiv.append(content);
    }

    if (dialogue) {
        const storyIndex = JSON.parse(window.localStorage.getItem("storyIndex"));
        const currentStory = data[storyIndex];

        eventDiv.innerHTML = "<div class='dialogueBackground'></div>";
        const backgroundDiv = eventDiv.querySelector(".dialogueBackground")
        backgroundDiv.append(content);
        backgroundDiv.style.backgroundImage = `url(${currentStory.dialogueBG})`

    }


    return eventDiv;
}

function removeContentEventModal() {
    const eventDiv = document.querySelector("#eventModal");
    eventDiv.innerHTML = "";

    return eventDiv;
}

function renderInfoModal(content) {
    const infoModal = document.createElement("div");
    infoModal.id = "infoModal";
    infoModal.innerHTML = `
        <div class="modalWrapper">
            <span class="closeInfo">X</span>
        </div>
    `

    infoModal.querySelector(".closeInfo").addEventListener("click", e => {
        infoModal.remove();
    })

    infoModal.querySelector(".modalWrapper").append(content);

    document.body.append(infoModal);

    return infoModal;
}