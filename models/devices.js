let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let DeviceSchema = new mongoose.Schema({
    name : String,
    status : {type : Boolean, default: false},
    createdAt: {type : Date, default: Date.now},

    user : {
        id:{
            type : mongoose.Schema.Types.ObjectID,
            ref : "User"
        },
        username : String,
        name : String,
        email : String
    }
});

DeviceSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Devices", DeviceSchema);