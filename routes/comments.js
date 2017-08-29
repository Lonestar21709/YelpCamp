var express = require("express");
var router = express.Router({mergeParams: true});//use this when you need to use params, the original line is in 
//app.js, so this allows us the essentially share that line of code ->"/campgrounds/:id/comments" "the id"
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleWare = require("../middleware/") //automatically requires index.js, naming things index.js allows this default require
//Comments new
router.get("/new", middleWare.isLoggedIn ,function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});
//Comments create
router.post("/", middleWare.isLoggedIn, function(req, res){

   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds"); 
       } else {
          //create new comment
          //console.log(req.body.comment);
          //comment contains text, author
          Comment.create(req.body.comment, function(err, comment){
              if(err){
                  req.flash("error", "Something went wrong");
                  console.log(err);
              } else {
                  //add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  //save comment
                  comment.save();
                  campground.comments.push(comment); //push comment object to comments array inside campground object
                  campground.save();
                  req.flash("success", "Successfully added comment");
                  res.redirect("/campgrounds/" + campground._id); 
              }
          });
          //connect new comment to campground
          //redirect campground show page
       }
   });
});

//Comment Edit Route
router.get("/:comment_id/edit", middleWare.checkCommentOwnership, function(req, res){
    // req.params.id; //this is defined in app.js line 50, refers to campground id
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
    
});

//Comment Update
router.put("/:comment_id", middleWare.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id); //the id is nested back in app.js, line 50 we have access to that :id
        }
    });
});

//Destroy Route
router.delete("/:comment_id", middleWare.checkCommentOwnership, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted");
           res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});


module.exports = router;