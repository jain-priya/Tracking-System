function Location() {

    socket = io.connect();
    d = document.getElementById("employeePosition");
    emp = document.getElementById("empname");

    marker = [];
    empLocations = [];
    infowindow = [];
    var mapProp = {
        center: new google.maps.LatLng(28.7495, 77.0565),
        zoom: 10
    };
    map = new google.maps.Map(document.getElementById("employeePosition"), mapProp);

    socket.on("emp_Users", function (empUsers) {

        for (i = 0; i < empUsers.length; i++) {
            data_user = empUsers[i];
            console.log("Inside emp_users", +data_user.lat + " " + data_user.long);
            myMap(data_user.lat, data_user.long, data_user.userid);
        }
    });
}


function myMap(lat, long) {
    console.log("inside myMap " + lat + " " + long);

    marker[i] = new google.maps.Marker({
        position: new google.maps.LatLng(lat, long),
    });

    marker[i].setMap(map);
    console.log(data_user.userid);
    infowindow[i] = new google.maps.InfoWindow({
        content: data_user.userid
    });
    infowindow[i].open(map, marker[i]);

    google.maps.event.addListener(marker[i], 'click', function (e) {
        map.setZoom(19);
        map.setCenter(e.latLng);
        window.setTimeout(function () {
            map.setZoom(10);
        }, 4000);
    });

}
