var userSchema = require("./schema");
const path = require("path");


const UserOperations = {

    signUp: function (userObject, response) {

        var userSchObject = new userSchema({
            userid: userObject.userid,
            pwd: userObject.pwd,
            fname: userObject.fname,
            lname: userObject.lname,
            date: userObject.date,
            gender: userObject.gender
        });
        console.log("Inside CRUD SignIn");
        userSchObject.save(function (err, result) {
            console.log("Inside save function.....")
            if (err) {
                console.log(err);
                response.send("Error during Registration.....")
            } else {
                console.log(result);
                response.send("Registered Successfully")
            }
        });
    },
    signIn: function (userObject, request, response) {
        userSchema.find({
            userid: userObject.userid,
            pwd: userObject.pwd
        }, function (err, docs) {
            if (docs && docs.length > 0) {
                console.log(docs[0].userid);

                login(userObject, request, response);

            } else {
                response.send("Invalid User");
            }
        })
    },
    insert: function (positionObj) {
        userSchema.findOneAndUpdate({
            userid: positionObj.userid
        }, {
            $push: {
                location: [{
                    lat: positionObj.lat,
                    long: positionObj.long,
                    date1: positionObj.date
    }]
            }

        })
        console.log("updated")
    }
}

function login(userObject, request, response) {
    console.log("Inside login " + userObject.userid);
    /*request.session.uid = userObject.userid;*/
    var normalPath = path.normalize(__dirname + "/..");


    if (userObject.userid == "admin" && userObject.pwd == "admin") {
        var fullPath = path.join(normalPath, "/public/pages/adminScreen.html");
        response.sendFile(fullPath);
        console.log(fullPath);
    } else {
        var fullPath = path.join(normalPath, "/public/pages/empScreen.html");
        console.log(fullPath);
        response.sendFile(fullPath);
    }
}

function insertLoc(positionObj) {
    db.userSchema.update({
        userid: positionObj.userid
    }, {
        $push: {
            location: [{
                lat: positionObj.lat,
                long: positionObj.long,
                date1: positionObj.date
            }]
        }
    })
    console.log("Updated");
}
module.exports = UserOperations;
