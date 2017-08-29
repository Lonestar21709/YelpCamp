var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    flash = require("connect-flash"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    seedDB = require("./seeds"),
    passport = require("passport"),
    methodOverride = require("method-override"),
    LocalStrategy = require("passport-local");
    
//requiring routes    
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

mongoose.connect(process.env.DATABASEURL);




app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
//dirname refers to the directory that the script is running -> /home/ubuntu/workspace/YelpCamp/v5 + /public
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method")); //need this to use PUT and DELETE
app.use(flash());
// seedDB(); //seed the database


//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "Loki is cute when hes sleepy",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//

//middleware to include currentUser in each page
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})


app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);





app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server");
});
