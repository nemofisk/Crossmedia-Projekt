const data = [
    {
        location: "intro",
        dialogueAfter: [
            {
                speaker: "Sherlock Holmes",
                line: "Nu är det allvar! Vi har precis fått ett meddelande från Zlatans fru Helena Seger som berättat att Zlatan är spårlöst försvunnen. Han försvann igårkväll när han skulle ut och jogga men aldrig kom hem. Vi är på semester och behöver därför din hjälp att hitta honom, vi har hört talas om dina dektektivskills och har fullt förtroende för att du kan lösa mysteriet. Jag och Watson kan hjälpa dig på vägen om du skulle köra fast. Vi har fått uppgifter om att han senast sågs joggandes i Slottsparken, det kan vara ett bra ställe att börja söka ledtrådar på. "
            }
        ],
        dialogueBG: "../images/vacation.jpg"
    },
    {
        location: "parken",
        lat: 55.60329,
        lon: 12.992301,
        dialogueBefore: [
            {
                speaker: "Player",
                line: "Hej! Vet du något om ett försvinnande har ägt rum här?"
            },
            {
                speaker: "Göran",
                line: "Nog vet jag en hel del, jag råkar faktiskt vara den sista som såg Zlatan innan han försvann."
            },
            {
                speaker: "Player",
                line: "Okej, berätta vad du vet."
            },
            {
                speaker: "Göran",
                line: "Sakta i backarna! Jag är en av Zlatans närmaste vänner och vet allt om honom, du vet inte den första sak om geniet. Du måste först göra ett Zlatan- quiz för att jag ska svara på några av dina frågor."
            }
        ],
        dialogueAfter: [
            {
                speaker: "Göran",
                line: "Nåja. Nu när du gjort din del kan jag berätta vad jag vet. Igår när Zlatan var ute på sin sedvanliga kvällsjobb så satt jag här i parken för att mata lite fåglar. Eftersom jag är fotograf så började jag ta bilder på Zlatan när han sprang förbi, men då händer något fruktansvärt! En maskerad person kommer ut i busken och tar Zlatan, de kör iväg i en rosa skåpbil. Jag lyckades ta en bild på spektaklet."
            },
            {
                speaker: "Player",
                line: "Ojdå, det var värdefull information. Vet du någon som kan ha velat Zlatan illa."
            },
            {
                speaker: "Göran",
                line: "Tjaa sedan Zlatan köpte in dig i Hammarby är väl halva Malmö upprörda, kidnapparen kan vara vem som helst. Men eftersom du frågar mig så ska jag berätta att Sara, Zlatans ex-flickvän, är synnerligen misstänkt i mina ögon. Jag ser henne svänga förbi Zlatans hus ofta, trots att de gjorde slut för nästan tio år sedan. Stackars tösen kom väl aldrig över honom och nu har hon väl tagit saken i egna händer. Svartsjuka kan göra märkliga saker med oss människor. Jag såg de faktiskt sitta och äta på Johan P vid lilla torg igår. Ryktet säger att diskussionen inte precis var vänlig."
            }
        ],
        dialogueBG: "../images/test_park.jpg",
        dialoguePassword: "123",
        minigame: "quiz",
        phoneData: [
            {
                name: "SHERLOCK",
                img: "sherlock.jpg",
                messages: [
                    {
                        message: "Min kära vän. Tack för att du tar dig an utmaningen nu när jag och Watson är på semester.", 
                        state: "Nytt"
                    }
                ]
            },
            {
                name: "JOHN WATSON",
                img: "john.jpg",
                messages: [
                    {
                        message: "Hört att du har fått ett nytt uppdrag. Får se om jag har tid att leta upp lite info som kan hjälpa dig. Men nu ska jag ta ett dopp. Sherlock duschar.",
                        state: "Nytt"
                    }
                ]
            },
            {
                name: "LESTRADE",
                img: "lestrade.jpg",
                messages: [
                    {
                        message: "Kontakta mig när du vet vem gärningsmannen är.",
                        state: "Nytt"
                    }
                ]
            }
        ],
        notebookData: {
            clues: "",
            suspects: ""
        }
    },
    {
        location: "Johan P",
        lat: 55.604183,
        lon: 12.998948,
        dialogueBefore: [
            {
                speaker: "Player",
                line: "Jag har hört rykten om att en hetsig diskussion brutit ut här igår mellan Zlatan och Sara, vet du något om saken?"
            },
            {
                speaker: "Lisa",
                line: "Jaa.. Jag hörde definitivt att de bråkades, men inte vad det hela handlade om. Sara verkade väldigt upprörd och när hon ställde sig upp för att gå hörde jag att hon skrev ordet…"
            }
        ],
        dialogueAfter: [
            {
                speaker: "Player",
                line: "Ojdå, detta låter allvarligt! Vet du hur jag kan få tag på Sara?"
            },
            {
                speaker: "Lisa",
                line: "Jaa, hon jobbar ju på kyrkogården, så där är hon nog!"
            }
        ],
        minigame: "wordle",
        phoneData: [
            {
                name: "SHERLOCK",
                img: "sherlock.jpg",
                messages: [
                    {
                        message: "Min kära vän. Tack för att du tar dig an utmaningen nu när jag och Watson är på semester.", 
                        state: "Gammalt"
                    }
                ]
            },
            {
                name: "JOHN WATSON",
                img: "john.jpg",
                messages: [
                    {
                        message: "Hört att du har fått ett nytt uppdrag. Får se om jag har tid att leta upp lite info som kan hjälpa dig. Men nu ska jag ta ett dopp. Sherlock duschar.",
                        state: "Gammalt"
                    }
                ]
            },
            {
                name: "LESTRADE",
                img: "lestrade.jpg",
                messages: [
                    {
                        message: "Kontakta mig när du vet vem gärningsmannen är.",
                        state: "Gammalt"
                    }
                ]
            }
        ],
        notebookData: {
            clues:
                [
                    {
                        name: "Maskerade män",
                        description: "Zlatan blev kidnappad av en grupp maskerade män. Göran tog bild.",
                        location: "Slottsparken",
                        img: "zlatan_persued.jpg"
                    },
                    {
                        name: "En rosa skåpbil.",
                        description: "Zlatan sågs senast bli ivägkörd i en rosa skåpbil. Göran tog bild.",
                        location: "Slottsparken",
                        img: "zlatan_van.jpg"
                    },
                    {
                        name: "En använd spruta.",
                        description: "En använd tom spruta hittades bredvid en buske.",
                        location: "Slottsparken"
                    },
                    {
                        name: "Göran misstänker Sara",
                        description: "Göran har misstankar om att det är Sara (Zlatans ex) som har kidnappat Zlatan.",
                        location: "Slottsparken"
                    }
                ],
            suspects: [
                {
                    name: "Göran",
                    description: "Svettig, kunnig om Zlatan, lite för kunnig... påstår han är fotograf. Är Göran gärningsmannen?",
                    location: "Slottsparken",
                    img: "göran.jpg"
                }
            ]
        },
    },
    {
        location: "Kyrkogarden",
        lat: 55.601726,
        lon: 12.997218,
        dialogue: [],
        phoneData: [
            {
                name: "SHERLOCK",
                img: "sherlock.jpg",
                messages: [
                    {
                        message: "Min kära vän. Tack för att du tar dig an utmaningen nu när jag och Watson är på semester.", 
                        state: "Gammalt"
                    }
                ]
            },
            {
                name: "JOHN WATSON",
                img: "john.jpg",
                messages: [
                    {
                        message: "Hört att du har fått ett nytt uppdrag. Får se om jag har tid att leta upp lite info som kan hjälpa dig. Men nu ska jag ta ett dopp. Sherlock duschar.",
                        state: "Gammalt"
                    },
                    {
                        message: "Läget? Jag hörde att du pratat med Sara. Jag råkar veta att Zlatans bästa vän heter Stefan.", 
                        state: "Nytt"
                    },
                    {
                        message: "Dessutom så känner Sara Stefan sedan tidigare. Det kanske är värt att prata med grabben. Jag ska hitta hans nummer, jag återkommer!", 
                        state: "Nytt"
                    }
                ]
            },
            {
                name: "LESTRADE",
                img: "lestrade.jpg",
                messages: [
                    {
                        message: "Kontakta mig när du vet vem gärningsmannen är.",
                        state: "Gammalt"
                    }
                ]
            }
        ],
        notebookData: {
            clues:
                [
                    {
                        name: "Maskerade män",
                        description: "Zlatan blev kidnappad av en grupp maskerade män. Göran tog bild.",
                        location: "Slottsparken",
                        img: "zlatan_persued.jpg"
                    },
                    {
                        name: "En rosa skåpbil.",
                        description: "Zlatan sågs senast bli ivägkörd i en rosa skåpbil. Göran tog bild.",
                        location: "Slottsparken",
                        img: "zlatan_van.jpg"
                    },
                    {
                        name: "En använd spruta.",
                        description: "En använd tom spruta hittades bredvid en buske.",
                        location: "Slottsparken"
                    },
                    {
                        name: "Göran misstänker Sara",
                        description: "Göran har misstankar om att det är Sara (Zlatans ex) som har kidnappat Zlatan.",
                        location: "Slottsparken"
                    },
                    {
                        name: "Bråk mellan Zlatan och Sara",
                        description: "Ett vittne har hört att det bråkats mellan Zlatan och Sara.",
                        location: "Johan P"
                    },
                    {
                        name: "Avliva",
                        description: "Sara skrek någonting angående avliva åt Zlatan. Är hon kanske kidnapparen?",
                        location: "Johan P"
                    },
                ],
            suspects: [
                {
                    name: "Göran",
                    description: "Svettig, kunnig om Zlatan, lite för kunnig... påstår han är fotograf. Är Göran gärningsmannen?",
                    location: "Slottsparken",
                    img: "göran.jpg"
                }
            ]
        },
    },
    {
        location: "epicure",
        lat: 55.603181,
        lon: 12.999978,
        dialogue: []
    },
    {
        location: "NW",
        lat: 55.605162,
        lon: 13.007086,
        dialogue: []
    },
    {
        location: "kyrkan",
        lat: 55.606933,
        lon: 13.002585,
        dialogue: []
    },
    {
        location: "hovratten",
        lat: 55.606969,
        lon: 12.991199,
        dialogue: []
    }
]