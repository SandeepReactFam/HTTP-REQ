import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";

import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [Movies, setMovies] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
 const fetchMoviesHandler =useCallback(async()=> {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("url/movies.json");
      if (!response.ok) {
        throw new Error("Somthing Went Wrong ");
      }
      const data = await response.json();
      const loadedMovies=[];
      for(const key in data){
        loadedMovies.push({
          id:key,
          title:data[key].title,
          openingText:data[key].openingText,
          releaseDate:data[key].releaseDate
        })
      }
      // const transformedMovies = data.results.map((moviesData) => {
      //   return {
      //     id: moviesData.episode_id,
      //     title: moviesData.title,
      //     openingText: moviesData.opening_crawl,
      //     releaseData: moviesData.release_date,
      //   };
      // });
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  }, [])


useEffect(() => {
  fetchMoviesHandler()

}, [fetchMoviesHandler])

 
async function addMovieHandler(movie) {
  const response = await fetch('https://react-http-6b4a6.firebaseio.com/movies.json', {
    method: 'POST',
    body: JSON.stringify(movie),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  console.log(data);
}
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
    <AddMovie onAddMovie={addMovieHandler} />
  </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
