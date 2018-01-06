// DEPENDENCIES
var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require('passport'),
    localStrategy = require("passport-local"),
    Campground    = require("./models/campground"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDb        = require("./seeds");

// APP CONFIG
mongoose.connect("mongodb://localhost/yelpcamp");
mongoose.Promise = global.Promise;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
seedDb(); //removes all previous campgrounds and creates sample ones

// PASSPORT CONFIG
app.use(require('express-session')({
    secret: "there is no secrets in life just hidden truths",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
//middle ware to pass in user to check if a user is logged in throughout all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});
// ROUTES
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
app.get("/campgrounds/:id/comments/new", isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        (err) ? console.log(err) : res.render("comments/new", {campground: campground});
    });
});

//CREATE add a comment to an existing campground
app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res){
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
// AUTHENTICATION ROUTES 
app.get('/register', function(req, res){
    res.render('register');
});

app.post('/register', function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if (err){
            console.log(err);
            return res.render('register');
        } else {
            passport.authenticate("local")(req, res, function(){
                res.redirect('/');
            });
        }
    });
});

app.get('/login', function(req, res){
    res.render('login');
});

app.post('/login', passport.authenticate("local", {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }) , function(req, res){
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
});
//MIDDLEWAR THAT ALLOWS COMMENT CREATION ONLY TO AUTHENTICATED USER
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}
app.listen(3000, function(){
    console.log("The YelpCamp server has started!");
});