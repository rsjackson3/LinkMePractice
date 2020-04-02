var express = require('express');
var router = express.Router(); 
var User = require("../models/user"); 
var Post = require("../models/post"); // require post schema for db
var bcrypt = require('bcryptjs'); // for password hashing

// root route 
router.get("/", function(req, res){
    res.render("landing"); 
})

// register new user page route
router.get("/register", function(req, res){
    res.render("register"); 
})

// login page route
router.get("/login", function(req, res){
    res.render("login"); 
})

// dashboard route
router.get("/dashboard", function(req, res, next){
    if (!(req.session && req.session.userId)){
        return res.redirect("login");
    }

    // get user from db by using userId
    User.findById(req.session.userId, function(err, user){
        if (err){
            return next(err); 
        }

        if (!user){
            return res.redirect("/login");
        }

        // need this to find each post with a user id that equals req.session.userId
        Post.find({user: req.session.userId}, function(err, posts){
        
            res.render('dashboard', {posts: posts});  // pass users to local variable in view to use in ejs file
            });
    })
})

// login validation route 
router.post("/login", function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if (!user || !bcrypt.compareSync(req.body.password, user.password)){ // if username or email is not found or incorrect
            return res.render("login", {error: "incorrect email or password"});  // render login page again
        }
            req.session.userId = user._id; // use the user's object id for session ID
            /*
            Post.find({}, function(err, posts){ // query to find all posts
            res.render('index', {posts: posts});  // pass users to local variable in view to use in ejs file
            });
            */

            res.redirect("/dashboard"); 

        
    })
})

// register post route 
router.post("/register", function(req, res){
    let hash = bcrypt.hashSync(req.body.password, 14); // don't hard code work factor in production
    req.body.password = hash;
    let user = new User(req.body); // create user variable to be added to db

    // try to save user to db
    user.save(function(err, newUser){
        if (err){
            let error = "something went wrong"; 

            if (err.code === 11000){
                error = "That email is already taken, please try another one."; 
            }

            return res.render("register", {error: error}); 
        }
            req.session.userId = newUser._id; // set session cookie for new user
            res.redirect("/dashboard"); // if no error, user is created and redirect to dashboard

            
          //  res.redirect("/"); // if no error, user is created and redirect to dashboard
    })
    
});

// resend route for deleting posts (and later for adding posts)
router.get("/resend", function(req, res){
    Post.find({}, function(err, posts){
        
        res.render('dashboard', {posts: posts});  // pass users to local variable in view to use in ejs file
        }); 
});

// logout route 
router.get("/logout", function(req, res){
    if (req.session){
        req.session.reset(); // reset cookie 
    }

    res.redirect("/"); // redirect to landing page 
});
module.exports = router; 