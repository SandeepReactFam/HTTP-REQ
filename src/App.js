import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";

import "./App.css";

function App() {
  const [Movies, setMovies] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

 const fetchMoviesHandler =useCallback(async()=> {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Somthing Went Wrong ");
      }
      const data = await response.json();

      const transformedMovies = data.results.map((moviesData) => {
        return {
          id: moviesData.episode_id,
          title: moviesData.title,
          openingText: moviesData.opening_crawl,
          releaseData: moviesData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [])


useEffect(() => {
  fetchMoviesHandler()

}, [fetchMoviesHandler])


  let content = <p>Found No Movies!</p>;
  if (Movies.length > 0) {
    content = <MoviesList movies={Movies} />;
  }
  if (error) {
    content = <p>{error}</p>;
  }

  if (Loading) {
    content = <p>Loading....</p>;
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
