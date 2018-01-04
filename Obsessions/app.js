var express = require("express");
var app = express();

//avoid using .ejs in our routes
app.set("view engine", "ejs");

//rou
// routes
app.get("/", function(req, res){
    res.render("landing");
});

app.listen(3000, function(){
    console.log("The Obsessions server has started!");
});