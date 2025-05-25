// backend/controllers/movieController.js
const Movie = require('../models/Movie');

exports.getMovies = async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
};

exports.createMovie = async (req, res) => {
  const newMovie = new Movie(req.body);
  await newMovie.save();
  res.json(newMovie);
};

exports.updateMovie = async (req, res) => {
  const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(movie);
};

exports.deleteMovie = async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Movie deleted' });
};
