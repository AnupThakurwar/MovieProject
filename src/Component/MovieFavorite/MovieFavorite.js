import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavoriteMovie } from "../../Store/Slices/MovieSlice";
import MovieHeader from "../../CommonComponent/Headers/MovieHeader";
import MovieFooter from "../../CommonComponent/Footers/MovieFooter";
import { img500 } from "../../Utils/Carousal/constants";
import { FaTrash, FaSadTear } from "react-icons/fa";
import "./MovieFavorite.scss";

const MovieFavorite = () => {
  const dispatch = useDispatch();
  const favoriteMovie = useSelector((state) => state.favMovie);
  const [favMovie, setFavMovie] = useState(favoriteMovie);

  const deleteHandler = (deletemovie) => {
    let deleteList = favoriteMovie.filter((movie) => {
      return movie.title !== deletemovie.title;
    });
    dispatch(removeFavoriteMovie(deleteList));
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
                    src={img500 + movie.poster_path}
                    alt="movie_Image"
                    className="fav-cards-image"
                  />
                  <div className="fav-cards-details-container">
                    <label className="fav-cards-label">
                      {movie.original_title}
                    </label>

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
