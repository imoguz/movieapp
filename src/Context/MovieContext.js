import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState();
  const [isSearch, setIsSearch] = useState();
  const API_KEY = process.env.REACT_APP_TMDB_KEY;

  useEffect(() => {
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
    movieSearch(URL);
    setIsSearch(false);
  }, []);

  const movieSearch = (URL, search) => {
    axios(URL)
      .then((response) => setMovies(response.data.results))
      .catch((error) => console.log(error));
    setIsSearch(search);
  };

  const values = { movies, movieSearch, isSearch };
  return (
    <MovieContext.Provider value={values}>{children}</MovieContext.Provider>
  );
};
export const useMovieContext = () => {
  return useContext(MovieContext);
};
