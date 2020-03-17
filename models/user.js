var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: Boolean, default: false}
},{strict: false}) // created schema

module.exports = mongoose.model('User', userSchema); // will create users collection using userSchema
