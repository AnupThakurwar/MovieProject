import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setMoviesById } from "../../Store/Slices/MovieSlice";
//common component
import Toast from "../../CommonComponent/Toast/Toast";
import { img500 } from "../../Utils/Carousal/constants";
import "./MovieCards.scss";

const MovieCards = ({ movieData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(setMoviesById(movie));
    navigate(`/viewdetails/${movie.id}`);
  };

  return (
    <div className="detail-card-main-container">
      <div className="cards-main-container">
        {movieData.length > 0 &&
          movieData.map((movie) => {
            return (
              <div className="cards-container" key={movie.original_title}>
                <img
                  src={img500 + movie.poster_path}
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
