let phone_button = document.createElement("button");
phone_button.classList.add("phone_button");
phone_button.innerHTML = "TELEFON";
document.querySelector("body").append(phone_button);

let notebook_button = document.createElement("button");
notebook_button.classList.add("notebook_button");
notebook_button.innerHTML = "ANTECKNINGAR";
document.querySelector("body").append(notebook_button);

phone_button.addEventListener("click", render_phone_page);
notebook_button.addEventListener("click", render_notebook_page);

function render_phone_page () {
    const storyIndex = JSON.parse(window.localStorage.getItem("storyIndex"));
    let phone_data = data[storyIndex].phoneData;

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
                <h3 class="suspects_button">MISSTÄNKTA</h3>
                <h3 class="clues_button">LEDTRÅDAR</h3>
            </div>
            <div class="button_container">
                <button class="close_button">CLOSE</button>
            </div>
        `;

        document.querySelector(".close_button").addEventListener("click", () => {
            document.querySelector(".notebook_container").remove();
            document.querySelector(".notebook_button").addEventListener("click", render_notebook_page)
            document.querySelector(".phone_button").addEventListener("click", render_phone_page)
        })

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
            
            let button_container = document.querySelector(".button_container");
            let back_button = document.createElement("button");
            back_button.classList.add("back_button");
            back_button.innerHTML = "BACK";
            button_container.append(back_button);
            back_button.addEventListener("click", activate_back_button);

            function activate_back_button() {
                list.remove();
                document.querySelector(".button_container").remove();
                render_notes();
            }

            if(category == "LEDTRÅDAR") {
                render_clues(notebook_data.clues, category);
            }
            else if (category == "MISSTÄNKTA") {
                render_clues(notebook_data.suspects, category);
            }
            
            function render_clues (array, category) {
                let back_button = document.querySelector(".back_button");
                back_button.addEventListener("click", activate_back_button);

                let no_clue;
                if(array == "") {
                    let clue = document.createElement("div");
                    list.append(clue);
                    clue.innerHTML = `
                        <h4>Här är det tomt!</h4>
                        <p>Gå till Slottsparken för att hitta några ledtrådar.</p>
                    `;
                    no_clue = true;
                }
                
                if(!no_clue) {
                    if(category == "MISSTÄNKTA") {
                        array.forEach((object) => {
                            let clue = document.createElement("div");
                            clue.classList.add("clue");
                            list.append(clue);
                            clue.innerHTML = `
                                <h4>${object.name}</h4>
                                <p>${object.description} Du pratade med ${object.name} vid ${object.location}</p>
                            `;
                        })
                    }
                    else if(category == "LEDTRÅDAR") {
                        let locations = [];

                        array.forEach((object) => {
                            if(!locations.includes(object.location)) {
                                locations.push(object.location);
                            }
                        })

                        console.log(locations);

                        locations.forEach( location => {
                            let div = document.createElement("div");
                            list.append(div);
                            div.innerHTML = `
                                <h4>${location}</h4>
                            `;

                            div.addEventListener( "click", () => {
                                list.innerHTML = ``;
                                array.forEach( clue => {
                                    if(clue.location == location) {
                                        let clue_div = document.createElement("div");
                                        clue_div.classList.add("clue");
                                        list.append(clue_div);
                                        clue_div.innerHTML = `
                                            <h4>${clue.name}</h4>
                                            <p>${clue.description}</p>
                                        `;
                                    }
                                })
                                let back_button = document.querySelector(".back_button");
                                back_button.removeEventListener("click", activate_back_button);
                                document.querySelector(".back_button").addEventListener("click", () => {
                                    list.innerHTML = ``;
                                    render_clues(array, category);
                                })
                            })
                        })

                    }
                }
            }
        }
    }
}