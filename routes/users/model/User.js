const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({ // key values are case sensitive *String vs string
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    username: {
        type: String
    },
});

module.exports = mongoose.model("user", userSchema);

// this is a mongoDB object
//userSchema is a cookie cutter/template of what's required