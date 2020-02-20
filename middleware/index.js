let Devices = require("../models/devices"),
    User    = require("../models/users");

module.exports = {
    isLoggedIn : (req, res, next) => {
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    }
};

