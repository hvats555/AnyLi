let express = require("express"),
    passport = require("passport"),
    router  = express.Router();

// Daabase models
let Devices = require("../models/devices"),
    User    = require("../models/users");

router.get("/", (req, res) => {
    res.redirect("/devices");
});

// showing the login form page
router.get("/login", (req, res) => {
    res.render("../views/index/login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect : "/devices",
        failureRedirect : "/login",
        //failureFlash : true
}), (req, res) => {});

// showing the register form page
router.get("/register", (req, res) =>{
   res.render("../views/index/register");
});

// Saving new user to database
router.post("/register", (req, res)=>{
   let newUser = new User({
       name: req.body.name,
       email: req.body.email,
       username: req.body.username
       });
   User.register(newUser, req.body.password, (err, user) => {
       if(err){
           console.log(err);
       }
       passport.authenticate("local")(req, req, () => {
          res.redirect("/devices");
       });
   })
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

module.exports = router;


