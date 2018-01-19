function track() {

    socket = io.connect();
    console.log("Inside Track");

    if (navigator.geolocation) {
        console.log("geolocation");
        navigator.geolocation.watchPosition(showposition, showError);
    } else {
        document.getElementById("demo").innerHTML = "Geolocation failed";
    }

}

function showposition(position) {
    var empname = document.getElementById("ename").value;
    console.log("Name: " + empname);
    document.getElementById("demo").innerHTML = "You are being tracked!";
    document.getElementById('myImage').src = '../assets/images/track4.png';
    console.log("Inside showposition" + position.coords.latitude + "name: " + empname);
    date = new Date();
    var empLoc = addLocations.addEmployeeLocation(empname, position.coords.latitude, position.coords.longitude, date);
    socket.emit('latlong', empLoc);
    console.log("To Insert in db");
    socket.emit("Inside db", empLoc);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}
