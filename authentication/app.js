//dependencies
var express               = require('express'),
    User                  = require('./models/user'),
    mongoose              = require('mongoose'),
    passport              = require('passport'),
    bodyParser            = require('body-parser'),
    localStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose'),
    app                   = express();

//app config
mongoose.connect("mongodb://localhost/authen_demo_app");
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
    secret: "I can't believe it's not butter!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// ================
// ROUTES 
// ================
app.get('/', function(req, res){
    res.render("home");
});

app.get('/secret', isLoggedIn, function(req, res){
    res.render("secret");
});

//REGISTER ROUTES ADD NEW USER TO DATABASE
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
                res.redirect('/secret');
            });
        }
    });
});
//LOGIN ROUTES
app.get('/login', function(req, res){
    res.render('login');
});

//MIDDLE WARE introduced makes sure the password is the same as the one hashed in the database
app.post('/login', passport.authenticate("local", {
        successRedirect: "/secret",
        failureRedirect: "/login"
    }) , function(req, res){
    
});
//LOGOUT FUNCTIONALITY
app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
//MIDDLEWARE FOR THE SECRETS PAGE CHECK IF AUTHENTICATED
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}

//PORT SETUP
app.listen(3000, function(){
    console.log("server started");
});