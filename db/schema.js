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
        long: String,
        date1: Date
    }]
});
var UserSchema = mongoose.model("users", User);

module.exports = UserSchema;
