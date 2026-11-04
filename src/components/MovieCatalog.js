import React, {useEffect, useState} from 'react'
import {useSearchParams} from 'react-router-dom'

import {getMovieList} from '../services/movieApi'
import MovieList from './MovieList'
import Pagination from './Pagination'
import Loader from './Loader'

function MovieCatalog({category, title, description}) {
  const [searchParams, setSearchParams] = useSearchParams()

  const page = Math.max(1, Number(searchParams.get('page')) || 1)

  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    async function fetchMovies() {
      setLoading(true)
      setError('')

      try {
        const response = await getMovieList(category, page)

        if (isMounted) {
          setMovies(response.data.results || [])
          setTotalPages(response.data.total_pages || 1)
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError.response?.data?.status_message ||
              'Unable to load movies. Check your API key and internet connection.',
          )
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchMovies()

    return () => {
      isMounted = false
    }
  }, [category, page])

  function changePage(nextPage) {
    setSearchParams({
      page: String(nextPage),
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      <section className="page-heading">
        <div>
          <p className="eyebrow">EXPLORE THE COLLECTION</p>
          <h1 aria-label={title}>{title}</h1>
          <p className="page-description">{description}</p>
        </div>
      </section>

      {loading && <Loader />}

      {!loading && error && <p className="error-state">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="status-message">No movies found.</p>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <MovieList movies={movies} />

          {/* eslint-disable react/jsx-no-bind */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={changePage}
          />
          {/* eslint-enable react/jsx-no-bind */}
        </>
      )}
    </>
  )
}

export default MovieCatalog
