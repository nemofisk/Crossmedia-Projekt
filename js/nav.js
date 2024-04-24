let phone_button = document.createElement("button");
phone_button.classList.add("phone_button");
phone_button.innerHTML = "PHONE";
document.querySelector("body").append(phone_button);

phone_button.addEventListener("click", render_phone_page);

function render_phone_page () {
    const storyIndex = JSON.parse(window.localStorage.getItem("storyIndex"));
    let phone_data = data[storyIndex].phoneData;
    console.log(phone_data)
    document.querySelector(".phone_button").removeEventListener("click", render_phone_page);
    document.querySelector(".notebook_button").removeEventListener("click", render_notebook_page);

    let body = document.querySelector("body");

    let phone_page = document.createElement("div");
    phone_page.classList.add("phone_page");
    phone_page.innerHTML = `
        <h3 class="current_phone_page">CONTACTS</h3>
    `;
    body.append(phone_page);


    render_contacts();

    function render_contacts () {
        document.querySelector(".phone_page").innerHTML += `
            <div class="contacts"></div>
            <div class="button_container">
                <button class="close_button">CLOSE</button>
            </div>
        `;

        document.querySelector(".close_button").addEventListener("click", () => {
            document.querySelector(".phone_page").remove();
            document.querySelector(".notebook_button").addEventListener("click", render_notebook_page)
            document.querySelector(".phone_button").addEventListener("click", render_phone_page)
        })

        add_contact("SHERLOCK");
        add_contact("JOHN WATSON");
        add_contact("LESTRADE");
    
        function add_contact(name) {
            let contacts = document.querySelector(".contacts");
            let contact = document.createElement("div");
            contact.classList.add("contact");
            contact.innerHTML = `
                <img>
                <p>${name}</p>
            `;
            contacts.append(contact);
    
            contact.addEventListener("click", render_messages);
        }

        function render_messages (e) {
            let name = e.target.outerText;
            document.querySelector(".current_phone_page").textContent += ` > ${name}`;
            document.querySelector(".contacts").remove();

            let phone_page = document.querySelector(".phone_page");
            let messages = document.createElement("div");
            messages.classList.add("messages");

            for (let person of phone_data) {
                if(person.name == name) {
                    person.messages.forEach( message => {
                        messages.style.backgroundImage = `url(./images/${person.img})`;
                        let chat_bubble = document.createElement("p");
                        chat_bubble.classList.add("chat_bubble");
                        chat_bubble.textContent = message;
                        messages.append(chat_bubble);
                    })
                }
            }
            
            phone_page.append(messages);
            messages.scrollTop = messages.scrollHeight;

            let button_container = document.querySelector(".button_container");
            let back_button = document.createElement("button");
            back_button.innerHTML = "BACK";
            button_container.append(back_button);
            back_button.addEventListener("click", () => {
                document.querySelector(".current_phone_page").textContent = "CONTACTS"
                messages.remove();
                document.querySelector(".button_container").remove();
                render_contacts();
            });
        }
    }
}

let notebook_button = document.createElement("button");
notebook_button.classList.add("notebook_button");
notebook_button.innerHTML = "NOTEBOOK";
document.querySelector("body").append(notebook_button);

notebook_button.addEventListener("click", render_notebook_page);

function render_notebook_page () {
    const storyIndex = JSON.parse(window.localStorage.getItem("storyIndex"));
    let notebook_data = data[storyIndex].notebookData;

    document.querySelector(".phone_button").removeEventListener("click", render_phone_page);
    document.querySelector(".notebook_button").removeEventListener("click", render_notebook_page);
    let body = document.querySelector("body");

    let notebook_container = document.createElement("div");
    notebook_container.classList.add("notebook_container");
    notebook_container.innerHTML = `
        <div class="notebook_img"></div>
        <div class="notebook_page"></div>
    `;
    body.append(notebook_container);
    
    render_notes();

    function render_notes() {
        document.querySelector(".notebook_page").innerHTML += `
            <div class="notebook_categories">
                <h3 class="suspects_button">SUSPECTS</h3>
                <h3 class="clues_button">CLUES</h3>
            </div>
            <div class="button_container">
                <button class="close_button">CLOSE</button>
            </div>
        `;

        document.querySelector(".suspects_button").addEventListener("click", (e) => {
            let category = e.target.textContent;
            render_category(category);
        })
        document.querySelector(".clues_button").addEventListener("click", (e) => {
            let category = e.target.textContent;
            render_category(category);
        })

        function render_category(category) {
            document.querySelector(".notebook_categories").remove();
            let notebook_page = document.querySelector(".notebook_page");
            let list = document.createElement("div");
            list.classList.add("notebook_list");
            notebook_page.prepend(list);

            if(category == "SUSPECTS") {
                render_clues(notebook_data.suspects);
            }
            else if (category == "CLUES") {
                render_clues(notebook_data.clues);
            }
            
            function render_clues (array) {
                array.forEach((object) => {
                    let clue = document.createElement("div");
                    list.append(clue);
                    clue.innerHTML = `
                        <h4>${object.name}</h4>
                        <p>${object.description}</p>
                    `;
                })
            }

            let button_container = document.querySelector(".button_container");
            let back_button = document.createElement("button");
            back_button.innerHTML = "BACK";
            button_container.append(back_button);
            back_button.addEventListener("click", () => {
                list.remove();
                document.querySelector(".button_container").remove();
                render_notes();
            });
        }

        document.querySelector(".close_button").addEventListener("click", () => {
            document.querySelector(".notebook_container").remove();
            document.querySelector(".notebook_button").addEventListener("click", render_notebook_page)
            document.querySelector(".phone_button").addEventListener("click", render_phone_page)
        })
    }
}