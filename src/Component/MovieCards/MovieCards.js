import React, { useEffect, useState } from "react";
//common component
import Toast from "../../CommonComponent/Toast/Toast";
import { useMovieContext } from "../../Assets/Context/movieContext";
import "./MovieCards.scss";
import { useNavigate } from "react-router-dom";

const MovieCards = ({ movieData }) => {
  const navigate = useNavigate();
  const { getMoviebyId } = useMovieContext();
  const Img = `https://image.tmdb.org/t/p/w500`;
  const [message, setMessge] = useState({
    toastData: null,
    show: false,
  });

  useEffect(() => {
    setTimeout(() => {
      if (message.show)
        setMessge({
          ...message,
          show: false,
        });
    }, 3000);
  }, [message]);

  const viewDetailsHandler = (movie) => {
    localStorage.setItem("movieDetail", JSON.stringify(movie));
    getMoviebyId(movie);
    navigate("/viewdetails");
  };

  return (
    <div className="detail-card-main-container">
      <div className="cards-main-container">
        {movieData.length > 0 &&
          movieData.map((movie) => {
            return (
              <div className="cards-container" key={movie.original_title}>
                <img
                  src={Img + movie.poster_path}
                  alt="movie_Image"
                  className="cards-image"
                  onClick={() => viewDetailsHandler(movie)}
                />
                <div className="cards-details-container">
                  <label className="cards-label">{movie.original_title}</label>
                </div>
              </div>
            );
          })}
      </div>
      {message.show && <Toast toastData={message.toastData} />}
    </div>
  );
};

export default MovieCards;
