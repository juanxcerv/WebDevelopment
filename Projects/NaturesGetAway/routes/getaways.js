var express = require("express");
var router  = express.Router();
var Getaway = require("../models/getaway");
var middleware = require("../middleware");
var geocoder = require('geocoder');
var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'juanxcerv', 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

//INDEX - show all getaways
router.get("/", function(req, res){
    var perPage = 12;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    Getaway.find({}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allGetaways) {
        Getaway.count().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("getaways/index", {
                    getaways: allGetaways,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
});
router.get("/Winter", function(req, res){
    var perPage = 12;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    Getaway.find({season: "Winter"}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allGetaways) {
        Getaway.count().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("getaways/index", {
                    getaways: allGetaways,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
});
router.get("/Fall", function(req, res){
    var perPage = 12;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    Getaway.find({season: "Fall"}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allGetaways) {
        Getaway.count().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("getaways/index", {
                    getaways: allGetaways,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
});
router.get("/Summer", function(req, res){
    var perPage = 12;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    Getaway.find({season: "Summer"}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allGetaways) {
        Getaway.count().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("getaways/index", {
                    getaways: allGetaways,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
});
router.get("/Spring", function(req, res){
    var perPage = 12;
    var pageQuery = parseInt(req.query.page);
    var pageNumber = pageQuery ? pageQuery : 1;
    Getaway.find({season: "Spring"}).skip((perPage * pageNumber) - perPage).limit(perPage).exec(function (err, allGetaways) {
        Getaway.count().exec(function (err, count) {
            if (err) {
                console.log(err);
            } else {
                res.render("getaways/index", {
                    getaways: allGetaways,
                    current: pageNumber,
                    pages: Math.ceil(count / perPage)
                });
            }
        });
    });
});
//CREATE - add new getAway to DB
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res){
    // get data from form and add to getaways array
    var name = req.body.name;
    var desc = req.body.description;
    var season = req.body.season;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var price = req.body.price;
    geocoder.geocode(req.body.location, function (err, data) {
        cloudinary.uploader.upload(req.file.path, function(result) {
            // add cloudinary url for the image to the getaways object under image property
            var image = result.secure_url;
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            var location = data.results[0].formatted_address;
            var newGetaway = {name: name, image: image, description: desc, price: price, author:author, season: season, location: location, lat: lat, lng: lng};
            // Create a new getAway and save to DB
            Getaway.create(newGetaway, function(err, newlyCreated){
                if(err){
                    console.log(err);
                } else {
                    //redirect back to getaways page
                    console.log(newlyCreated);
                    res.redirect("/getaways");
                }
            });
        });
    });
});

//NEW - show form to create new Getaway
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("getaways/new"); 
});

// SHOW - shows more info about one getaway
router.get("/:id", function(req, res){
    //find the getaway with provided ID
    Getaway.findById(req.params.id).populate("comments").exec(function(err, foundGetaway){
        if(err){
            console.log(err);
        } else {
            console.log(foundGetaway)
            //render show template with that getaway
            res.render("getaways/show", {getaway: foundGetaway});
        }
    });
});

// EDIT Getaway ROUTE
router.get("/:id/edit", middleware.checkGetawayOwnership, function(req, res){
    Getaway.findById(req.params.id, function(err, foundGetaway){
        res.render("getaways/edit", {getaway: foundGetaway});
    });
});

// UPDATE GETAWAY ROUTE
router.put("/:id",middleware.checkGetawayOwnership, function(req, res){
    // find and update the correct getaway
    geocoder.geocode(req.body.location, function (err, data) {
        cloudinary.uploader.upload(req.file.path, function(result) {
            // add cloudinary url for the image to the getaways object under image property
            var image = result.secure_url;
            var lat = data.results[0].geometry.location.lat;
            var lng = data.results[0].geometry.location.lng;
            var location = data.results[0].formatted_address;
            var newData = {name: req.body.name, image: req.body.image, description: req.body.description, price: req.body.price, season: req.body.season, location: location, lat: lat, lng: lng};
            Getaway.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, Getaway){
                if(err){
                    req.flash("error", err.message);
                    res.redirect("back");
                } else {
                    req.flash("success","Successfully Updated!");
                    res.redirect("/getaways/" + Getaway._id);
                }
            });
        });
    });
});

// DESTROY Getaway ROUTE
router.delete("/:id",middleware.checkGetawayOwnership, function(req, res){
   Getaway.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/getaways");
      } else {
          res.redirect("/getaways");
      }
   });
});


module.exports = router;

