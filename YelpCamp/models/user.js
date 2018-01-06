var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
//SCHEMA setup
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

userSchema.plugin(passportLocalMongoose);
// campground model
module.exports = mongoose.model("User", userSchema);
