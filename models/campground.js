var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String,
    price: String,
    image: String,
    description: String,
    price: Number,
    location: String,
    lat: Number,
    lng: Number,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [ //one campground can have multiple comments ->hence array
        {
            //creating a reference to the comments 
            //so the db object campground will have a refernce to the object Comment, and the ref is objectid
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }    
    ]
});

//var Campground = mongoose.model("Campground", campgroundSchema);
module.exports = mongoose.model("Campground", campgroundSchema);
//singular version Campground -> mongo db -> campgrounds