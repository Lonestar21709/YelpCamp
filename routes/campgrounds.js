
var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var middleWare = require("../middleware/") //automatically requires index.js, naming things index.js allows this default require
var geocoder = require("geocoder");
//INDEX ROUTE
router.get("/", function(req,res){
    // console.log(req.user);
        Campground.find({}, function(err, allCampgrounds){
            if(err){
                console.log("ERROR");
            } else {
                res.render("campgrounds/index", {campgrounds: allCampgrounds, currentUser: req.user, page: 'campgrounds'});
            }
        });
     
});
//NEW ROUTE - show form to create new campground
router.get("/new", middleWare.isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs");
});
//CREATE ROUTE - add new campgrounds to db
router.post("/", middleWare.isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var price = req.body.price;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    geocoder.geocode(req.body.location, function(err, data){
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        //variables on the left save the new information and get saved into the database
        var newCampground = {name: name, price: price, image: image, description: desc, author: author, location: location, lat: lat, lng: lng};
        //create a new campground and save to DB
        Campground.create(newCampground, function(err, newlyCreated){
            if(err){
                console.log("ERROR");
            } else {
                //redirect
                console.log(newlyCreated);
                res.redirect("/campgrounds"); 
            } 
        });
    });
});
//SHOW - shows more info about one campground
router.get("/:id", function(req,res){
    //find campground with provided ID, comments is reference to comments array in campgroundSchema
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            console.log(foundCampground);
            //render show template with that campground
            //pass in(show.ejs) under the name campground, our foundCampground
            //so inside the show.ejs template, we can access foundCampground with campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});

//Edit Campground Route
router.get("/:id/edit", middleWare.checkCampgroundOwnership, function(req, res){
            Campground.findById(req.params.id, function(err,foundCampground){
                res.render("campgrounds/edit", {campground: foundCampground});
            });
    
});
//Update Campground Route
router.put("/:id", middleWare.checkCampgroundOwnership,function(req, res){
    //find and update the correct campground
    // var data = {name: req.body.name, image: req.body.image}
    geocoder.geocode(req.body.location, function (err, data) {
        var lat = data.results[0].geometry.location.lat;
        var lng = data.results[0].geometry.location.lng;
        var location = data.results[0].formatted_address;
        var newData = {name: req.body.name, image: req.body.image, description: req.body.description, cost: req.body.cost, location: location, lat: lat, lng: lng};
        Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
            if(err){
                req.flash("error", err.message);
                res.redirect("/campgrounds");
            } else {
                req.flash("success","Successfully Updated!");
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
         //redirect
    });
});


//Destroy Campground Route
router.delete("/:id", middleWare.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds")
        }
        else {
            res.redirect("/campgrounds")
        }
    })
});

module.exports = router;