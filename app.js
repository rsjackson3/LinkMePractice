var fs = require("fs"); // include the javascript file system 
var mongoose = require('mongoose'); // import mongoose package
const express = require('express'); 
const app = express(); 
const port = 8000; 
methodOverride = require("method-override"); // for DELETE and PUT requests from html forms

app.set('view engine', 'ejs'); // for rendering ejs templates 
app.use(express.static(__dirname + "/public")); // serve static files such as JS
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(methodOverride("_method")); 

var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; // create schema object 
var Post = require("./models/post"); // require post schema for db

// connect to test db on localhost 
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true}); 
var db = mongoose.connection; // connection object 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("db connected");
}); // handle errors 

/*
var userDataSchema = new Schema({
    title: String,
    url: String,
    notes: String, 
    tags: [String]
},{strict: false}) // created schema, which defines structure of documents in the collection 
// strict: false means that you can add arbitrary name value pairs 

var UserDataModel = mongoose.model('User', userDataSchema); // creates the users collection using the userDataSchema, UserDataModel is a "Model", a subclass of 'mongoose.Model' 
var bob = new UserDataModel({title: 'Video', url: 'this url', notes: 'cool video i found'}); 
/*
bob.save(function (err, bob){
    if (err){
        console.log("Error: Document not saved");
    }
    else {
        console.log("Data Saved: ");
        console.log(bob); 
    }
}); 
*/



/*
// retrieve data from the database
UserDataModel.find({}, function(err, users){
    if (err){
        console.log("error");
        console.log(err);
    }

    else {
        console.log("All Users:");
        console.log(users);
    }
})
*/
fs.readFile('C:/Dev/IndStudyPractice/login.html', function(error, data){
    if (error){
        throw error; 
    }

    myFile = data; 
}) // uses fs package to read an html file and store it in myFile variable 

app.get('/', function(req, res){
    // get users from db
    Post.find({}, function(err, posts){
    res.render('index', {posts: posts});  // pass users to local variable in view to use in ejs file
    });

});

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
            res.redirect("/"); // redirect to home page
        }
        else {
            res.redirect("/");
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