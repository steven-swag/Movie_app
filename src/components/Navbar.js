import React, {useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import {Clapperboard, Search} from 'lucide-react'

function Navbar() {
  const [searchText, setSearchText] = useState('')

  const navigate = useNavigate()

  function handleSearch(event) {
    event.preventDefault()

    const query = searchText.trim()

    if (query === '') {
      return
    }

    navigate(`/search?query=${encodeURIComponent(query)}`)

    setSearchText('')
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="brand">
          <Clapperboard size={23} className="brand-icon" />
          <h1>
            movie<span className="brand-accent">movieDB</span>
          </h1>
        </NavLink>

        <nav className="nav-links">
          <NavLink
            to="/"
            end
            aria-label="Popular"
            className={({isActive}) =>
              isActive
                ? 'nav-link active nav-link-popular'
                : 'nav-link nav-link-popular'
            }
          />

          <NavLink
            to="/top-rated"
            className={({isActive}) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Top Rated
          </NavLink>

          <NavLink
            to="/upcoming"
            className={({isActive}) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
          >
            Upcoming
          </NavLink>
        </nav>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies..."
            aria-label="Search movies"
            value={searchText}
            onChange={event => setSearchText(event.target.value)}
          />

          <button type="submit">
            <Search size={17} />

            <span>Search</span>
          </button>
        </form>
      </div>
    </header>
  )
}

export default Navbar
