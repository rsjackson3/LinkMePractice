var fs = require("fs"); // include the javascript file system 
var mongoose = require('mongoose'); // import mongoose package
const express = require('express'); 
const app = express(); 
const port = 8000; 
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; // create schema object 

mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true}); 
var db = mongoose.connection; // connection object 
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
}); // handle errors 

var userDataSchema = new Schema({
    title: String,
    url: String,
    notes: String, 
    tags: [String]
}) // created schema, which defines structure of documents in the collection 

var UserDataModel = mongoose.model('User', userDataSchema); // creates the users collection using the userDataSchema, UserDataModel is a "Model", a subclass of 'mongoose.Model' 
var bob = new UserDataModel({title: 'Video', url: 'this url', notes: 'cool video i found', tags: ["tennis", "sports"]}); 
bob.save(function (err, bob){
    if (err) return console.error(err); 
    console.log(bob); 
})


fs.readFile('C:/Dev/IndStudyPractice/login.html', function(error, data){
    if (error){
        throw error; 
    }

    myFile = data; 
}) // uses fs package to read an html file and store it in myFile variable 

app.get('/', function(req, res){
    console.log(req.body); // req is an express object that represents the HTTP request 
    res.writeHead(200, {'Content-Type': 'text/html'}) // headers to send back, will send html to browser
        res.write(myFile); // write html file to client in browser 

})

app.post('/auth.json', function(req, res){
    console.log(req.body);
})

app.listen(port, ()=>
    console.log('Listening on port: ' + port)
)