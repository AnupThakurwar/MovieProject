import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSmileBeam } from "react-icons/fa";
import "./MovieHeader.scss";
import { useMovieContext } from "../../Assets/Context/movieContext";
import BannerImage from "../BannerImage/bannerImage";

const MovieHeader = ({
  searchHandler,
  onSearchClick,
  showBanner,
  bannerImage,
}) => {
  const { favoriteMovie } = useMovieContext();
  const [showNav, setShowNav] = useState(false);

  const navHandler = () => {
    setShowNav(!showNav);
  };

  return (
    <div>
      <div className="header-searchnav-container">
        <div className="header-navigation">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">
              ReactMovies
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
              id="navbarNavAltMarkup"
            >
              <span className="navbar-toggler-icon" onClick={navHandler}></span>
            </button>
            <div
              className={
                showNav
                  ? "collapse navbar-collapse show"
                  : "collapse navbar-collapse"
              }
              id="navbarNavAltMarkup"
            >
              <div className="navbar-nav">
                <Link className="nav-item nav-link active" to="/">
                  Home
                </Link>
                <Link
                  className="nav-item nav-link position-relative"
                  to="/favoritemovie"
                >
                  Favorite
                  {favoriteMovie?.length > 0 && (
                    <span class="position-absolute translate-middle badge rounded-pill bg-danger">
                      {favoriteMovie?.length}
                      <span class="visually-hidden">unread messages</span>
                    </span>
                  )}
                </Link>
                <Link className="nav-item nav-link" to="/playlist">
                  Playlist
                </Link>
                <Link className="nav-item nav-link" to="/aboutus">
                  About us
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </div>
      {showBanner && (
        <BannerImage
          searchHandler={searchHandler}
          onSearchClick={onSearchClick}
          bannerImage={bannerImage}
        />
      )}
    </div>
  );
};

export default MovieHeader;
