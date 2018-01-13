var express = require("express");
var router  = express.Router({mergeParams: true});
var GetAway = require("../models/getaway");
var Comment = require("../models/comment");
var middleware = require("../middleware");

//Comments New
router.get("/new",middleware.isLoggedIn, function(req, res){
    // find getaway by id
    console.log(req.params.id);
    GetAway.findById(req.params.id, function(err, getaway){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {getaway: getaway});
        }
    })
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup getaway using ID
   GetAway.findById(req.params.id, function(err, getaway){
       if(err){
           req.flash('error', "Oops, looks like the comment wasn't found.");
           res.redirect("/getaways");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
                req.flash('error', "Comment creation failed.");
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               getaway.comments.push(comment._id);
               getaway.save();
               req.flash('success', "Your comment has been posted!");
               res.redirect('/getaways/' + getaway._id);
           }
        });
       }
   });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {getaway_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/getaways/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash('success', "Your comment has been deleted!");
           res.redirect("/getaways/" + req.params.id);
       }
    });
});

module.exports = router;