let playerPosition;
let map;

function renderMap() {
    const storyIndex = JSON.parse(window.localStorage.getItem("storyIndex"));

    const helpButton = document.createElement("div");
    helpButton.classList.add("helpButton");

    helpButton.addEventListener("click", renderGameInfo);

    document.body.append(helpButton);

    if (storyIndex == 1) {
        renderGameInfo();
    }

    if (!map) {
        map = L.map("map", { zoomControl: false });
        document.querySelector("#map > .leaflet-control-container").remove()
    }

    if (!playerPosition) {
        function coords() {
            navigator.geolocation.getCurrentPosition(
                show_position,
                null,
                {
                    enableHighAccuracy: true,
                    timeout: 200000,
                    maximumAge: 0
                }
            )
        };

        coords();
    } else {
        show_position(playerPosition, false);
    }
}

function show_position(position, firstCall = true) {

    const storyIndex = JSON.parse(window.localStorage.getItem("storyIndex"));
    const currentLocation = data[storyIndex];
    console.log(currentLocation);

    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;

    map.setView([latitude, longitude], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var player_circle = L.circle([latitude, longitude], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 10
    }).addTo(map);

    if (currentLocation.location == null) {
        setTimeout(function () {
            renderDialogue(false, true);
        }, 10000)
    }

    if (currentLocation.location != null) {
        const current_circle = createCurrentCircle();

        const collisionInterval = setInterval(check_collision, 1000)

        function check_collision() {

            console.log("checking");

            let x_player = player_circle._path.getBoundingClientRect().x;
            let y_player = player_circle._path.getBoundingClientRect().y;
            let right_player = player_circle._path.getBoundingClientRect().right;
            let bottom_player = player_circle._path.getBoundingClientRect().bottom;

            let x_circle = current_circle._path.getBoundingClientRect().x;
            let y_circle = current_circle._path.getBoundingClientRect().y;
            let right_circle = current_circle._path.getBoundingClientRect().right;
            let bottom_circle = current_circle._path.getBoundingClientRect().bottom;

            let bottomInside = false;
            let topInside = false;
            let rightInside = false;
            let leftInside = false;

            if (bottom_player > y_circle && bottom_player < bottom_circle) {
                bottomInside = true;
                console.log(bottomInside)
            }
            if (x_player < right_circle && x_player > x_circle) {
                leftInside = true
                console.log(leftInside)
            }
            if (y_player > y_circle && y_player < bottom_circle) {
                topInside = true
                console.log(topInside)
            }
            if (right_player < right_circle && right_player > x_circle) {
                rightInside = true
                console.log(rightInside)
            }

            if (bottomInside && topInside && rightInside && leftInside) {
                current_circle.remove();
                clearInterval(collisionInterval);
                renderDialogueUnlock();
            }
        }

        function createCurrentCircle() {
            const circle = L.circle([currentLocation.lat, currentLocation.lon], {
                color: 'green',
                fillColor: 'lime',
                fillOpacity: 0.5,
                radius: 20
            }).addTo(map);

            return circle;
        }
    }

    if (firstCall) {
        navigator.geolocation.watchPosition(update_player_location);
    }

    function update_player_location(position) {
        console.log("watching");

        playerPosition = position;

        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;

        player_circle.remove();

        player_circle = L.circle([latitude, longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 10
        }).addTo(map);
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