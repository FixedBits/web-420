/*
============================================
; Title:  soto-person.js
; Author: Victor Soto
; Date:   02/11/2024 
; Description: Adding schemas for person's API
; Source: https://github.com/buwebdev/web-420/blob/master/models/student.js
;===========================================
*/

// Import mongoose
const mongoose = require('mongoose');

// Grab the Schema object from mongoose
const Schema = mongoose.Schema;

// Construct the roleSchema with a 'text' field of type String
const roleSchema = new Schema({
  text: { type: String }
});

// Construct the dependentSchema with 'firstName', 'lastName', and 'birthDate' fields of type String
const dependentSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  birthDate: { type: Date } 
});

// Construct the personSchema with 'firstName', 'lastName', 'roles', and 'dependents' fields
const personSchema = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  roles: [roleSchema],
  dependents: [dependentSchema] 
});

// Export the person module
module.exports = mongoose.model("Person", personSchema);
