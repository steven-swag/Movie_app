import React from 'react'
import MovieCatalog from '../components/MovieCatalog'

function UpcomingMovies() {
  return (
    <MovieCatalog
      category="upcoming"
      title="Upcoming Movies"
      description="Get a first look at what's coming to the big screen."
    />
  )
}

export default UpcomingMovies
