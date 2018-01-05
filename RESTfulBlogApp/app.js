//Dependencies
var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose");

//App config
mongoose.connect("mongodb://localhost/restful_blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// Schema with title , image, body , datecreated
var blogSchema = new mongoose.Schema(
    {
        title: String,
        image: String,
        body: String,
        created: {type: Date, default: Date.now}
    }
);
//model for a blog post passing in the singular object which 
//will be turned into a collection in mongodb
var Blog = mongoose.model("Blog", blogSchema);

//Create one blog object to work with
// Blog.create({
//     title: "Test blog 2",
//     image: "https://images.unsplash.com/photo-1471459631207-76afc6acca3e?auto=format&fit=crop&w=2390&q=80",
//     body: "Hello this is a blog post with a boat!"
// });

//RESTful routes

//INDEX ROUTE 
app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
        if(err){
            console.log(err);
        } else{
            res.render("index", {blogs: blogs});
        }
    });
});

//NEW ROUTE which creates the form page for creating a user
app.get("/blogs/new", function(req, res){
    res.render("new");
});
//CREATE ROUTE retreives data from new page and adds to database
app.post("/blogs", function(req, res){
    var data = req.body.blog;
    Blog.create(data, function(err, blog){
        if(err){
            console.log(err);
        } else {
            res.redirect("/blogs");
        }
    });
});
//connect to server
app.listen(3000, function() {
    console.log("Blog Application started!");
});