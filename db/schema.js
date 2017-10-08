const mongoose = require("./connection");
mongoose.Promise = global.Promise;
var User = mongoose.Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    fname: String,
    lname: String,
    dob: Date,
    pwd: String,
    gender: String,
    location: [{
        lat: String,
        lng: String,
    }]
});
var UserSchema = mongoose.model("users", User);

module.exports = UserSchema;
