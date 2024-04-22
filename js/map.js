function renderMap() {

    function coords() {
        navigator.geolocation.getCurrentPosition(
            show_posistion,
            null,
            {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            }
        )
    };

    function show_posistion(position) {

        function check_collision(current_circle) {

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
                alert()
            }
        }

        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;

        var map = L.map('map').setView([latitude, longitude], 13);

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


        //55.602451, 12.98938
        var park_circle = L.circle([55.602451, 12.98938], {
            color: 'green',
            fillColor: 'lime',
            fillOpacity: 0.5,
            radius: 300
        }).addTo(map);

        var popup = L.popup();
        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("You clicked the map at " + e.latlng.toString())
                .openOn(map);
        }

        map.on('click', onMapClick);

        const collisionInterval = setInterval(check_collision, 1000)

        navigator.geolocation.watchPosition(update_player_location);

        function update_player_location(position) {
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
    }

    coords();

}
