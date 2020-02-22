let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");

let DeviceSchema = new mongoose.Schema({
    connectionKey:{
        type : String,
        require : true
    },
    name : {
        type : String,
        require: true
    },
    status : {
        type : Boolean,
        require: true,
        default: false
    },
    createdAt: {
        type : Date,
        default: Date.now
    },

    user : {
        id:{
            type : mongoose.Schema.Types.ObjectID,
            ref : "User",
            require : true
        }
    }
});

DeviceSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Devices", DeviceSchema);