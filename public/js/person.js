function empLocation(userid, lat, long, date) {
    this.userid = userid;
    this.lat = lat;
    this.long = long;
    this.date = date;
}

var addLocations = {
    employeeList: [],
    addEmployeeLocation(userid, lat, long, time) {
        var emp = new empLocation(userid, lat, long, date);
        this.employeeList.push(emp);
        return emp;
    }
}
