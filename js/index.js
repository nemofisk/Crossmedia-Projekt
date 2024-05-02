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

function renderGameInfo() {
    const infoContent = document.createElement("div");

    const infoText = document.createElement("div");
    infoText.innerHTML = `
        <span class="startInfoHead">Välkommen till Malmö Mysteries: Sherlock Holmes!</span>
        <br>
        <br>
        Så här spelar du spelet:
        <br>
        <br>
        Se till att spelet har åtkomst till din plats genom att acceptera notisen som frågar om din position.
        <br>
        <br>
        <span class="startInfoPlaces">Det finns två ställen på kartan som du måste hålla reda på:</span>
        <br>
        <br>
        <span class="placesPlayer">Dig själv som representeras av den röda cirkeln</span> 
        <br>
        <br>
        <span class="placesDestination">Ditt nuvarande mål som representeras av en grön cirkel.</span>
        <br>
        <br>
        Håll utkik på telefonen efter meddelanden från olika karaktärer.
        <br>
        <br>
        I anteckningsblocket finner du de platserna du har besökt och de ledtrådar du hittat på platsen. Du kan även se de misstänkta personerna. Denna information kommer att uppdateras under spelets gång.
        <br>
        <br>
        Lycka till!
        `

    infoContent.appendChild(infoText);

    renderInfoModal(infoContent);
}