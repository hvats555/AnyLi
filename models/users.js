var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

let UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    username : {type: String, unique:true, sparse:true},
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);