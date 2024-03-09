/*
============================================
; Title:  soto-team.js
; Author: Victor Soto
; Date:   03/07/2024 
; Description: Team/Player Schemas
;===========================================
*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// playerSchema
const playerSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  salary: { type: Number, required: true },
});

// teamSchema
const teamSchema = new Schema({
  name: { type: String, required: true },
  mascot: { type: String, required: true },
  players: [playerSchema],
});

module.exports = mongoose.model("Team", teamSchema);