let phone_data = [
    {
        name: "SHERLOCK",
        img: "sherlock.jpg",
        messages: [
            "hi hi hi hi hi hi",
            "wyd wyd wyd wyd wyd wyd wyd wyd wyd wyd", 
            "??", 
            "Hi",
            "wyd", 
            "??", 
            "Hi",
            "wyd", 
            "??", 
        ]
    },
    {
        name: "JOHN WATSON",
        img: "john.jpg",
        messages: [
            "SUP BABY"
        ]
    },
    {
        name: "LESTRADE",
        img: "lestrade.jpg",
        messages: [
            "Hello.",
            "Hello.",
            "Hello.",
            "Hello.",
            "Hello.",
            "Hello.",
            "Hello.",
            "Hello.",
        ]
    }
]

let notebook_data = {
    clues: [
        {
            name: "Blod",
            description: "Ett tecken på att våld har förekommit. Hittades i slottsparken."
        },
        {
            name: "Spruta",
            description: "En spruta som har blivit använd. Hittades i slottsparken."
        }
    ],
    suspects: [
        {
            name: "Göran",
            description: "Svettig, kunnig om Zlatan, lite för kunnig... påstår han är fotograf. Är Göran gärningsmannen?"
        },
        {
            name: "Stefan",
            description: "Zlatans snygga kompis... som också har ett motiv. Är detta Zlatans kidnappare?"
        },
        {
            name: "Sara",
            description: "..."
        },
        {
            name: "Helena",
            description: "..."
        }
    ]
};

let phone_button = document.createElement("button");
phone_button.classList.add("phone_button");
phone_button.innerHTML = "PHONE";
document.querySelector("body").append(phone_button);

phone_button.addEventListener("click", activate_phone);

function activate_phone() {
    render_phone_page(phone_data)
    document.querySelector(".phone_button").removeEventListener("click", activate_phone);
    document.querySelector(".notebook_button").removeEventListener("click", activate_notebook);
}

function render_phone_page (data) {
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
            document.querySelector(".notebook_button").addEventListener("click", activate_notebook)
            document.querySelector(".phone_button").addEventListener("click", activate_phone)
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

            for (let person of data) {
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

notebook_button.addEventListener("click", activate_notebook);

function activate_notebook() {
    render_notebook_page(notebook_data)
    document.querySelector(".phone_button").removeEventListener("click", activate_phone);
    document.querySelector(".notebook_button").removeEventListener("click", activate_notebook);
}

function render_notebook_page (data) {
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
                render_clues(data.suspects);
            }
            else if (category == "CLUES") {
                render_clues(data.clues);
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
            document.querySelector(".notebook_button").addEventListener("click", activate_notebook)
            document.querySelector(".phone_button").addEventListener("click", activate_phone)
        })
    }
}