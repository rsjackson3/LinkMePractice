var express = require('express');
var router = express.Router(); 
var User = require("../models/user"); 
var Post = require("../models/post"); // require post schema for db

router.get("/", function(req, res){
    res.render("landing"); 
})

router.get("/register", function(req, res){
    res.render("register"); 
})

router.get("/login", function(req, res){
    res.render("login"); 
})

router.post("/login", function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if (err || !user || req.body.password !== user.password){ // if username or email is not found or incorrect
            return res.render("login", {error: "incorrect email or password"});  // render login page again
        }
            Post.find({}, function(err, posts){
        
            res.render('index', {posts: posts});  // pass users to local variable in view to use in ejs file
            }); 
    })
})

router.post("/register", function(req, res){
    let user = new User(req.body); // create user variable to be added to db

    // try to save user to db
    user.save(function(err){
        if (err){
            let error = "something went wrong"; 

            if (err.code === 11000){
                error = "That email is already taken, please try another one."; 
            }

            return res.render("register", {error: error}); 
        }
            Post.find({}, function(err, posts){
        
            res.render('index', {posts: posts});  // pass users to local variable in view to use in ejs file
            });
          //  res.redirect("/"); // if no error, user is created and redirect to dashboard
    })
    
})

router.get("/resend", function(req, res){
    Post.find({}, function(err, posts){
        
        res.render('index', {posts: posts});  // pass users to local variable in view to use in ejs file
        }); 
})
module.exports = router; 