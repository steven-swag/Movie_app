import React from 'react'
import MovieCatalog from '../components/MovieCatalog'

function TopRatedMovies() {
  return (
    <MovieCatalog
      category="top_rated"
      title="Top Rated Movies"
      description="Highly rated stories loved by movie fans."
    />
  )
}

export default TopRatedMovies
