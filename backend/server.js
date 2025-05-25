// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const movieRoutes = require('./routes/movieRoutes');

const app = express();
app.use(cors({
  origin: 'https://moviewatchlist-1-hvv6.onrender.com'
}));
app.use(express.json());

app.use('/api/movies', movieRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.log(err));
