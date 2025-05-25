// backend/models/Movie.js
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  year: Number,
  watched: { type: Boolean, default: false },
});

module.exports = mongoose.model('Movie', movieSchema);
