import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useAuthContext } from "../Context/AuthContext";
import { useMovieContext } from "../Context/MovieContext";
const Navbar = () => {
  const [theme, setTheme] = useState(true);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const { movieSearch } = useMovieContext();
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const handleHomepage = () => {
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
    movieSearch(URL);
    navigate("/");
  };
  const handleClickOutside = (e) => {
    e.target.id || setToggle(false);
  };
  const ref = useRef(null);
  useOnClickOutside(ref, handleClickOutside);
  const { currentUser, logOut } = useAuthContext();
  const handleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setTheme(!theme);
  };
  return (
    <>
      <div className="fixed z-10 w-screen dark:bg-teal-950 bg-emerald-400 h-16 dark:text-green-200 text-green-950 flex justify-between items-center px-10">
        <h1
          onClick={handleHomepage}
          className="text-3xl cursor-pointer hover:text-white"
        >
          React Movie App
        </h1>
        <div className="flex justify-between gap-3 relative">
          {currentUser && (
            <h2 className="text-xl">{currentUser.displayName}</h2>
          )}
          <i
            onClick={handleTheme}
            className={`${
              theme ? "fa-regular fa-sun" : "fa-solid fa-moon"
            } icon`}
          ></i>
          <div className="w-[2rem] h-[2rem] rounded-full">
            {currentUser ? (
              <img
                className="w-full h-full  rounded-full"
                src={currentUser.photoURL}
                id="12345"
                alt="user image"
                onClick={() => {
                  setToggle(!toggle);
                }}
              />
            ) : (
              <i
                onClick={() => {
                  setToggle(!toggle);
                }}
                className="fa-solid fa-user icon "
                id="12345"
              ></i>
            )}
          </div>

          {toggle && (
            <div
              ref={ref}
              className="flex flex-col gap-3 absolute top-9 right-[-8px] rounded-md bg-teal-400 text-black w-[5.7rem] h-[7rem] justify-center px-2 z-20"
            >
              <Link
                className="hover:text-red-900 font-semibold"
                to="/register"
                onClick={() => setToggle(false)}
              >
                Register
              </Link>
              <Link
                className="hover:text-red-900 font-semibold"
                to="/login"
                onClick={() => setToggle(false)}
              >
                Login
              </Link>
              <Link
                className="hover:text-red-900 font-semibold"
                to="/"
                onClick={() => {
                  logOut();
                  setToggle(false);
                  handleHomepage();
                }}
              >
                LogOut
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="h-[4rem] bg-yellow-50"></div>
    </>
  );
};

export default Navbar;
