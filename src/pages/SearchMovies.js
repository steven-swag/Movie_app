import React, {useEffect, useState} from 'react'
import {Link, useSearchParams} from 'react-router-dom'

import {searchMovies} from '../services/movieApi'

import MovieList from '../components/MovieList'
import Pagination from '../components/Pagination'
import Loader from '../components/Loader'

function SearchMovies() {
  const [searchParams, setSearchParams] = useSearchParams()

  const query = (searchParams.get('query') || '').trim()

  const page = Math.max(1, Number(searchParams.get('page')) || 1)

  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    if (!query) {
      setMovies([])
      setLoading(false)
      return () => {
        isMounted = false
      }
    }

    async function fetchSearchResults() {
      setLoading(true)
      setError('')

      try {
        const response = await searchMovies(query, page)

        if (isMounted) {
          setMovies(response.data.results || [])
          setTotalPages(response.data.total_pages || 1)
        }
      } catch (requestError) {
        if (isMounted) {
          setError(
            requestError.response?.data?.status_message ||
              'Search failed. Please try again.',
          )
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchSearchResults()

    return () => {
      isMounted = false
    }
  }, [query, page])

  function changePage(nextPage) {
    setSearchParams({
      query,
      page: String(nextPage),
    })

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!query) {
    return (
      <section className="empty-search">
        <h1>Search for a movie</h1>
        <p>Use the search bar above to discover movies.</p>

        <Link to="/" className="details-button">
          Browse popular movies
        </Link>
      </section>
    )
  }

  return (
    <>
      <section className="page-heading">
        <div>
          <p className="eyebrow">YOUR SEARCH RESULTS</p>
          <h1>Results for “{query}”</h1>
          <p className="page-description">Movies matching your search.</p>
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

export default SearchMovies
