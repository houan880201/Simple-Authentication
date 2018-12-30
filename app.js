var express                 =  require('express'),
    app                     =  express(),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    LocalStrategy           = require("passport-local"),
    passportLocalMongoose   = require("passport-local-mongoose"),
    bodyParser              = require("body-parser"),
    User                    = require("./models/user");

    mongoose.connect("mongodb://localhost:27017/auth_demo", {useNewUrlParser: true});
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/public"))
    app.use(require("express-session")({
        secret: "I am the best",
        resave: false,
        saveUninitialized: false
    }))
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

//===================
//Routes

app.get("/",function(req,res){
    res.render("home");
})

app.get("/secret",function(req,res){
    res.render("secret");
})

//Auth Routes
app.get("/register",function(req,res){
    res.render("register");
})

app.post("/register",function(req,res){
    User.register(new User({username: req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req,res,function(){
                res.redirect("/secret");
            })
        }
    });
});

app.listen(8124, "127.0.0.1",function(){
    console.log("Server started");
});
