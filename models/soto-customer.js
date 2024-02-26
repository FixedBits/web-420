/*
============================================
; Title:  soto-customer.js
; Author: Victor Soto
; Date:   02/25/2024 
;===========================================
*/

// Require mongoose and assign it to a variable named mongoose
const mongoose = require('mongoose');

// Add a new variable named Schema and assign it the mongoose.Schema object
const Schema = mongoose.Schema;

// Define the lineItemSchema
const lineItemSchema = new Schema({
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number }
});

// Define the invoice schema
const invoice = new Schema({
    subtotal: { type: Number },
    tax: { type: Number },
    dateCreated: { type: String },
    dateShipped: { type: String },
    lineItems: [ lineItemSchema ]
});

// Define the customerSchema
const customerSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    invoices: [ invoice ]
});

// Export the Customer model
module.exports = mongoose.model('Customer', customerSchema);