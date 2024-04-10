// TODO:
// Startup/Startpage
// Map function
// Minigames:
//      Wordle Ossian
//      Memory Isak
//      Maze vi får se
//      Puzzle Ossian
//      Quiz Isak
// Dialogue function
// Dialogue array
// Clues & Suspects page
// Phone page
// Guess the villain

navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.longitude);
    console.log(position.coords.latitude);
});
coords();

function coords () {
    navigator.geolocation.getCurrentPosition(
        show_posistion,
        null,
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
)};

function show_posistion(position) {
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
        radius: 150
    }).addTo(map);

    var park_circle = L.circle([55.602451, 12.98938], {
        color: 'green',
        fillColor: 'lime',
        fillOpacity: 0.5,
        radius: 350
    }).addTo(map);

    var popup = L.popup();
    function onMapClick(e) {
        popup
            .setLatLng(e.latlng)
            .setContent("You clicked the map at " + e.latlng.toString())
            .openOn(map);
    }

    map.on('click', onMapClick);

    check_collision();

    function check_collision() {
        let x_player = player_circle._path.getBoundingClientRect().x;
        let y_player = player_circle._path.getBoundingClientRect().y;
        let width_player = player_circle._path.getBoundingClientRect().width;
        let height_player = player_circle._path.getBoundingClientRect().height;
        let right_player = player_circle._path.getBoundingClientRect().right;
        let bottom_player = player_circle._path.getBoundingClientRect().bottom;

        let x_park = park_circle._path.getBoundingClientRect().x;
        let y_park = park_circle._path.getBoundingClientRect().y;
        let width_park = park_circle._path.getBoundingClientRect().width;
        let height_park = park_circle._path.getBoundingClientRect().height;
        let right_park = park_circle._path.getBoundingClientRect().right;
        let bottom_park = park_circle._path.getBoundingClientRect().bottom;

        let bottomInside = false;
        let topInside = false;
        let rightInside = false;
        let leftInside = false;

        if(bottom_player > y_park && bottom_player < bottom_park){
            bottomInside = true;
            console.log(bottomInside)
        }
        if(x_player < right_park && x_player > x_park){
            leftInside = true
            console.log(leftInside)
        }
        if(y_player > y_park && bottom_player > bottom_park){
            topInside = true
            console.log(topInside)
        }
        if(right_player < right_park && right_player > x_park){
            rightInside = true
            console.log(rightInside)
        }
    }

    navigator.geolocation.watchPosition(update_player_location);
    
    function update_player_location(position) {
        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;

        player_circle.remove();

        player_circle = L.circle([latitude, longitude], {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5,
            radius: 150
        }).addTo(map);

        check_collision();
    }
}

wordle();