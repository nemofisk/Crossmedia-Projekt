/*
TODO:
CSS:
 - Startpage
 - Wordle/Maze

JS:
 - Guess the villain/suspect - ISAK
 - Passwords for dialogue unlock
 - Bilder till dialogue backgrounds
 - Dialogue heads - OSSIAN
*/

preload_images();
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

function renderInfoModal(contentArray) {
    let currentPageIndex = 0;

    const infoModal = document.createElement("div");
    infoModal.id = "infoModal";
    infoModal.innerHTML = `
        <div class="modalWrapper">
            <span class="closeInfo"></span>
            <div class="infoContent"></div>
        </div>
    `

    infoModal.querySelector(".closeInfo").addEventListener("click", e => {
        infoModal.remove();
    })

    const infoContent = infoModal.querySelector(".modalWrapper > .infoContent");

    infoContent.innerHTML = contentArray[0];

    if (contentArray.length != 1) {
        const pagesButtons = document.createElement("div");
        pagesButtons.classList.add("pagesButtons")

        const prevP = document.createElement("span");
        prevP.classList.add("prevP")
        pagesButtons.append(prevP)
        prevP.style.backgroundImage = "url(images/left-arrow-disabled.png)"

        const nextP = document.createElement("span");
        nextP.classList.add("nextP")
        pagesButtons.append(nextP)

        infoModal.querySelector(".modalWrapper").append(pagesButtons);

        prevP.addEventListener("click", ev => {
            if (currentPageIndex != 0) {
                if (currentPageIndex == 1) {
                    prevP.style.backgroundImage = "url(images/left-arrow-disabled.png)"
                }
                nextP.style.backgroundImage = "url(images/right-arrow.png)"


                currentPageIndex--;
                const pageContent = contentArray[currentPageIndex];

                infoContent.innerHTML = pageContent;
            }
        })
        nextP.addEventListener("click", ev => {
            if (currentPageIndex != contentArray.length - 1) {
                if (currentPageIndex == contentArray.length - 2) {
                    nextP.style.backgroundImage = "url(images/right-arrow-disabled.png)"
                }

                prevP.style.backgroundImage = "url(images/left-arrow.png)"


                currentPageIndex++;
                const pageContent = contentArray[currentPageIndex];

                infoContent.innerHTML = pageContent;

            }
        })
    }

    document.body.append(infoModal);

    return infoModal;
}

function renderGameInfo() {
    const infoContent = [
        `<div class="startInfoHead">Välkommen till Malmö Mysteries: Sherlock Holmes!</div>

        <div>I detta spelet ska du hjälpa Sherlock Holmes att hitta den försvunne Zlatan Ibrahimovic.</div>

        <div> Navigera dig till de olika platserna som visas på kartan för att prata med vittnen och samla på dig ledtrådar för att lösa mysteriet.</div>
        `,
        `
        <div class="infoContainer">
            <div class="noticeImage"></div>

            <div>Se till att spelet har åtkomst till din plats genom att acceptera notiserna som frågar om din position.</div>
            <div>Får du inte upp en notis?<br>Testa att gå in i mobilens inställningar och tillåt platsåtkomst för webbläsaren.</div>
        </div>
        `,
        `
        <div>Det finns två ikoner på kartan som du måste hålla reda på:</div>

        <div class="infoContainer">
            <div class="playerImage"></div>

            <div>Hatten visar vart du befinner dig just nu.</div>
        </div>
        
        <div class="infoContainer">
            <div class="locationImage"></div>

            <div>Förstoringsglaset visar platsen du ska ta dig till. Om dialogen inte startar även fast du är vid förstoringsglaset kan du trycka på det för att starta dialogen.</div>
        </div>
        
        `,
        `
        <div class="infoContainer">
            <div class="phoneImage"></div>
            
            <div>Håll även utkik på telefonen efter meddelanden från olika karaktärer.</div>
        </div>

        <div class="infoContainer">
            <div class="notebookImage"></div>
            <div>I anteckningsblocket finner du de platserna du har besökt och de ledtrådar du hittat. Här kan du kan även se de misstänkta personerna.</div>
        </div>
        `,
        `
        <div class="infoContainer">
            <div class="helpImage"></div>
            <div>Klicka på hjälp-knappen för att komma åt denna informationen igen</div>
        </div>
        <div>Lycka Till!</div>`
    ]

    renderInfoModal(infoContent);
}

function preload_images() {
    for (let url of imageURLs) {
        let img = new Image();

        img.src = url;
    }
}

