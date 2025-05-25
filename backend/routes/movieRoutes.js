// backend/routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

router.get('/', movieController.getMovies);
router.post('/', movieController.createMovie);
router.put('/:id', movieController.updateMovie);
router.delete('/:id', movieController.deleteMovie);

module.exports = router;
