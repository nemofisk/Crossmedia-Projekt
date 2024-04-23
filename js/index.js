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

    // const startUpContainer = document.createElement("div");
    // startUpContainer.classList.add("startUpContainer");

    // const startUpTitle = document.createElement("div");
    // startUpTitle.classList.add("startUpTitle");
    // startUpTitle.textContent = "Malmö Mysteries: Sherlock Holmes";
    // startUpContainer.append(startUpTitle);

    // const startButton = document.createElement("button");
    // startButton.classList.add("startUpButton");
    // startUpContainer.append(startButton)

    window.localStorage.clear();

    if (!window.localStorage.getItem("storyIndex")) {
        window.localStorage.setItem("storyIndex", 0);
        console.log("no story index... adding");
    }

    renderMap();
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

function editContentEventModal(content) {
    const eventDiv = document.querySelector("#eventModal");
    eventDiv.innerHTML = "";
    eventDiv.append(content);

    return eventDiv;
}

function removeContentEventModal() {
    const eventDiv = document.querySelector("#eventModal");
    eventDiv.innerHTML = "";

    return eventDiv;
}