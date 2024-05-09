const data = [
    {
        location: "intro",
        dialogueAfter: [
            {
                speaker: "Sherlock Holmes",
                line: "Nu är det allvar! Vi har precis fått ett meddelande från Zlatans fru Helena Seger som berättat att Zlatan är spårlöst försvunnen. Han försvann igårkväll när han skulle ut och jogga men aldrig kom hem.",
                img: "sherlock.jpg"
            },
            {
                speaker: "Sherlock Holmes",
                line: "Vi är på semester och behöver därför din hjälp att hitta honom, vi har hört talas om dina dektektivskills och har fullt förtroende för att du kan lösa mysteriet. Jag och Watson kan hjälpa dig på vägen om du skulle köra fast. Vi har fått uppgifter om att han senast sågs joggandes i Slottsparken, det kan vara ett bra ställe att börja söka ledtrådar på.",
                img: "sherlock.jpg"
            }
        ],
        dialogueBG: "../images/dialogue/vacation.jpg"
    },
    {
        // lon: 12.953181,
        // lat: 56.459266,
        location: "parken",
        lat: 55.60329,
        lon: 12.992301,
        dialogueBG: "../images/dialogue/parken.jpg",
        dialogueBefore: [
            {
                speaker: "Player",
                line: "Hej! Vet du något om ett försvinnande har ägt rum här?",
                img: "player.jpg"
            },
            {
                speaker: "Göran",
                line: "Nog vet jag en hel del, jag råkar faktiskt vara den sista som såg Zlatan innan han försvann.",
                img: "göran.jpg"
            },
            {
                speaker: "Player",
                line: "Okej, berätta vad du vet.",
                img: "player.jpg"
            },
            {
                speaker: "Göran",
                line: "Sakta i backarna! Jag är en av Zlatans närmaste vänner och vet allt om honom, du vet inte den första sak om geniet. Du måste först göra ett Zlatan- quiz för att jag ska svara på några av dina frågor.",
                img: "göran.jpg"
            }
        ],
        dialogueAfter: [
            {
                speaker: "Göran",
                line: "Nåja. Nu när du gjort din del kan jag berätta vad jag vet. Igår när Zlatan var ute på sin sedvanliga kvällsjobb så satt jag här i parken för att mata lite fåglar. Eftersom jag är fotograf så började jag ta bilder på Zlatan när han sprang förbi, men då händer något fruktansvärt! En maskerad person kommer ut i busken och tar Zlatan, de kör iväg i en rosa skåpbil. Jag lyckades ta en bild på spektaklet.",
                img: "göran.jpg"
            },
            {
                speaker: "Player",
                line: "Ojdå, det var värdefull information. Vet du någon som kan ha velat Zlatan illa.",
                img: "player.jpg"
            },
            {
                speaker: "Göran",
                line: "Tjaa sedan Zlatan köpte in dig i Hammarby är väl halva Malmö upprörda, kidnapparen kan vara vem som helst. Men eftersom du frågar mig så ska jag berätta att Sara, Zlatans ex-flickvän, är synnerligen misstänkt i mina ögon. Jag ser henne svänga förbi Zlatans hus ofta, trots att de gjorde slut för nästan tio år sedan.",
                img: "göran.jpg"
            },
            {
                speaker: "Göran",
                line: "Stackars tösen kom väl aldrig över honom och nu har hon väl tagit saken i egna händer. Svartsjuka kan göra märkliga saker med oss människor. Jag såg de faktiskt sitta och äta på Johan P vid lilla torg igår. Ryktet säger att diskussionen inte precis var vänlig.",
                img: "göran.jpg"
            }
        ],
        passQuestion: "Vilket år står det på skylten?",
        dialoguePassword: "1935",
        minigame: wordle,
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
        dialogueBG: "../images/dialogue/johanp.jpg",
        dialogueBefore: [
            {
                speaker: "Player",
                line: "Jag har hört rykten om att en hetsig diskussion brutit ut här igår mellan Zlatan och Sara, vet du något om saken?",
                img: "player.jpg"
            },
            {
                speaker: "Lisa",
                line: "Jaa.. Jag hörde definitivt att de bråkades, men inte vad det hela handlade om. Sara verkade väldigt upprörd och när hon ställde sig upp för att gå hörde jag att hon skrev ordet…",
                img: "lisa.jpg"
            }
        ],
        dialogueAfter: [
            {
                speaker: "Player",
                line: "Ojdå, detta låter allvarligt! Vet du hur jag kan få tag på Sara?",
                img: "player.jpg"
            },
            {
                speaker: "Lisa",
                line: "Jaa, hon jobbar ju på kyrkogården, så där är hon nog!",
                img: "lisa.jpg"
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
                        name: "En rosa skåpbil",
                        description: "Zlatan sågs senast bli ivägkörd i en rosa skåpbil. Göran tog bild.",
                        location: "Slottsparken",
                        img: "zlatan_van.jpg"
                    },
                    {
                        name: "En använd spruta",
                        description: "En använd tom spruta hittades bredvid en buske.",
                        location: "Slottsparken",
                        img: "suringe.png"
                    },
                    {
                        name: "Göran misstänker Sara",
                        description: "Göran har misstankar om att det är Sara (Zlatans ex) som har kidnappat Zlatan.",
                        location: "Slottsparken"
                    }
                ],
            suspects:
                [
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
        location: "Gamla Kyrkogården",
        lat: 55.601726,
        lon: 12.997218,
        dialogueBG: "../images/dialogue/kyrkogarden.jpg",
        dialogueBefore: [
            {
                speaker: "Player",
                line: "Hej Sara. Jag är här för att ställa lite frågor om Zlatan som blev kidnappad igårkväll. Jag undrar om du vet något om saken?",
                img: "player.jpg"
            },
            {
                speaker: "Sara",
                line: "Jaha. Jag bryr mig inte om vad som hänt med den hjärtlösa mannen.",
                img: "sara.jpg"
            },
            {
                speaker: "Player",
                line: "Jag har uppgifter om att du och Zlatan bråkade igår, vad handlade det om?",
                img: "player.jpg"
            },
            {
                speaker: "Sara",
                line: "Det har du ingenting med att göra.",
                img: "sara.jpg"
            },
            {
                speaker: "Player",
                line: "Zlatans nära vän Göran misstänker att du kan ha något att göra med hans försvinnande. Att du brukar befinna dig utanför hans hus, vad säger du om det?",
            },
            {
                speaker: "Sara",
                line: "Göran? Zlatan har ingen nära vän som heter Göran. Hur som helst har jag ingenting att göra med hans försvinnande. Absolut att jag brukar befinna mig utanför hans hus, men det är för att jag vill se om han är hemma. Jag har i alla fall alibi för igårkväll, jag drack nämligen vin med min vän Eva.",
                img: "sara.jpg"
            },
            {
                speaker: "Player",
                line: "Något av värde måste du väl veta?",
                img: "player.jpg"
            },
            {
                speaker: "Sara",
                line: "Okej fine, jag vet en sak. Om du klarar mitt pussel lovar jag att berätta.",
                img: "sara.jpg"
            }
        ],
        dialogueAfter: [
            {
                speaker: "Sara",
                line: "Nöjd nu? Snälla lämna mig åt mitt arbete och gå härifrån.",
                img: "sara.jpg"
            },
        ],
        minigame: render_puzzle,
        phoneData: [
            {
                name: "SHERLOCK",
                img: "sherlock.jpg",
                messages: [
                    {
                        message: "Min kära vän. Tack för att du tar dig an utmaningen nu när jag och Watson är på semester.",
                        state: "Gammalt"
                    },
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
                        message: "Läget? Jag råkar veta att Zlatans bästa vän heter Stefan.",
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
                        name: "En rosa skåpbil",
                        description: "Zlatan sågs senast bli ivägkörd i en rosa skåpbil. Göran tog bild.",
                        location: "Slottsparken",
                        img: "zlatan_van.jpg"
                    },
                    {
                        name: "En använd spruta",
                        description: "En använd tom spruta hittades bredvid en buske.",
                        location: "Slottsparken",
                        img: "suringe.png"
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
            suspects:
                [
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
        location: null, //John ringer,
        dialogueBG: "../images/dialogue/vacation.jpg",
        dialogueBefore: [
            {
                speaker: "John Watson",
                line: "Läget? Jag lyckades hitta Stefans nummer men han svarar inte. Testa du att ringa...",
                img: "john.jpg"
            },
            {
                speaker: "Player",
                line: "Tack John! Jag slår en signal till honom.",
                img: "player.jpg"
            },
            {
                speaker: "John Watson",
                line: "Inga problem, ha det bäst.",
                img: "john.jpg"
            },
            {
                speaker: "Player",
                line: "*KNAPPANDE PÅ TELEFONEN*",
                img: "player.jpg"
            },
            {
                speaker: "Player",
                line: "*BEEP BEEP BEEP*",
                img: "player.jpg"
            },
            {
                speaker: "Player",
                line: "*INGET SVAR*",
                img: "player.jpg"
            },
            {
                speaker: "Player",
                line: "Hmmm inget svar... ska se om jag kan hitta lite information på internet...",
                img: "player.jpg"
            }
        ],
        dialogueAfter: [
            {
                speaker: "Player",
                line: "Okej, det verkar som att Stefan brukar hänga på Epicuré vid Gustav Adolfs Torg. Jag beger mig dit.",
                img: "player.jpg"
            }
        ],
        dialogueBG: "john.jpg",
        minigame: render_memory_game,
        phoneData: [
            {
                name: "SHERLOCK",
                img: "sherlock.jpg",
                messages: [
                    {
                        message: "Min kära vän. Tack för att du tar dig an utmaningen nu när jag och Watson är på semester.",
                        state: "Gammalt"
                    },
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
                        message: "Läget? Jag råkar veta att Zlatans bästa vän heter Stefan.",
                        state: "Gammalt"
                    },
                    {
                        message: "Dessutom så känner Sara Stefan sedan tidigare. Det kanske är värt att prata med grabben. Jag ska hitta hans nummer, jag återkommer!",
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
                        name: "En rosa skåpbil",
                        description: "Zlatan sågs senast bli ivägkörd i en rosa skåpbil. Göran tog bild.",
                        location: "Slottsparken",
                        img: "zlatan_van.jpg"
                    },
                    {
                        name: "En använd spruta",
                        description: "En använd tom spruta hittades bredvid en buske.",
                        location: "Slottsparken",
                        img: "suringe.png"
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
                    {
                        name: "Hund",
                        description: "En bild på Saras hund.",
                        location: "Gamla Kyrkogården",
                        img: "dog.jpg"
                    },
                ],
            suspects:
                [
                    {
                        name: "Göran",
                        description: "Svettig, kunnig om Zlatan, lite för kunnig... påstår han är fotograf. Är Göran gärningsmannen?",
                        location: "Slottsparken",
                        img: "göran.jpg"
                    },
                    {
                        name: "Sara",
                        description: "Zlatans ex. En kvinna med attityd. Verkar ha något emot Zlatan. Är hon skyldig?",
                        location: "Gamla Kyrkogården",
                        img: "sara.jpg"
                    }
                ]
        },
    },
    {
        location: "epicure",
        lat: 55.603181,
        lon: 12.999978,
        dialogueBG: "../images/dialogue/epicure.jpg",
        dialogueAfter: [
            {
                speaker: "Player",
                line: "Hej, är det du som är Eva?",
                img: "player.jpg"
            },
            {
                speaker: "Eva",
                line: "Ja och du är?",
                img: "eva.jpg"
            },
            {
                speaker: "Player",
                line: "Jag är här för att prata med dig om Zlatans plötsliga försvinnande.",
                img: "player.jpg"
            },
            {
                speaker: "Eva",
                line: "Ursäkta!!?? Vad är det du säger??",
                img: "eva.jpg"
            },
            {
                speaker: "Player",
                line: "Har du inte hört om att han blev kidnappad igårkväll?",
                img: "player.jpg"
            },
            {
                speaker: "Eva",
                line: "Nej, det har jag verkligen inte hört, men i dagens inflation och med rikedomen han besitter så är det inte svårt att förstå kidnapparen. Vi alla gör vad som behövs för att överleva. Vet Helena om detta?",
                img: "eva.jpg"
            },
            {
                speaker: "Player",
                line: "Ja det är hon som anmält honom försvunnen. Du är alltså fru till Stefan?",
                img: "player.jpg"
            },
            {
                speaker: "Eva",
                line: "Ja det är jag.. Vadå tror du att det är Stefan som gjort det!? Han tjänar trots allt sina egna pengar till vårt hushåll, synd att han är så snål mot mig bara. Han kan inte ens köpa mig en handväska från Chanel, men hans spelberoende är det tydligen inga problem att kasta pengar på. Tack och lov att Malmös Casino har stängt.",
                img: "eva.jpg"
            },
            {
                speaker: "Player",
                line: "Jobbar inte du",
                img: "player.jpg"
            },
            {
                speaker: "Eva",
                line: "Jag är utbildad sommelier men jag skulle aldrig slösa bort mitt liv på att arbeta, har varit hemmafru sedan flera år tillbaka och jag älskar det!",
                img: "eva.jpg"
            },
            {
                speaker: "Player",
                line: "Okej, just nu försöker jag bara undersöka alla spår. Stefan är okontaktbar, vet du var han befinner sig?",
                img: "player.jpg"
            },
            {
                speaker: "Eva",
                line: "Åh du missade honom precis, igår på kvällen åkte han på jobbresa till Las Vegas. Var snäll att inte stör honom.",
                img: "eva.jpg"
            },
            {
                speaker: "Player",
                line: "Varför skulle jag inte störa honom? Vet du något som du inte berättar, isåfall kan du bli misstänkt för medhjälp till kidnappning.",
                img: "player.jpg"
            },
            {
                speaker: "Eva",
                line: "Du är inte lite fräcka du!! Passa dig asså, du ska inte kontakta honom därför att han är iväg på ett viktigt jobbmöte i Las Vegas som kommer göra oss rika. Han har jobbat på detta projektet länge och varit mycket stressad.",
                img: "eva.jpg"
            },
            {
                speaker: "Player",
                line: "Vadå för jobbprojekt?",
                img: "player.jpg"
            },
            {
                speaker: "Eva",
                line: "Det har han sagt är hemligt. Jag förstår mig inte riktigt på finans men jag är stolt över hur hårt han arbetar.",
                img: "eva.jpg"
            },
            {
                speaker: "Player",
                line: "Okej. Stämmer det däremot att du och Sara drack vin igårkväll?",
                img: "player.jpg"
            },
            {
                speaker: "Eva",
                line: "Ja det stämmer, vi umgicks hela kvällen! Älskar mina vinkvällar med Sara. Stefan dricker nämligen inte vin med mig. Det är inte bra för hans diabetes vet du.",
                img: "eva.jpg"
            },
            {
                speaker: "Player",
                line: "Okej, då vet jag! Tack för att du tog dig tid, tack för all hjälp!",
                img: "player.jpg"
            },
            {
                speaker: "Eva",
                line: "Vänta!! Innan du går kom jag och tänka på en sak, har du varit i kyrkan?",
                img: "eva.jpg"
            },
            {
                speaker: "Player",
                line: "Kyrkan? Varför frågar du?",
                img: "player.jpg"
            },
            {
                speaker: "Eva",
                line: "Men gud vet du ingenting? St. Petri kyrkan är Zlatans safe place, även om han inte är särskilt religiös så brukar han säga att det är den bästa platsen för ro.",
                img: "eva.jpg"
            },
            {
                speaker: "Player",
                line: "Okej, tack för infon! Jag får bege mig dit och prata med någon som jobbar där.",
                img: "player.jpg"
            },
        ],
        phoneData: [
            {
                name: "SHERLOCK",
                img: "sherlock.jpg",
                messages: [
                    {
                        message: "Min kära vän. Tack för att du tar dig an utmaningen nu när jag och Watson är på semester.",
                        state: "Gammalt"
                    },
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
                        message: "Läget? Jag råkar veta att Zlatans bästa vän heter Stefan.",
                        state: "Gammalt"
                    },
                    {
                        message: "Dessutom så känner Sara Stefan sedan tidigare. Det kanske är värt att prata med grabben. Jag ska hitta hans nummer, jag återkommer!",
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
                        name: "En rosa skåpbil",
                        description: "Zlatan sågs senast bli ivägkörd i en rosa skåpbil. Göran tog bild.",
                        location: "Slottsparken",
                        img: "zlatan_van.jpg"
                    },
                    {
                        name: "En använd spruta",
                        description: "En använd tom spruta hittades bredvid en buske.",
                        location: "Slottsparken",
                        img: "suringe.png"
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
                    {
                        name: "Hund",
                        description: "En bild på Saras hund.",
                        location: "Gamla Kyrkogården",
                        img: "dog.jpg"
                    },
                ],
            suspects:
                [
                    {
                        name: "Göran",
                        description: "Svettig, kunnig om Zlatan, lite för kunnig... påstår han är fotograf. Är Göran gärningsmannen?",
                        location: "Slottsparken",
                        img: "göran.jpg"
                    },
                    {
                        name: "Sara",
                        description: "Zlatans ex. En kvinna med attityd. Verkar ha något emot Zlatan. Är hon skyldig?",
                        location: "Gamla Kyrkogården",
                        img: "sara.jpg"
                    }
                ]
        },
    },
    {
        location: null,
        dialogueBG: "../images/dialogue/epicure.jpg",
        dialogueAfter: [
            {
                speaker: "Helena",
                line: "*RING RING RING*",
                img: "helena.jpg"
            },
            {
                speaker: "Helena",
                line: "Har ni hittat Zlatan än?! Hur går det för er? Saknar honom så mycket... Jag är på väg till gymmet, kan ni möta mig där?",
                img: "helena.jpg"
            },
            {
                speaker: "Player",
                line: "Hej Helena! Tyvärr har vi inte hittat honom än... Vi möts vid gymmet!",
                img: "player.jpg"
            },
        ],
        phoneData: [
            {
                name: "SHERLOCK",
                img: "sherlock.jpg",
                messages: [
                    {
                        message: "Min kära vän. Tack för att du tar dig an utmaningen nu när jag och Watson är på semester.",
                        state: "Gammalt"
                    },
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
                        message: "Läget? Jag råkar veta att Zlatans bästa vän heter Stefan.",
                        state: "Gammalt"
                    },
                    {
                        message: "Dessutom så känner Sara Stefan sedan tidigare. Det kanske är värt att prata med grabben. Jag ska hitta hans nummer, jag återkommer!",
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
                        name: "En rosa skåpbil",
                        description: "Zlatan sågs senast bli ivägkörd i en rosa skåpbil. Göran tog bild.",
                        location: "Slottsparken",
                        img: "zlatan_van.jpg"
                    },
                    {
                        name: "En använd spruta",
                        description: "En använd tom spruta hittades bredvid en buske.",
                        location: "Slottsparken",
                        img: "suringe.png"
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
                    {
                        name: "Hund",
                        description: "En bild på Saras hund.",
                        location: "Gamla Kyrkogården",
                        img: "dog.jpg"
                    },
                    {
                        name: "Stefan är i Las Vegas",
                        description: "Enligt Stefans fru, Eva, så är Stefan på ett hemligt jobbmöte i Las Vegas.",
                        location: "Epicuré"
                    },
                ],
            suspects:
                [
                    {
                        name: "Göran",
                        description: "Svettig, kunnig om Zlatan, lite för kunnig... påstår han är fotograf. Är Göran gärningsmannen?",
                        location: "Slottsparken",
                        img: "göran.jpg"
                    },
                    {
                        name: "Sara",
                        description: "Zlatans ex. En kvinna med attityd. Verkar ha något emot Zlatan. Är hon skyldig?",
                        location: "Gamla Kyrkogården",
                        img: "sara.jpg"
                    },
                    {
                        name: "Eva",
                        description: "Helenas bästa vän. Drack vin med Sara kvällen då Zlatan försvann.",
                        location: "Epicuré",
                        img: "eva.jpg"
                    },
                    {
                        name: "Stefan",
                        description: "Evas man, Zlatans bästa kompis, hemlighetsfull och svår att få tag i. Eva nämnde också att han har diabetes. Hmmm...",
                        location: "Epicuré",
                        img: "stefan.jpg"
                    }
                ]
        },
    },
    {
        location: "NW",
        lat: 55.605162,
        lon: 13.007086,
        dialogueBG: "../images/dialogue/nw.jpg",
        dialogueBefore: [
            {
                speaker: "Player",
                line: "Hej Helena. Hur är det med dig?",
                img: "player.jpg"
            },
            {
                speaker: "Helena",
                line: "Jag har inte sovit på hela natten, tänkte träna lite för att rensa hjärnan. Hur går det för dig, vem misstänker du i nuläget?",
                img: "helena.jpg"
            },
        ],
        dialogueAfter: "",
        minigame: choose_sus,
        phoneData: [
            {
                name: "SHERLOCK",
                img: "sherlock.jpg",
                messages: [
                    {
                        message: "Min kära vän. Tack för att du tar dig an utmaningen nu när jag och Watson är på semester.",
                        state: "Gammalt"
                    },
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
                        message: "Läget? Jag råkar veta att Zlatans bästa vän heter Stefan.",
                        state: "Gammalt"
                    },
                    {
                        message: "Dessutom så känner Sara Stefan sedan tidigare. Det kanske är värt att prata med grabben. Jag ska hitta hans nummer, jag återkommer!",
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
                        name: "En rosa skåpbil",
                        description: "Zlatan sågs senast bli ivägkörd i en rosa skåpbil. Göran tog bild.",
                        location: "Slottsparken",
                        img: "zlatan_van.jpg"
                    },
                    {
                        name: "En använd spruta",
                        description: "En använd tom spruta hittades bredvid en buske.",
                        location: "Slottsparken",
                        img: "suringe.png"
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
                    {
                        name: "Hund",
                        description: "En bild på Saras hund.",
                        location: "Gamla Kyrkogården",
                        img: "dog.jpg"
                    },
                    {
                        name: "Stefan är i Las Vegas",
                        description: "Enligt Stefans fru, Eva, så är Stefan på ett hemligt jobbmöte i Las Vegas.",
                        location: "Epicuré"
                    },
                ],
            suspects:
                [
                    {
                        name: "Göran",
                        description: "Svettig, kunnig om Zlatan, lite för kunnig... påstår han är fotograf. Är Göran gärningsmannen?",
                        location: "Slottsparken",
                        img: "göran.jpg"
                    },
                    {
                        name: "Sara",
                        description: "Zlatans ex. En kvinna med attityd. Verkar ha något emot Zlatan. Är hon skyldig?",
                        location: "Gamla Kyrkogården",
                        img: "sara.jpg"
                    },
                    {
                        name: "Eva",
                        description: "Helenas bästa vän. Drack vin med Sara kvällen då Zlatan försvann.",
                        location: "Epicuré",
                        img: "eva.jpg"
                    },
                    {
                        name: "Stefan",
                        description: "Evas man, Zlatans bästa kompis, hemlighetsfull och svår att få tag i. Eva nämnde också att han har diabetes. Hmmm...",
                        location: "Epicuré",
                        img: "stefan.jpg"
                    }
                ]
        },
    },
    {
        location: "St Petri Kyrka",
        lat: 55.606933,
        lon: 13.002585,
        dialogueBG: "../images/dialogue/kyrkan.jpg",
        dialogueAfter: [
            {
                speaker: "Pastor Emma",
                line: "Hej, vad kan jag hjälpa dig med?",
                img: "emma.jpg"
            },
            {
                speaker: "Player",
                line: "Hej! Jag försöker hitta kiddnapparen till Zlatan då han försvann igårkväll. Jag har fått ett tips om att han har varit här rätt ofta.",
                img: "player.jpg"
            },
            {
                speaker: "Pastor Emma",
                line: "Så hemskt att han har blivit kidnappad, må gud vägleda er.",
                img: "emma.jpg"
            },
            {
                speaker: "Player",
                line: "Minns du när Zlatan var här senast?",
                img: "player.jpg"
            },
            {
                speaker: "Pastor Emma",
                line: "Igår förmiddag, han var här med sin bästa vän för att stämma av det sista inför bröllopet.",
                img: "emma.jpg"
            },
            {
                speaker: "Player",
                line: "Bröllopet??",
                img: "player.jpg"
            },
            {
                speaker: "Pastor Emma",
                line: "Ja, Zlatan och Helena ska gifta sig här om en månad. Hoppas du hittar honom vid liv.",
                img: "emma.jpg"
            },
            {
                speaker: "Player",
                line: "Helena har inte nämnt något om ett bröllop…",
                img: "player.jpg"
            },
            {
                speaker: "Pastor Emma",
                line: "Nä det kanske inte är betydelsefullt för kidnappningen, de har trots allt varit väldigt hemlighetsfulla med bröllopet för att media inte ska få reda på det. Så håll den informationen för dig själv.",
                img: "emma.jpg"
            },
            {
                speaker: "Player",
                line: "Jag förstår... Hur länge var Zlatan och Stefan här igår?",
                img: "player.jpg"
            },
            {
                speaker: "Pastor Emma",
                line: "De begav sig runt 13-tiden, de nämnde inget om vad de skulle göra efteråt.",
                img: "emma.jpg"
            },
            {
                speaker: "Player",
                line: "Var det något du märkte av igår som kändes konstigt, både med Zlatan och hans bästa vän?",
                img: "player.jpg"
            },
            {
                speaker: "Pastor Emma",
                line: "Nää, däremot så var det många samtal som Stefan tog i sin telefon, han kändes inte helt närvarande. Zlatan blev lite irriterad tillslut.",
                img: "emma.jpg"
            },
            {
                speaker: "Player",
                line: "Okej, tack för all hjälp!",
                img: "player.jpg"
            },
        ],
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
                        message: "Läget? Jag råkar veta att Zlatans bästa vän heter Stefan.",
                        state: "Gammalt"
                    },
                    {
                        message: "Dessutom så känner Sara Stefan sedan tidigare. Det kanske är värt att prata med grabben. Jag ska hitta hans nummer, jag återkommer!",
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
                        name: "En rosa skåpbil",
                        description: "Zlatan sågs senast bli ivägkörd i en rosa skåpbil. Göran tog bild.",
                        location: "Slottsparken",
                        img: "zlatan_van.jpg"
                    },
                    {
                        name: "En använd spruta",
                        description: "En använd tom spruta hittades bredvid en buske.",
                        location: "Slottsparken",
                        img: "suringe.png"
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
                    {
                        name: "Hund",
                        description: "En bild på Saras hund.",
                        location: "Gamla Kyrkogården",
                        img: "dog.jpg"
                    },
                    {
                        name: "Stefan är i Las Vegas",
                        description: "Enligt Stefans fru, Eva, så är Stefan på ett hemligt jobbmöte i Las Vegas.",
                        location: "Epicuré"
                    },
                ],
            suspects:
                [
                    {
                        name: "Göran",
                        description: "Svettig, kunnig om Zlatan, lite för kunnig... påstår han är fotograf. Är Göran gärningsmannen?",
                        location: "Slottsparken",
                        img: "göran.jpg"
                    },
                    {
                        name: "Sara",
                        description: "Zlatans ex. En kvinna med attityd. Verkar ha något emot Zlatan. Är hon skyldig?",
                        location: "Gamla Kyrkogården",
                        img: "sara.jpg"
                    },
                    {
                        name: "Eva",
                        description: "Helenas bästa vän. Drack vin med Sara kvällen då Zlatan försvann.",
                        location: "Epicuré",
                        img: "eva.jpg"
                    },
                    {
                        name: "Stefan",
                        description: "Evas man, Zlatans bästa kompis, hemlighetsfull och svår att få tag i. Eva nämnde också att han har diabetes. Hmmm...",
                        location: "Epicuré",
                        img: "stefan.jpg"
                    }
                ]
        },
    },
    {
        location: "Malmö Hovrätt",
        lat: 55.606969,
        lon: 12.991199,
        dialogueBG: "../images/dialogue/hovratt.jpg",
        dialogueBefore: [
            {
                speaker: "Kommissarie Lestrade",
                line: "Hej! Hoppas det har gått bra för dig! Vill du vänligen berätta vem de är som har kidnappat Zlatan så vi kan gripa den misstänkta och förhoppningsvis få hem honom?",
                img: "lestrade.jpg"
            },
            {
                speaker: "Player",
                line: "Jag tror att det är...",
                img: "player.jpg"
            }
        ],
        dialogueAfter: "",
        minigame: choose_sus,
        phoneData: [
            {
                name: "SHERLOCK",
                img: "sherlock.jpg",
                messages: [
                    {
                        message: "Min kära vän. Tack för att du tar dig an utmaningen nu när jag och Watson är på semester.",
                        state: "Gammalt"
                    },
                    {
                        message: "Hej! Kommissarie Lestrade som jag tidigare arbetat med har nu tagit sig till Malmö för att möta upp dig. Ta dig till Malmö Hovrätt. Möt honom där och berätta vem du misstänker har kidnappat Zlatan.",
                        state: "Nytt"
                    },
                    {
                        message: "Lestrade kommer direkt att låsa in personen så hoppas att du har löst fallet!",
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
                        state: "Gammalt"
                    },
                    {
                        message: "Läget? Jag råkar veta att Zlatans bästa vän heter Stefan.",
                        state: "Gammalt"
                    },
                    {
                        message: "Dessutom så känner Sara Stefan sedan tidigare. Det kanske är värt att prata med grabben. Jag ska hitta hans nummer, jag återkommer!",
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
                        name: "En rosa skåpbil",
                        description: "Zlatan sågs senast bli ivägkörd i en rosa skåpbil. Göran tog bild.",
                        location: "Slottsparken",
                        img: "zlatan_van.jpg"
                    },
                    {
                        name: "En använd spruta",
                        description: "En använd tom spruta hittades bredvid en buske.",
                        location: "Slottsparken",
                        img: "suringe.png"
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
                    {
                        name: "Hund",
                        description: "En bild på Saras hund.",
                        location: "Gamla Kyrkogården",
                        img: "dog.jpg"
                    },
                    {
                        name: "Stefan är i Las Vegas",
                        description: "Enligt Stefans fru, Eva, så är Stefan på ett hemligt jobbmöte i Las Vegas.",
                        location: "Epicuré"
                    },
                    {
                        name: "Bröllop",
                        description: "Enligt prästen så ska Zlatan och Helena gifta sig om en månad...",
                        location: "St Petri Kyrka"
                    }
                ],
            suspects:
                [
                    {
                        name: "Göran",
                        description: "Svettig, kunnig om Zlatan, lite för kunnig... påstår han är fotograf. Är Göran gärningsmannen?",
                        location: "Slottsparken",
                        img: "göran.jpg"
                    },
                    {
                        name: "Sara",
                        description: "Zlatans ex. En kvinna med attityd. Verkar ha något emot Zlatan. Är hon skyldig?",
                        location: "Gamla Kyrkogården",
                        img: "sara.jpg"
                    },
                    {
                        name: "Eva",
                        description: "Helenas bästa vän. Drack vin med Sara kvällen då Zlatan försvann.",
                        location: "Epicuré",
                        img: "eva.jpg"
                    },
                    {
                        name: "Stefan",
                        description: "Evas man, Zlatans bästa kompis, hemlighetsfull och svår att få tag i. Eva nämnde också att han har diabetes. Hmmm...",
                        location: "Epicuré",
                        img: "stefan.jpg"
                    }
                ]
        },
    }
]

const imageURLs = [
    "../images/back.png",
    "../images/close.png",
    "../images/deerhatIcon.png",
    "../images/dog.jpg",
    "../images/emma.jpg",
    "../images/eva.jpg",
    "../images/göran.jpg",
    "../images/helena.jpg",
    "../images/helpIcon.png",
    "../images/john.jpg",
    "../images/left-arrow-disabled.png",
    "../images/left-arrow.png",
    "../images/lestrade.jpg",
    "../images/lisa.jpg",
    "../images/location.png",
    "../images/locationMarker.png",
    "../images/lockLocked.png",
    "../images/lockUnlocked.png",
    "../images/magnifyingIcon.png",
    "../images/notebook_top.png",
    "../images/notebook.png",
    "../images/notice.png",
    "../images/phone.png",
    "../images/right-arrow-disabled.png",
    "../images/right-arrow.png",
    "../images/sara.jpg",
    "../images/sherlock.jpg",
    "../images/stefan.jpg",
    "../images/suringe.png",
    "../images/test_park.jpg",
    "../images/vacation.jpg",
    "../images/wordleright.png",
    "../images/wordlenothing.png",
    "../images/wordlewrong.png",
    "../images/zlatan_in_vegas.jpg",
    "../images/zlatan_persued.jpg",
    "../images/zlatan_van.jpg"
]