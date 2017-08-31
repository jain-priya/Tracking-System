 window.addEventListener("load", init);

 function init() {
     socket = io.connect('http://localhost:3000');
     var t = document.getElementById("track");

     t.addEventListener("click", track);
 }

 function track() {
     console.log("Inside Track");
     x = document.getElementById("demo");
     if (navigator.geolocation) {
         console.log("geolocation");
         navigator.geolocation.watchPosition(showposition);
     } else {
         x.innerHTML = "Geolocation failed";
     }

 }

 function showposition(position) {
     var empname = document.getElementById("ename").value;
     x.innerHTML = "Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude;
     console.log("Inside showposition" + position.coords.latitude + "name " + empname);
     socket.emit('latlong', {
         name: empname,
         lat: position.coords.latitude,
         long: position.coords.longitude,
         date: new Date()
     });

 }
