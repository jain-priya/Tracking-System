function Location() {
    socket = io.connect('http://localhost:3000');
    d = document.getElementById("employeePosition");
    emp = document.getElementById("empname");
    socket.on('message', function (data) {
        /* if (data.lat) {*/
        console.log("Data recieved " + data.lat + " " + data.name + " " + data.date);
        ename = data.name;
        date = data.date;
        lat = data.lat;
        long = data.long;
        addLocations.addEmployeeLocation(ename, lat, long, date);
        emp.innerHTML = "Employee is : " + ename;
        myMap(lat, long);
        /*} else {
            d.innerHTML = "There is a problem";
        }*/
    });

}

function myMap(lat, long) {
    console.log("inside myMap " + lat + " " + long);
    var mapProp = {
        center: new google.maps.LatLng(lat, long),
        zoom: 12
    };
    var map = new google.maps.Map(document.getElementById("employeePosition"), mapProp);
    var marker = new google.maps.Marker({
        position: mapProp.center
    });
    marker.setMap(map);
}
