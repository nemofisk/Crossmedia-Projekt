navigator.geolocation.getCurrentPosition((position) => {
    console.log(position.coords.longitude);
    console.log(position.coords.latitude);
});

