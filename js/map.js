let map;
let gameInfoRendered = false;
let watchID;
let current_circle;
let circle_marker;
let collisionInterval;
let currentLocation;
let playerCords;
let doneLocations = [];
let markerPlayer;

function renderMap(fly = true) {
    const helpButton = document.createElement("div");
    helpButton.classList.add("helpButton");
    helpButton.addEventListener("click", renderGameInfo);
    document.body.append(helpButton);

    const resetButton = document.createElement("div");
    resetButton.classList.add("resetButton");
    resetButton.addEventListener("click", e => {
        if (window.confirm("VARNING: Detta startar om spelet helt, vill du fortsätta?")) {
            window.localStorage.clear();
            location.reload();
        }
    })
    document.body.append(resetButton);

    if (!gameInfoRendered) {
        renderGameInfo();
    }

    if (!map) {
        map = L.map("map", { zoomControl: false });
        document.querySelector("#map > .leaflet-control-container").remove()

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            minZoom: 9,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        map.setView([55.608839, 12.99497], 13);
    }

    const storyIndex = JSON.parse(window.localStorage.getItem("storyIndex"));
    currentLocation = data[storyIndex];
    console.log(currentLocation);

    var locationIcon = L.icon({
        iconUrl: "./images/magnifyingIcon.png",
        iconSize: [50, 50]
    })

    var locationDoneIcon = L.icon({
        iconUrl: "./images/doneLocationIcon.png",
        iconSize: [40, 40]
    })

    if (currentLocation.location != null) {
        current_circle = createCurrentCircle();
        if (gameInfoRendered && fly) {
            map.flyTo([currentLocation.lat, currentLocation.lon], 17);

            if (playerCords) {
                setTimeout(function () {
                    map.flyTo([playerCords.lat, playerCords.lng], 17)
                }, 4000)
            }
        }
    }

    createDoneLocations();

    if (currentLocation.location == null) {
        setTimeout(function () {
            renderDialogue(true, false);
        }, 10000)
    }

    function createCurrentCircle() {
        const circle = L.circle([currentLocation.lat, currentLocation.lon], {
            stroke: false,
            color: 'black',
            fillColor: 'black',
            fillOpacity: 0.2,
            radius: 30,
            interactive: false
        }).addTo(map);

        circle_marker = L.marker([currentLocation.lat, currentLocation.lon], {
            icon: locationIcon
        }).addTo(map);

        circle_marker.on("click", function () {
            current_circle.remove();
            circle_marker.remove();
            if (markerPlayer) {
                markerPlayer.remove();
            }
            if (collisionInterval && watchID) {
                clearInterval(collisionInterval);
                navigator.geolocation.clearWatch(watchID)
            }
            renderDialogueUnlock(true);
        })

        return circle;
    }

    function createDoneLocations() {
        for (locationM of doneLocations) {
            locationM.remove()
        }

        for (let i = 0; i < storyIndex; i++) {
            const location = data[i];

            if (location.location != "intro" && location.location != null) {
                const doneMarker = L.marker([location.lat, location.lon], {
                    icon: locationDoneIcon
                }).addTo(map);

                var popup = L.popup();
                function onMarkerClick(e) {
                    popup
                        .setLatLng(e.latlng)
                        .setContent(location.location)
                        .openOn(map);
                }

                doneMarker.on('click', onMarkerClick);

                doneLocations.push(doneMarker);
            }
        }
    }

    function coords() {
        navigator.geolocation.getCurrentPosition(
            position => {
                show_position(position, fly)
            },
            null,
            {
                enableHighAccuracy: true,
                timeout: 200000,
                maximumAge: 0
            }
        )
    };

    coords();

}

function show_position(position, fly) {

    const storyIndex = parseInt(window.localStorage.getItem("storyIndex"));

    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;

    if (gameInfoRendered && storyIndex == 1 && fly) {
        setTimeout(function () {
            map.flyTo([latitude, longitude], 17);
        }, 4000)
    }

    var playerIcon = L.icon({
        iconUrl: "./images/deerhatIcon.png",
        iconSize: [50, 50]
    })

    var player_marker = L.marker([latitude, longitude], {
        icon: playerIcon
    }).addTo(map);

    playerCords = player_marker.getLatLng();

    watchID = navigator.geolocation.watchPosition(update_player_location);

    if (currentLocation.location != null) {
        const locationLat = currentLocation.lat;
        const locationLon = currentLocation.lon;
        const circleRadius = 0.0004;

        collisionInterval = setInterval(check_collision, 1000)

        function check_collision() {

            console.log("checking");

            const circleTop = locationLat + circleRadius;
            const circleRight = locationLon + circleRadius;
            const circleBottom = locationLat - circleRadius;
            const circleLeft = locationLon - circleRadius;

            const playerLocation = player_marker.getLatLng();
            const playerLat = playerLocation.lat;
            const playerLon = playerLocation.lng;

            let xInside = false;
            let yInside = false;

            if (playerLat < circleTop && playerLat > circleBottom) {
                yInside = true;
            }

            if (playerLon < circleRight && playerLat > circleLeft) {
                xInside = true;
            }

            if (xInside && yInside) {
                current_circle.remove();
                circle_marker.remove();
                player_marker.remove();
                clearInterval(collisionInterval);
                navigator.geolocation.clearWatch(watchID)
                renderDialogueUnlock();
            }
        }
    }

    function update_player_location(position) {
        console.log("watching");

        playerPosition = position;

        let updLongitude = position.coords.longitude;
        let updLatitude = position.coords.latitude;

        player_marker.remove()

        player_marker = L.marker([updLatitude, updLongitude], {
            icon: playerIcon
        }).addTo(map);

        markerPlayer = player_marker;

        const playerMarkerLatLon = player_marker.getLatLng();
        console.log(playerMarkerLatLon);

        var popup = L.popup();
        function onMarkerClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("Detta är du")
                .openOn(map);
        }

        player_marker.on('click', onMarkerClick);
    }



    // var popup = L.popup();
    // function onMapClick(e) {
    //     popup
    //         .setLatLng(e.latlng)
    //         .setContent("You clicked the map at " + e.latlng.toString())
    //         .openOn(map);
    // }

    // map.on('click', onMapClick);
}