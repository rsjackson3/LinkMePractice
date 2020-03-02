var fs = require("fs"); // include the javascript file system 
var mongoose = require('mongoose'); // import mongoose package
const express = require('express'); 
const app = express(); 
const port = 8000; 

app.set('view engine', 'ejs'); // for rendering ejs templates 
app.use(express.static(__dirname + "/public")); // serve static files such as JS
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; // create schema object 

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true}); 
var db = mongoose.connection; // connection object 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("db connected");
}); // handle errors 

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

fs.readFile('C:/Dev/IndStudyPractice/login.html', function(error, data){
    if (error){
        throw error; 
    }

    myFile = data; 
}) // uses fs package to read an html file and store it in myFile variable 

app.get('/', function(req, res){
    // get users from db
    UserDataModel.find({}, function(err, users){
    res.render('index', {users: users});  // pass users to local variable in view to use in ejs file
    });

});

app.post('/auth.json', function(req, res){
   // res.render('index');
    console.log(req.body); 
})

app.listen(port, ()=>
    console.log('Listening on port: ' + port)
)