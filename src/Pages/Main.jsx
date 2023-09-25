import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../Context/MovieContext";
import { useAuthContext } from "../Context/AuthContext";
import defaultmovie from "../assets/defaultmovie.jpg";
const Main = () => {
  const [search, setSearch] = useState();
  const { movies, movieSearch, isSearch } = useMovieContext();
  const { currentUser } = useAuthContext();
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    !currentUser && navigate("/login");
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${search}`;
    movieSearch(URL, search);
    setSearch("");
  };
  return (
    <div className="dark:bg-teal-900 bg-green-100 p-2 ">
      <form
        onSubmit={handleSearch}
        className="flex items-center justify-center gap-2 "
      >
        <input
          className="w-[350px] border-2 rounded-md p-1.5  bg-green-600 text-green-950"
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          value={search}
          placeholder="Search a movie..."
        />
        <button className="dark:text-green-200" type="submit">
          Search
        </button>
      </form>
      {isSearch && (
        <h3 className="mt-4 text-center font-semibold text-xl">
          {movies.length
            ? `Search results for ${isSearch}`
            : `No results were found for ${isSearch}`}
        </h3>
      )}
      <div className="flex flex-wrap gap-6 justify-center mt-2">
        {movies?.map((item) => (
          <div
            className="cards relative w-[300px] h-[500px] shadow-lg rounded-md cursor-pointer"
            key={item.id}
            onClick={() => navigate(`/details/${item.id}`, { state: item })}
          >
            <div className="card-over ">
              Overview <br />
              {item.overview}
            </div>
            <img
              className="w-full rounded-t-md h-[440px]"
              src={
                item.poster_path
                  ? `https://image.tmdb.org/t/p/w1280${item.poster_path}`
                  : `${defaultmovie}`
              }
              alt="movie image"
            />
            <div className="flex justify-between h-[60px] bg-blue-400 p-2 rounded-b-md">
              <p>{item.title}</p>
              <p
                className={
                  item.vote_average >= 8
                    ? "bg-green-600 vote"
                    : "bg-orange-500 vote"
                }
              >
                {item.vote_average.toFixed(1)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Main;
