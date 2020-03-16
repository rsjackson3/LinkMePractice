var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title: String,
    url: String,
    notes: String, 
    tags: [String]
},{strict: false}) // created schema, which defines structure of documents in the collection 
// strict: false means that you can add arbitrary name value pairs 

module.exports = mongoose.model('Post', postSchema); // creates the posts collection using the postSchema, UserDataModel is a "Model", a subclass of 'mongoose.Model' 