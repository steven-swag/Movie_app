import React, {useEffect, useState} from 'react'

import {Link, useParams} from 'react-router-dom'

import {ArrowLeft, CalendarDays, Clock3, Star} from 'lucide-react'

import {
  BACKDROP_BASE_URL,
  getMovieCredits,
  getMovieDetails,
  IMAGE_BASE_URL,
} from '../services/movieApi'

import Loader from '../components/Loader'

const POSTER_FALLBACK =
  'https://placehold.co/500x750/202027/ffffff?text=No+Poster'

const PROFILE_FALLBACK =
  'https://placehold.co/300x450/202027/ffffff?text=No+Photo'

function formatRuntime(minutes) {
  if (!minutes) {
    return 'Not available'
  }

  const hours = Math.floor(minutes / 60)

  const remainingMinutes = minutes % 60

  return `${hours}h ${remainingMinutes}m`
}

function MovieDetails() {
  const {id} = useParams()

  const [movie, setMovie] = useState(null)

  const [cast, setCast] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function fetchMovieInformation() {
      setLoading(true)
      setError('')

      try {
        const [detailsResponse, creditsResponse] = await Promise.all([
          getMovieDetails(id),

          getMovieCredits(id),
        ])

        if (isMounted) {
          setMovie(detailsResponse.data)

          setCast((creditsResponse.data.cast || []).slice(0, 12))
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError.response?.data?.status_message ||
              'Unable to load this movie.',
          )
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchMovieInformation()

    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p className="error-state">{error}</p>
  }

  if (!movie) {
    return <p className="empty-state">Movie not found.</p>
  }

  const posterUrl = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : POSTER_FALLBACK

  const backdropUrl = movie.backdrop_path
    ? `${BACKDROP_BASE_URL}${movie.backdrop_path}`
    : ''

  const heroStyle = backdropUrl
    ? {
        backgroundImage: `linear-gradient(90deg, rgba(13,13,17,.98) 10%, rgba(13,13,17,.78) 58%, rgba(13,13,17,.45)), url(${backdropUrl})`,
      }
    : {}

  return (
    <div className="details-page">
      <Link to="/" className="back-link">
        <ArrowLeft size={17} />
        Back to movies
      </Link>

      <section className="movie-hero" style={heroStyle}>
        <img
          className="detail-poster"
          src={posterUrl}
          alt={`${movie.title} poster`}
        />

        <div className="detail-copy">
          <p className="eyebrow">MOVIE DETAILS</p>

          <h1>{movie.title}</h1>

          {movie.tagline && <p className="tagline">“{movie.tagline}”</p>}

          <div className="detail-facts">
            <span>
              <Star size={16} fill="currentColor" />
              {movie.vote_average?.toFixed(1) || 'N/A'} / 10
            </span>

            <span>
              <Clock3 size={16} />

              {formatRuntime(movie.runtime)}
            </span>

            <span>
              <CalendarDays size={16} />

              {movie.release_date || 'Release date TBA'}
            </span>
          </div>

          <div className="genre-list">
            {movie.genres?.map(genre => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>

          <h2>Overview</h2>

          <p className="overview">
            {movie.overview || 'No overview is available for this movie.'}
          </p>
        </div>
      </section>

      <section className="cast-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE PEOPLE BEHIND THE STORY</p>

            <h2>Cast</h2>
          </div>
        </div>

        {cast.length > 0 ? (
          <div className="cast-grid">
            {cast.map(person => (
              <article
                className="cast-card"
                key={person.cast_id || `${person.id}-${person.character}`}
              >
                <img
                  src={
                    person.profile_path
                      ? `${IMAGE_BASE_URL}${person.profile_path}`
                      : PROFILE_FALLBACK
                  }
                  alt={person.name}
                  loading="lazy"
                />

                <div>
                  <h3>{person.name}</h3>

                  <p>{person.character || 'Character not listed'}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="empty-state">Cast information is not available.</p>
        )}
      </section>
    </div>
  )
}

export default MovieDetails
