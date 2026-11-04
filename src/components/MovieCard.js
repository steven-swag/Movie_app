import React from 'react'
import {Link} from 'react-router-dom'
import {Star} from 'lucide-react'
import {IMAGE_BASE_URL} from '../services/movieApi'

const FALLBACK_IMAGE =
  'https://placehold.co/500x750/202027/ffffff?text=No+Poster'

function MovieCard({movie}) {
  const movieTitle = movie.title || movie.name || 'Untitled'

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : FALLBACK_IMAGE

  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.id}`} className="poster-link">
        <img
          className="movie-poster"
          src={posterUrl}
          alt={`${movieTitle} poster`}
          loading="lazy"
        />
      </Link>

      <div className="movie-card-content">
        <h2 title={movieTitle}>{movieTitle}</h2>

        <div className="movie-meta">
          <span className="rating">
            <Star size={15} fill="currentColor" />

            {(movie.vote_average || 0).toFixed(1)}

            <span className="rating-out-of">/10</span>
          </span>

          <span className="release-year">
            {movie.release_date ? movie.release_date.slice(0, 4) : 'TBA'}
          </span>
        </div>

        <button type="button" onClick={() => navigate(`/movie/${movie.id}`)}>
          View Details
        </button>
      </div>
    </article>
  )
}

export default MovieCard
