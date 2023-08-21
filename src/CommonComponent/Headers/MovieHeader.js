import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaSmileBeam } from "react-icons/fa";
import "./MovieHeader.scss";
import { useMovieContext } from "../../Assets/Context/movieContext";
import BannerImage from "../BannerImage/bannerImage";
import PageThemeToggler from "../../Component/PageThemeToggler/pageThemeToggler";

const MovieHeader = ({
  searchHandler,
  onSearchClick,
  showBanner,
  bannerImage,
}) => {
  const classname = document.body.className;
  const { favoriteMovie } = useMovieContext();
  const [showNav, setShowNav] = useState(false);
  const [toggleTheme, setToggleTheme] = useState(classname);

  const navHandler = () => {
    setShowNav(!showNav);
  };

  const toggleCallback = (theme) => {
    if (theme) {
      setToggleTheme(theme);
    }
  };

  return (
    <div>
      <div className="header-searchnav-container">
        <div className="header-navigation">
          <nav className="navbar navbar-expand-lg">
            <Link className="navbar-brand" to="/">
              ReactMovies
            </Link>
            <button
              className={`navbar-toggler ${
                toggleTheme === "dark" && "bg-light"
              } }`}
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
                <Link
                  className={`nav-item nav-link active ${
                    toggleTheme === "light" ? "text-dark" : "text-light"
                  } }`}
                  to="/"
                >
                  Home
                </Link>
                <Link
                  className={`nav-item nav-link position-relative ${
                    toggleTheme === "light" ? "text-dark" : "text-light"
                  } }`}
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
                <Link
                  className={`nav-item nav-link ${
                    toggleTheme === "light" ? "text-dark" : "text-light"
                  } }`}
                  to="/playlist"
                >
                  Playlist
                </Link>
                <Link
                  className={`nav-item nav-link ${
                    toggleTheme === "light" ? "text-dark" : "text-light"
                  } }`}
                  to="/aboutus"
                >
                  About us
                </Link>
              </div>
              <PageThemeToggler toggleCallback={toggleCallback} />
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
