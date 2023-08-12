import React, { useEffect, useState } from "react";
//common component
import Toast from "../../CommonComponent/Toast/Toast";
import { FaStar, FaStarHalf, FaHeart, FaFilm } from "react-icons/fa";
import { useMovieContext } from "../../Assets/Context/movieContext";
import "./MovieCards.scss";
import { useNavigate } from "react-router-dom";

const MovieCards = ({ movieData }) => {
  const navigate = useNavigate();
  const { getFavMovie, getMoviebyId } = useMovieContext();
  const Img = `https://image.tmdb.org/t/p/w500`;
  const [showDetails, setShowDetails] = useState(false);
  const [message, setMessge] = useState({
    toastData: null,
    show: false,
  });
  const stars = [...Array(11)];

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
    setShowDetails(true);
    localStorage.setItem("movieDetail", JSON.stringify(movie));
    getMoviebyId(movie);
    navigate("viewdetails");
  };

  const AddfavoriteHandler = (movie) => {
    getFavMovie(movie);
    setMessge({ ...message, show: true, toastData: movie });
  };

  const closeHandler = () => {
    setShowDetails(false);
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
                  {/* <div className="buttons-rating-container">
                    <div className="cards-ranking">
                      {stars.map((ele, index) => {
                        if (Math.floor(movie.vote_average) < index) {
                          return null;
                        } else if (
                          Math.floor(movie.vote_average) === index &&
                          movie.vote_average % 1 !== 0
                        ) {
                          return <FaStarHalf key={index} className="fa-star" />;
                        }
                        return <FaStar key={index} className="fa-star" />;
                      })}
                      {+movie.vote_average}
                    </div>
                    <div
                      className={
                        showDetails
                          ? "buttons-container d-block "
                          : "buttons-container"
                      }
                    >
                      <button
                        className="view-details-btn"
                        onClick={() => viewDetailsHandler(movie)}
                      >
                        <label htmlFor=""> View Details</label>
                        <span className="ms-2">
                          <FaFilm className="fa-film" />
                        </span>
                      </button>
                      <button
                        className="add-to-fav-btn"
                        id="liveToast"
                        onClick={() => AddfavoriteHandler(movie)}
                      >
                        <label htmlFor=""> Add to Favorite</label>
                        <span className="ms-2">
                          <FaHeart className="fa-heart" />
                        </span>
                      </button>
                    </div>
                  </div> */}
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
