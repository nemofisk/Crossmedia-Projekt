/*
TODO:
CSS:
 - Startpage
JS:
 - Passwords/questions for dialogue unlock
 - Lägga till maze nånstans
*/

alert("försök 99... minst")
preload_images();
startUp();

function startUp() {
    if (window.localStorage.getItem("storyIndex") >= 1) {
        renderMap();
        render_nav();
        check_for_notice();
    }

    if (!window.localStorage.getItem("storyIndex") || window.localStorage.getItem("storyIndex") == 0) {
        window.localStorage.setItem("gameInfoRendered", false);
        window.localStorage.setItem("storyIndex", 0);
        window.localStorage.setItem("newMessangers", JSON.stringify([]));

        const startUpContainer = document.createElement("div");
        startUpContainer.classList.add("startUpContainer");

        const elementContainer = document.createElement("div");
        elementContainer.classList.add("startUpElementContainer");

        const startUpTitle = document.createElement("p");
        startUpTitle.classList.add("startUpTitle");
        startUpTitle.textContent = "C  ity of Secrets"

        let text = document.createElement("p");
        text.classList.add("blinking_text");
        elementContainer.append(startUpTitle)
        elementContainer.append(text);


        startUpContainer.append(elementContainer);

        let textOpacity = 1;

        text.textContent = "Klicka på skärmen för att börja..."
        const intervalID = setInterval(function () {
            console.log("blinking");
            if (textOpacity == 1) {
                textOpacity = 0.3
                text.style.opacity = textOpacity
                return;
            }

            if (textOpacity == 0.3) {
                textOpacity = 1
                text.style.opacity = textOpacity
                return;
            }


        }, 1000)

        startUpContainer.addEventListener("click", e => {
            clearInterval(intervalID)
            renderDialogue(false, true);
        })

        activateEventModal();
        editContentEventModal(startUpContainer);
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

        const rendered = JSON.parse(window.localStorage.getItem("gameInfoRendered"))
        console.log(rendered);

        if (!rendered) {
            window.localStorage.setItem("gameInfoRendered", true);
            map.flyTo([currentLocation.lat, currentLocation.lon], 17);

            if (playerCords) {
                setTimeout(function () {
                    map.flyTo([playerCords.lat, playerCords.lng], 17)
                }, 2500)
            }
        }
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

            <div>Platsåtkomst behövs inte för att kunna spela men rekommenderas för en bättre spelupplevelse</div>
            <div>Får du inte upp en notis för platsåtkomst?<br>Testa att gå in i mobilens inställningar och tillåt platsåtkomst för webbläsaren.</div>
        </div>
        `,
        `
        <div>
            Det går även att installera spelet, detta rekommenderas även för den bästa spelupplevelsen. Du gör det på olika sätt beroende på webbläsare.
        </div>
        <div>Safari: Klicka på dela-knappen och scrolla till och klicka "lägg till på hemskärmen".</div>
        <div>Chrome: Du bör få en notis som frågar om du vill installera spelet. Annars kan du klicka på de tre punkterna uppe i högra hörnet och välj "installera".</div>
        `,
        `
        <div>Det finns två ikoner på kartan som du måste hålla reda på:</div>

        <div class="infoContainer">
            <div class="playerImage"></div>

            <div>Hatten visar vart du befinner dig just nu.</div>
        </div>
        
        <div class="infoContainer">
            <div class="locationImage"></div>

            <div>Förstoringsglaset visar platsen du ska ta dig till. Om du spelar utan platsåtkomst eller dialogen inte startar även fast du är vid förstoringsglaset kan du trycka på det för att starta dialogen.</div>
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

