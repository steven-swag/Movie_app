const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = process.env.REACT_APP_TMDB_API_KEY

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500'
export const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/w1280'

async function makeGetRequest(url) {
  const response = await fetch(url)
  const data = await response.json()

  if (!response.ok) {
    throw new Error(data.status_message || 'API request failed')
  }

  // Keep the same response format used by your existing components.
  return {data}
}

// Popular, Top Rated and Upcoming movies
export function getMovieList(category, page) {
  const url =
    `${API_BASE_URL}/movie/${category}` +
    `?api_key=${API_KEY}&language=en-US&page=${page || 1}`

  return makeGetRequest(url)
}

// Search movies
export function searchMovies(query, page) {
  const url =
    `${API_BASE_URL}/search/movie` +
    `?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}` +
    `&page=${page || 1}`

  return makeGetRequest(url)
}

// Single movie details
export function getMovieDetails(movieId) {
  const url =
    `${API_BASE_URL}/movie/${movieId}` +
    `?api_key=${API_KEY}&language=en-US`

  return makeGetRequest(url)
}

// Movie cast details
export function getMovieCredits(movieId) {
  const url =
    `${API_BASE_URL}/movie/${movieId}/credits` +
    `?api_key=${API_KEY}&language=en-US`

  return makeGetRequest(url)
}