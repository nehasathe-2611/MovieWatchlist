// frontend/src/App.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({ title: '', genre: '', year: '', watched: false });

  const fetchMovies = async () => {
    const res = await axios.get('http://localhost:5000/api/movies');
    setMovies(res.data);
  };

  const addMovie = async () => {
    await axios.post('http://localhost:5000/api/movies', form);
    fetchMovies();
    setForm({ title: '', genre: '', year: '', watched: false });
  };

  const deleteMovie = async (id) => {
    await axios.delete(`http://localhost:5000/api/movies/${id}`);
    fetchMovies();
  };

  const toggleWatch = async (movie) => {
    await axios.put(`http://localhost:5000/api/movies/${movie._id}`, {
      ...movie,
      watched: !movie.watched,
    });
    fetchMovies();
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="app-container">
      <h1>Movie Watchlist</h1>

      <div className="form-group">
        <input
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
        />
        <input
          placeholder="Genre"
          value={form.genre}
          onChange={e => setForm({ ...form, genre: e.target.value })}
        />
        <input
          placeholder="Year"
          value={form.year}
          onChange={e => setForm({ ...form, year: e.target.value })}
        />
        <button onClick={addMovie}>Add</button>
      </div>

      <div className="movie-section">
        <h2>To Watch</h2>
        {movies.filter(m => !m.watched).map(movie => (
          <div key={movie._id} className="movie-item">
            <div className="movie-details">
              {movie.title} ({movie.year}) - {movie.genre}
            </div>
            <div className="movie-buttons">
              <button onClick={() => toggleWatch(movie)}>Mark Watched</button>
              <button onClick={() => deleteMovie(movie._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div className="movie-section">
        <h2>Watched</h2>
        {movies.filter(m => m.watched).map(movie => (
          <div key={movie._id} className="movie-item">
            <div className="movie-details">
              {movie.title} ({movie.year}) - {movie.genre}
            </div>
            <div className="movie-buttons">
              <button onClick={() => toggleWatch(movie)}>Mark To Watch</button>
              <button onClick={() => deleteMovie(movie._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
