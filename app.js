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

const sessions = require("client-sessions"); // for cookies and authentication


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

app.use(sessions({
    cookieName: "session",
    secret: "sawoijwe2322lkjs", // hide this on production server, this is just test
    duration: 30 * 60 * 1000, // 30 minute expiration
})); 

app.use("/", indexRoutes); // tell app to use indexRoutes middleware for "/"

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
            res.redirect("/dashboard"); // redirect to home page
        }
        else {
            res.redirect("/dashboard");
        }
    }) 
})

app.post('/dashboard', function(req, res){
    var tags = req.body.tags.split(','); // make tags an array separated by comma delimiter 
  // add new post to database 
   Post.create({
       title: req.body.title, 
       url: req.body.url, 
       notes: req.body.notes, 
       user: req.session.userId,  // use session userId to associate post with user
       tags: tags}, function(err, postData){
     res.redirect('/dashboard'); 
   });
    console.log(req.body); 
    
})

app.listen(port, ()=>
    console.log('Listening on port: ' + port)
)