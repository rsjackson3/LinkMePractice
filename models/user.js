var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    isAdmin: {type: Boolean, default: false}
},{strict: false}) // created schema

module.exports = mongoose.model('User', userSchema); // will create users collection using userSchema
