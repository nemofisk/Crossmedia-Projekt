let nav_created;
function render_nav() {
    if (!nav_created) {
        let phone_button = document.createElement("button");
        phone_button.classList.add("phone_button");
        let nav = document.createElement("div");
        nav.classList.add("nav");
        nav.append(phone_button);
        document.querySelector("body").append(nav);

        let notebook_button = document.createElement("button");
        notebook_button.classList.add("notebook_button");
        nav.append(notebook_button);

        phone_button.addEventListener("click", render_phone_page);
        notebook_button.addEventListener("click", render_notebook_page);
    }

    nav_created = true;

    check_for_notice();
}

function check_for_notice() {
    const storyIndex = JSON.parse(window.localStorage.getItem("storyIndex"));
    let new_messangers = JSON.parse(window.localStorage.getItem("newMessangers"));
    console.log(new_messangers)
    data[storyIndex].phoneData.forEach(person => {
        person.messages.forEach((message) => {
            if (message.state == "Nytt") {
                if (!new_messangers.includes(person.name)) {
                    new_messangers.push(person.name);
                }
            }
        })
    })

    window.localStorage.setItem("newMessangers", JSON.stringify(new_messangers));
    if (new_messangers.length > 0) {
        document.querySelector(".phone_button").classList.add("notice_button");
    }
}

function render_phone_page() {
    const storyIndex = JSON.parse(window.localStorage.getItem("storyIndex"));
    const notices_array = JSON.parse(window.localStorage.getItem("newMessangers"));
    let phone_data = data[storyIndex].phoneData;

    document.querySelector(".phone_button").removeEventListener("click", render_phone_page);
    document.querySelector(".notebook_button").removeEventListener("click", render_notebook_page);

    let body = document.querySelector("body");

    let phone_page = document.createElement("div");
    phone_page.classList.add("phone_page");
    phone_page.innerHTML = `
        <div class="button_container"></div>
        <h3 class="current_phone_page">CONTACTS</h3>
    `;
    body.append(phone_page);

    render_contacts();

    function render_contacts() {
        document.querySelector(".button_container").innerHTML = `
            <button class="close_button"></button>
        `;

        document.querySelector(".phone_page").innerHTML += `
            <div class="contacts"></div>
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
                <h4>${name}</h4>
            `;

            if (notices_array.includes(name)) {
                contact.classList.add("notice_contact");
            }

            contacts.append(contact);
            contact.addEventListener("click", render_messages);
        }

        function render_messages(e) {
            let name = e.target.outerText;

            let notice_index = notices_array.indexOf(name);
            if (notice_index > -1) { // only splice array when item is found
                notices_array.splice(notice_index, 1); // 2nd parameter means remove one item only
            }
            window.localStorage.setItem("newMessangers", JSON.stringify(notices_array));

            if (notices_array.length < 1) {
                document.querySelector(".phone_button").classList.remove("notice_button");
            }

            document.querySelector(".current_phone_page").textContent += ` > ${name}`;
            document.querySelector(".contacts").remove();

            let phone_page = document.querySelector(".phone_page");
            let messages = document.createElement("div");
            messages.classList.add("messages");

            for (let person of phone_data) {
                if (person.name == name) {
                    messages.style.backgroundImage = `url(./images/clues/${person.img})`;
                    messages.classList.add(person.name[0]);
                    if (person.messages.length == 1) {
                        messages.style.flexDirection = "column-reverse";
                    }
                    person.messages.forEach(message => {

                        let chat_bubble = document.createElement("div");
                        chat_bubble.classList.add("chat_bubble");
                        chat_bubble.innerHTML = `
                                <p class="message_text">${message.message}</p>
                                <p class="message_state">${message.state}</p>
                            `;
                        messages.append(chat_bubble);
                    })
                    document.querySelector(".messages").scrollTop = document.querySelector(".messages").scrollHeight;
                }
            }

            phone_page.append(messages);

            let button_container = document.querySelector(".button_container");
            let back_button = document.createElement("button");
            back_button.classList.add("back_button")
            button_container.append(back_button);
            back_button.addEventListener("click", () => {
                document.querySelector(".current_phone_page").textContent = "CONTACTS"
                messages.remove();
                document.querySelector(".button_container").innerHTML = ``;
                render_contacts();
            });
        }
    }
}

function render_notebook_page() {
    const storyIndex = JSON.parse(window.localStorage.getItem("storyIndex"));
    let notebook_data = data[storyIndex].notebookData;

    document.querySelector(".phone_button").removeEventListener("click", render_phone_page);
    document.querySelector(".notebook_button").removeEventListener("click", render_notebook_page);
    let body = document.querySelector("body");

    let notebook_container = document.createElement("div");
    notebook_container.classList.add("notebook_container");
    notebook_container.innerHTML = `
        <div class="notebook_img"></div>
        <div class="notebook_page">
            <div class="button_container"></div>
        </div>
    `;
    body.append(notebook_container);

    render_notes();

    function render_notes() {
        document.querySelector(".notebook_page").innerHTML += `
            <div class="notebook_categories">
                <h3 class="suspects_button">MISSTÄNKTA</h3>
                <h3 class="clues_button">LEDTRÅDAR</h3>
            </div>
        `;

        document.querySelector(".button_container").innerHTML += `
            <button class="close_button"></button>
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
            notebook_page.append(list);

            let button_container = document.querySelector(".button_container");
            let back_button = document.createElement("button");
            back_button.classList.add("back_button");
            button_container.append(back_button);
            back_button.addEventListener("click", activate_back_button);

            function activate_back_button() {
                list.remove();
                document.querySelector(".button_container").innerHTML = ``;
                render_notes();
            }

            if (category == "LEDTRÅDAR") {
                render_clues(notebook_data.clues, category);
            }
            else if (category == "MISSTÄNKTA") {
                render_clues(notebook_data.suspects, category);
            }

            function render_clues(array, category) {
                let back_button = document.querySelector(".back_button");
                back_button.addEventListener("click", activate_back_button);

                let no_clue;
                if (array == "") {
                    let clue = document.createElement("div");
                    clue.classList.add("clue");
                    list.append(clue);
                    clue.innerHTML = `
                        <h4 class="clue_text">Här är det tomt!</h4>
                        <p class="description">Gå till Slottsparken för att hitta några ledtrådar.</p>
                    `;
                    no_clue = true;
                }

                if (!no_clue) {
                    if (category == "MISSTÄNKTA") {
                        array.forEach((object) => {
                            let clue = document.createElement("div");
                            clue.classList.add("clue");
                            list.append(clue);
                            clue.innerHTML = `
                                <h4 class="clue_text">${object.name}<h4>
                                <p class="description">${object.description}</p>
                            `;

                            let p = document.createElement("p");
                            p.textContent = "Se bild..."
                            p.classList.add("notebook_popup_button");
                            clue.append(p);
                            p.addEventListener("click", () => {
                                render_notebook_popup(object);
                            })

                        })
                    }
                    else if (category == "LEDTRÅDAR") {
                        let locations = [];

                        array.forEach((object) => {
                            if (!locations.includes(object.location)) {
                                locations.push(object.location);
                            }
                        })

                        locations.forEach(location => {
                            let div = document.createElement("div");
                            list.append(div);
                            div.innerHTML = `
                                <h4 class="clue_text">${location}</h4>
                            `;

                            div.addEventListener("click", () => {
                                list.innerHTML = ``;
                                array.forEach(clue => {
                                    if (clue.location == location) {
                                        let clue_div = document.createElement("div");
                                        clue_div.classList.add("clue");
                                        list.append(clue_div);
                                        clue_div.innerHTML = `
                                            <h4 class="clue_text">${clue.name}</h4>
                                            <p class="description">${clue.description}</p>
                                        `;
                                        if (clue.img) {
                                            let p = document.createElement("p");
                                            p.textContent = "Se bild..."
                                            p.classList.add("notebook_popup_button");
                                            clue_div.append(p);
                                            p.addEventListener("click", () => {
                                                render_notebook_popup(clue);
                                            })
                                        }
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

                function render_notebook_popup(object) {
                    let popup = document.createElement("div");
                    popup.classList.add("notebook_popup");
                    body.append(popup);

                    let img = document.createElement("div");
                    img.classList.add("notebook_popup_img");
                    popup.append(img);
                    img.style.backgroundImage = `url(./images/clues/${object.img})`;

                    let close_button = document.createElement("button");
                    close_button.classList.add("notebook_popup_close");

                    popup.append(close_button);

                    close_button.addEventListener("click", () => {
                        popup.remove();
                    })
                }
            }
        }
    }
}