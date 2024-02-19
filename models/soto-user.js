/*
============================================
; Title:  soto-user.js
; Author: Victor Soto
; Date:   02/18/2024 
; Source: https://github.com/buwebdev/web-420/blob/master/models/password.js
;===========================================
*/

// Add a require statement for mongoose and assign it to a variable named mongoose.
const mongoose = require("mongoose");

// Add a new variable named Schema and assign it the mongoose.Schema object.
const Schema = mongoose.Schema;

// Create a schema named userSchema with the following fields:
const userSchema = new Schema({
  userName: String,
  Password: String,
  emailAddress: [String]
});

// Name the model “User” and export it using module.exports
module.exports = mongoose.model("User", userSchema);