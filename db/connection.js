const mongoose = require("mongoose");
const dbConfig = require("./config");
mongoose.connect(dbConfig.dbURL, {
    useMongoClient: true
});
module.exports = mongoose;
