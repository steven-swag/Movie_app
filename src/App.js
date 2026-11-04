import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'

import Navbar from './components/Navbar'

import PopularMovies from './pages/PopularMovies'
import TopRatedMovies from './pages/TopRatedMovies'
import UpcomingMovies from './pages/UpcomingMovies'
import MovieDetails from './pages/MovieDetails'
import SearchMovies from './pages/SearchMovies'

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="page-container">
        <Routes>
          <Route path="/" element={<PopularMovies />} />

          <Route path="/top-rated" element={<TopRatedMovies />} />

          <Route path="/upcoming" element={<UpcomingMovies />} />

          <Route path="/movie/:id" element={<MovieDetails />} />

          <Route path="/search" element={<SearchMovies />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="site-footer">
        movieDB <span>·</span> Discover something worth watching.
      </footer>
    </div>
  )
}

export default App
