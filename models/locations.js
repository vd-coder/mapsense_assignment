const mongoose = require('mongoose');
const User=require('./user.js');
const locationSchema = new mongoose.Schema({
  user :{ type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  // Add more fields as needed
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
