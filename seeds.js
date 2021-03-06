//point of seeds file is to run it to seed our database with some data
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Clouds Peak", 
            image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            name: "Desert Mist", 
            image: "https://farm3.staticflickr.com/2353/2069978635_2eb8b33cd4.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            name: "Barron Canyons", 
            image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
    ]


function seedDB(){
    //Remove all campground
    // Campground.remove({}, function(err){
    //     if(err){
    //         console.log(err);
    //     } else {
    //         console.log("removed campgrounds!");
    //         // add a few campgrounds
            // data is the array, and seed represents each instance/object as it loops through
            // seed and campground are the same thing. So we store each instance into seed, than create a Campground
            // with seed, than in the function(err, campground) we are passing seed into campground
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, campground){
            //         // console.log(seed);
            //         if(err){
            //             console.log(err);
            //         } else {
            //              console.log("Added a campground!");
            //              //add a few comments
            //              Comment.create(
            //                  {
            //                      text: "This place is great",
            //                      author: "Fred"
            //                  }, function(err, comment){
            //                      if(err){
            //                          console.log(err);
            //                      } else {
            //                          campground.comments.push(comment);
            //                          campground.save();
            //                          console.log("Created new comment");
            //                      }
            //                  });
            //         }
            //     });
            // });

    //     }
    // });

    
}

module.exports = seedDB;
