import React from 'react'
import MovieCard from './MovieCard'

function MovieList({movies}) {
  if (!movies || movies.length === 0) {
    return <p className="empty-state">No movies found.</p>
  }

  return (
    <div className="movie-grid">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

export default MovieList
