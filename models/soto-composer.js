/*
============================================
; Title:  soto-composer.js
; Author: Victor Soto
; Date:   02/03/2024 
; Source: https://github.com/buwebdev/web-420/blob/master/models/fruit.js
;===========================================
*/

// Require mongoose and assign it to a variable named mongoose
const mongoose = require('mongoose');

// Add a new variable named Schema and assign it the mongoose.Schema object
const Schema = mongoose.Schema;

// Create a schema named composerSchema with the following fields: firstName and lastName
const composerSchema = new Schema({
  firstName: String,
  lastName: String
});

// Name the model “Composer” and export it using module.exports
module.exports = mongoose.model('Composer', composerSchema);