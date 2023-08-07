import React, { useState } from "react";
import MovieHeader from "../../CommonComponent/Headers/MovieHeader";
import MovieFooter from "../../CommonComponent/Footers/MovieFooter";
import { useMovieContext } from "../../Assets/Context/movieContext";
import { FaStar, FaStarHalf, FaTrash, FaSadTear } from "react-icons/fa";
import "./MovieFavorite.scss";

const MovieFavorite = () => {
  const { favoriteMovie, deleteFavMovie } = useMovieContext();
  const [favMovie, setFavMovie] = useState(favoriteMovie);

  const Img = `https://image.tmdb.org/t/p/w500`;
  const stars = [...Array(11)];

  const deleteHandler = (deletemovie) => {
    let deleteList = favoriteMovie.filter((movie) => {
      return movie.title !== deletemovie.title;
    });
    deleteFavMovie(deletemovie);
    setFavMovie(deleteList);
  };

  return (
    <div>
      <MovieHeader />
      <div>
        <div className="favoritemovie-maincontainer">
          {favMovie?.length > 0 ? (
            favMovie.map((movie) => {
              return (
                <div key={movie.id} className="favorite-card-container">
                  <img
                    src={Img + movie.poster_path}
                    alt="movie_Image"
                    className="fav-cards-image"
                  />
                  <div className="fav-cards-details-container">
                    <label className="fav-cards-label">
                      {movie.original_title}
                    </label>
                    <div className="fav-buttons-rating-container">
                      <div className="fav-cards-ranking">
                        {stars.map((ele, index) => {
                          if (Math.floor(movie.vote_average) < index) {
                            return null;
                          } else if (
                            Math.floor(movie.vote_average) === index &&
                            movie.vote_average % 1 !== 0
                          ) {
                            return (
                              <FaStarHalf key={index} className="fa-star" />
                            );
                          }
                          return <FaStar key={index} className="fa-star" />;
                        })}
                        {+movie.vote_average}
                      </div>
                    </div>
                    <div className="delete-fav-movie">
                      <button
                        className="delete-btn"
                        onClick={() => deleteHandler(movie)}
                      >
                        <label htmlFor="" className="delete-title">
                          Remove from List
                        </label>
                        <span className="ms-2 fa-delete">
                          <FaTrash />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-favlist-container">
              <div className="no-favicon">
                <FaSadTear />
              </div>
              <div className="no-fav-text">
                <label htmlFor="">
                  Sorry no Movies are added to Favorite List{" "}
                </label>
                <div>please add movies from home page</div>
              </div>
            </div>
          )}
        </div>
      </div>
      <MovieFooter />
    </div>
  );
};

export default MovieFavorite;
