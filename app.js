let express        = require('express'),
    bodyParser     = require('body-parser'),
    mongoose       = require("mongoose"),
    passport       = require("passport"),
    cookieParser   = require("cookie-parser"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    app            = express();

    require("dotenv").config();

// Required routes
let devices = require("./routes/devices"),
    index   = require("./routes/index"),
    api     = require("./routes/api");

// Database models

let User   = require("./models/users");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(cookieParser('secret'));

app.use(require("express-session")({
    secret : "Fuck schools",
    resave : false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next)=>{
   res.locals.currentUser = req.user;
   next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

let databaseURI = "mongodb://himalaya:hvats555@157.245.252.85:27017";

//const databaseURI = "mongodb+srv://himalayavats:hvats555@anyli-qnbkg.mongodb.net/AnyLi?retryWrites=true&w=majority";

mongoose.connect(databaseURI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false})
    .then(() => console.log(`Database connected`))
    .catch(err => console.log(`Database connection error: ${err.message}`));

// using routes
app.use("/", devices);
app.use("/", index);
app.use("/", api);

// running the server

//app.set('port', (process.env.PORT || 5000));

app.listen(5000, 'localhost', () => {
    console.log("Server is running...");
});



