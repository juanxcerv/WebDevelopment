var mongoose = require("mongoose");

//SCHEMA setup
var commentSchema = new mongoose.Schema({
    author: String,
    text: String
});

// campground model
module.exports = mongoose.model("Comment", commentSchema);
