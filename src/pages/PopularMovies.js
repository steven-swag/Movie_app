import React from 'react'
import MovieCatalog from '../components/MovieCatalog'

function PopularMovies() {
  return (
    <MovieCatalog
      category="popular"
      title="Popular"
      description="The movies everyone's talking about right now."
    />
  )
}

export default PopularMovies