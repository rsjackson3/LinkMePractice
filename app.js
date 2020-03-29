var fs = require("fs"); // include the javascript file system 
var mongoose = require('mongoose'); // import mongoose package
var bodyParser = require('body-parser'); 
const express = require('express'); 
const app = express(); 
const port = 8000; 
methodOverride = require("method-override"); // for DELETE and PUT requests from html forms

app.set('view engine', 'ejs'); // for rendering ejs templates 
app.use(express.static(__dirname + "/public")); // serve static files such as JS
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride("_method")); // for put and delete overrides from html form http requests
app.use(bodyParser.urlencoded({
    extended: false  // false means parses with querystring library as opposed to qs library 
})); 

var indexRoutes = require("./routes/index"); 

var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; // create schema object 
var Post = require("./models/post"); // require post schema for db
var User = require("./models/user"); // require user schema for db 

// connect to test db on localhost 
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true}); 
var db = mongoose.connection; // connection object 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("db connected");
}); // handle errors 


fs.readFile('C:/Dev/IndStudyPractice/login.html', function(error, data){
    if (error){
        throw error; 
    }

    myFile = data; 
}) // uses fs package to read an html file and store it in myFile variable 

app.use("/", indexRoutes); // tell app to use indexRoutes middleware for "/"

app.post("/register", function(req, res){
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

            res.redirect("/dashboard"); // if no error, user is created and redirect to dashboard
    })
    
})
/*
app.get('/', function(req, res){
    // get users from db
    /*
    Post.find({}, function(err, posts){
        
    res.render('index', {posts: posts});  // pass users to local variable in view to use in ejs file
    });
    
   res.render('register');

});
*/
// shows full post data on separate page 
app.get("/posts/:id", function(req, res){
    Post.findById(req.params.id, function(err, foundPost){
        if (err){
            console.log(err);
        }
        else {
            // render show template with post info
            res.render("show", {post: foundPost}); 
        }
    })
})

// DELETE Route to delete post 
app.delete("/posts/:id", function(req, res){
    Post.findByIdAndRemove(req.params.id, function(err){
        if (err){
            console.log(err);
            res.redirect("/resend"); // redirect to home page
        }
        else {
            res.redirect("/resend");
        }
    }) 
})

app.post('/auth.json', function(req, res){
  
   Post.create(req.body, function(err, postData){
     res.redirect('/'); // won't currently redirect due to ajax not supporting redirects 
     // (using window.location.replace on client side instead)
   });
    console.log(req.body); 
})

app.listen(port, ()=>
    console.log('Listening on port: ' + port)
)