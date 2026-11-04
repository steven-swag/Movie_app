# movieDB – Movie Database

## About the Project

movieDB is a React-based movie application that uses The Movie Database (TMDB) API to display movie information. Users can explore popular, top-rated, and upcoming movies, search for movies, and view movie details.

## Technologies Used

- React.js
- JavaScript
- HTML and CSS
- React Router
- TMDB API

## Requirements

Make sure you have installed:

- Node.js
- npm

## Steps to Run the Project

**1. Clone the repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

**2. Open the project folder**

```bash
cd movieDB
```

**3. Install dependencies**

```bash
npm install
```

**4. Configure the TMDB API key**

Create a `.env` file in the root folder and add:

```env
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
```

Replace `your_tmdb_api_key` with your TMDB API key.

**5. Start the application**

```bash
npm start
```

The application will run at:

http://localhost:3000

## Features

- View popular movies
- Browse top-rated movies
- Explore upcoming movies
- Search for movies
- View movie details and cast information
- Navigate through movie pages using pagination

## API

Movie information is fetched from [The Movie Database (TMDB)](https://www.themoviedb.org/).

## Note

Do not upload your `.env` file or share your API key publicly.
