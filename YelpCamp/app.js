//dependencies
var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    seedDb     = require("./seeds");

//app set-up
mongoose.connect("mongodb://localhost/yelpcamp");
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
// app.use(express.static("public"));
app.set("view engine", "ejs");
seedDb(); //removes all previous campgrounds and creates sample ones

// routes
app.get("/", function(req, res){
    res.render("landing");
});

//USERS show all campgrounds
app.get("/campgrounds", function(req, res){
    //get campgrounds from Data Base
    Campground.find({}, function(err, campgrounds){
        if (err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds:campgrounds});
        }
    });
});
//CREATE add a campground to database
app.post("/campgrounds", function(req, res){
    //get data from the form and add it to the DB
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var camp = {name: name, image: image, description: description};

    Campground.create(camp, function(err, campground){
        (err) ? console.log(err) : res.redirect("/campgrounds");
    });
});
//NEW show form to create a new campground
app.get("/campgrounds/new", function(req, res){
    res.render("campgrounds/new");
});

//SHOW shows information about one specific campground 
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        (err) ? console.log(err) : res.render("campgrounds/show", {campground: campground});
    });
});

//COMMENTS ROUTES
app.get("/campgrounds/:id/comments/new", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        (err) ? console.log(err) : res.render("comments/new", {campground: campground});
    });
});

//CREATE add a comment to an existing campground
app.post("/campgrounds/:id/comments", function(req, res){
    //lookup campground using ID
    //create new comment
    //connect new comment to campground
    //redirect to campground show page
    Campground.findById(req.params.id).populate("comments").exec(function(err, campground){
        if (err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if (err){
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

app.listen(3000, function(){
    console.log("The YelpCamp server has started!");
});