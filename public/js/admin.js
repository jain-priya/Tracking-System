function empLocation(name, lat, long, date) {
    this.name = name;
    this.lat = lat;
    this.long = long;
    this.date = date;
}

var addLocations = {
    employeeList: [],
    addEmployeeLocation(name, lat, long, time) {
        var emp = new empLocation(name, lat, long, date);
        this.employeeList.push(emp);
    }
}


