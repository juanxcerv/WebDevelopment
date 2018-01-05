//dependencies
var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose")

//connect to mongo
mongoose.connect("mongodb://localhost/yelpcamp");

//SCHEMA setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

// campground model
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name : "Salmon Creek",
//     image : "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg",
//     description: "Welcome to Salmon creek where you can find Salmon in the creek!"
// }, function(err, campground){
//     if(err){
//         console.log(err);
//     } else {
//         console.log(campground);
//     }
// });
//body parser and ejs files
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// routes
app.get("/", function(req, res){
    res.render("landing");
});

//USERS show all campgrounds
app.get("/campgrounds", function(req, res){
    //get campgrounds from Data Base
    Campground.find({}, function(err, campgrounds){
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds:campgrounds});
        }
    });
});
//CREATE add a campground to database
app.post("/campgrounds", function(req, res){
    //get data from the form and add it to the campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var camp = {name: name, image: image, description: description};
    Campground.create(camp, function(err, campground){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});
//NEW show form to create a new campground
app.get("/campgrounds/new", function(req, res){
    res.render("new");
});

//SHOW shows information about one specific campground 
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
            console.log(campground);
            res.render("show", {campground: campground});
        }
    });
});

app.listen(3000, function(){
    console.log("The YelpCamp server has started!");
});