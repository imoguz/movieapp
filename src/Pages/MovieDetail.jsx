import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const MovieDetail = () => {
  const [currentMovie, setCurrentMovie] = useState();
  const [videoKey, setVideoKey] = useState();
  const { id } = useParams();
  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  useEffect(() => {
    axios(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then((response) => setCurrentMovie(response.data))
      .catch((error) => console.log(error));
    axios(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
      .then((response) => setVideoKey(response.data.results[0].key))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <iframe
        className="py-5 mx-auto"
        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=1`}
        allowFullScreen
        title="YouTube video"
        data-gtm-yt-inspected-2340190_699="true"
        id={240632615}
        width="900px"
        height="500px"
      />
      <div className="border w-[70%] mx-auto flex gap-5 mb-5">
        <img
          className="w-[300px] h-[500px]"
          src={`https://image.tmdb.org/t/p/w1280/${currentMovie?.poster_path}`}
          alt=""
        />
        <div className="p-5 flex flex-col justify-between">
          <div className="text-justify text-lg">
            <p className="text-red-700 underline">Overview : </p>
            <p className="indent-8">{currentMovie?.overview}</p>
          </div>
          <table className="border-2 w-full">
            <tbody>
              <tr>
                <td>Release Date : {currentMovie?.release_date}</td>
              </tr>
              <tr>
                <td>Rate :{currentMovie?.vote_average}</td>
              </tr>
              <tr>
                <td>Total Vote :{currentMovie?.vote_count}</td>
              </tr>
              <tr>
                <td>
                  <NavLink to="/">Go Back</NavLink>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
