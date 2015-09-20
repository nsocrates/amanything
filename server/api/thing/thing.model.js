'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  created_by: String,
  username: String,
  text: String,
  created_at: { type: Date, default: Date.now },
  posted_on: String,
  reply: String
});

module.exports = mongoose.model('Thing', ThingSchema);
