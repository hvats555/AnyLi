var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    username : String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);