import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaStar,
  FaStarHalf,
  FaCircle,
  FaHeart,
  FaList,
  FaPlusCircle,
  FaPlay,
  FaRegTimesCircle,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { movie_genre } from "../../Utils/Carousal/constants";
//common components
import MovieHeader from "../../CommonComponent/Headers/MovieHeader";
import MovieFooter from "../../CommonComponent/Footers/MovieFooter";
import "./MovieViewDetails.scss";
import { useMovieContext } from "../../Assets/Context/movieContext";
import Toast from "../../CommonComponent/Toast/Toast";
import { useNavigate } from "react-router-dom";

const MovieViewDetails = ({ showDetails = true, closeHandler }) => {
  const navigate = useNavigate();
  const img = `https://image.tmdb.org/t/p/original/`;
  const details = localStorage.getItem("movieDetail");
  const { getFavMovie } = useMovieContext();
  const viewDetails = JSON.parse(details);

  const [movie, setMovie] = useState([]);
  const [credits, setCredits] = useState([]);
  const [movieVideos, setMovieVideos] = useState([]);
  const [likeMovie, setLikeMovie] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [mediaType, setMediaType] = useState("backdrops");
  const [movieImages, setMovieImages] = useState([]);
  const [watchProvider, setWatchProvider] = useState([]);
  const [message, setMessge] = useState({
    toastData: null,
    show: false,
  });
  useEffect(() => {
    fetchMoviebyId();
    fetchCastIntobyId();
    fetchResponsebyVideo();
    fetchCastBio();
    fetchmovieImages();
    watchProviders();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (message.show)
        setMessge({
          ...message,
          show: false,
        });
    }, 3000);
  }, [message]);

  const watchProviders = () => {
    const url = `https://api.themoviedb.org/3/movie/${viewDetails.id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}&include_image_language=en,null`;
    axios
      .get(url)
      .then((response) => {
        console.log(response.data.results["IN"].flatrate, "media");
        setWatchProvider(response.data.results["IN"].flatrate);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchmovieImages = () => {
    const url = `https://api.themoviedb.org/3/movie/${viewDetails.id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=images&language=en-US&include_image_language=en,null`;
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data.images, "media");
        setMovieImages(response.data.images);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCastBio = () => {
    const url = `https://api.themoviedb.org/3/person/976-jason-statham?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=credits`;
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data, "cast bio");
        // setCredits(response.data.credits);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchCastIntobyId = () => {
    const url = `https://api.themoviedb.org/3/movie/${viewDetails.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=credits`;
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data, "credits");
        setCredits(response.data.credits);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchMoviebyId = () => {
    const url = `https://api.themoviedb.org/3/movie/${viewDetails.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=releases`;
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data, "release");
        setMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchResponsebyVideo = () => {
    const url = `https://api.themoviedb.org/3/movie/${viewDetails.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
    axios
      .get(url)
      .then((response) => {
        // console.log(response.data, "videos");
        setMovieVideos(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const genreFetched = viewDetails.genre_ids.map((genre) => {
    return Object.values(movie_genre).includes(genre)
      ? Object.keys(movie_genre).find((keys) => movie_genre[keys] === genre)
      : null;
  });

  const likeActionHandler = () => {
    setLikeMovie(!likeMovie);
  };

  const addfavoriteHandler = () => {
    getFavMovie(movie);
    setMessge({ ...message, show: true, toastData: movie });
  };

  const createPlaylistHandler = () => {
    getFavMovie(movie);
    navigate("/playlist");
  };

  const PlayTrailer = () => {
    const officialTrailer = movieVideos?.filter(
      (movie) => movie.type === "Trailer"
    );
    console.log(officialTrailer, "officialTrailer");
    return (
      <div className="play-container">
        <iframe
          title="flashs"
          className="iframe-video"
          src={`https://www.youtube.com/embed/${officialTrailer[0]?.key}`}
        ></iframe>
        <FaRegTimesCircle
          className="fa-cancle"
          onClick={() => setShowTrailer(false)}
        />
      </div>
    );
  };

  const MediaContainer = (props) => {
    switch (props.mediatype) {
      case "posters":
        return movieImages?.posters?.slice(0, 10)?.map((media) => {
          return (
            <div key={media.file_path}>
              <img src={img + media.file_path} alt="" className="media-image" />
            </div>
          );
        });
      case "backdrops":
        return movieImages?.backdrops?.slice(0, 10)?.map((media) => {
          return (
            <div key={media.file_path}>
              <img src={img + media.file_path} alt="" className="media-image" />
            </div>
          );
        });
      default:
        return movieVideos?.slice(0, 10)?.map((media) => {
          return (
            <div key={media.key}>
              <iframe
                width="520"
                height="315"
                title="flashs"
                className="media-image border-1"
                src={`https://www.youtube.com/embed/${media.key}`}
              ></iframe>
            </div>
          );
        });
    }
  };
  // console.log(movie, "movie");
  const viewCollectionDetails = () => {
    navigate("/collection");
  };

  return (
    <div className="view-details-main-container">
      <MovieHeader showBanner={false} />
      <div className={showDetails ? "detail-container" : "display-none"}>
        <div className="detail-image-container">
          <img
            src={img + [viewDetails.backdrop_path]}
            alt="details_Image"
            className="image-container"
          />
          <div className="image-sub-container">
            <div className="movie-card-container">
              <div className="movie-card-image">
                <img
                  src={img + viewDetails.poster_path}
                  alt="poster_image"
                  className="card-image"
                />
              </div>
            </div>
            <div className="movie-detail-container">
              <label htmlFor="" className="movie-label">
                {viewDetails.title}
                <span className="release-tag-name ms-2">
                  ({movie?.release_date?.split("-")[0]})
                </span>
              </label>

              <div className="facts">
                <div className="movie-certification">
                  <span className="certification-prefix me-2">
                    {movie?.releases?.countries[0].certification}
                  </span>
                </div>
                <div className="movie-release-date">{movie?.release_date}</div>
                <div className="movie-genere">
                  <span className="ps-1 dot">
                    <FaCircle />
                  </span>
                  <span className="ps-1 d-flex">
                    {genreFetched.map((ele) => {
                      return (
                        <div className="ps-1" key={ele}>
                          {ele}
                        </div>
                      );
                    })}
                  </span>
                </div>
                <div className="movie-time">
                  <span className="mx-1">
                    <FaCircle />
                  </span>
                  <span className="movie-hr-min">
                    {Math.floor(movie?.runtime / 60)}hr
                    {Math.floor(movie?.runtime % 60)}min
                  </span>
                </div>
              </div>
              <div className="rating-and-action-details">
                <div className="rating">
                  <label htmlFor="" className="ms-2 rating-label">
                    user
                  </label>{" "}
                  <span className="me-1 rating-label">rating</span>
                  {[...Array(11)].map((ele, index) => {
                    if (Math.floor(viewDetails.vote_average) < index) {
                      return null;
                    } else if (
                      Math.floor(viewDetails.vote_average) === index &&
                      viewDetails.vote_average % 1 !== 0
                    ) {
                      return <FaStarHalf key={index} className="fa-star" />;
                    }
                    return <FaStar key={index} className="fa-star" />;
                  })}
                </div>
                <div className="btn-container">
                  <button
                    className="favorite-list"
                    title="add to favorite"
                    onClick={() => addfavoriteHandler(movie)}
                  >
                    {<FaList />}
                  </button>
                  <button
                    className="like-button"
                    title="like Movie"
                    onClick={() => likeActionHandler(movie)}
                  >
                    {
                      <FaHeart
                        className={
                          likeMovie ? "text-danger Fa-heart" : "Fa-heart"
                        }
                      />
                    }
                  </button>
                  <button
                    className="create-list"
                    title="Create Movie List"
                    onClick={createPlaylistHandler}
                  >
                    {<FaPlusCircle />}
                  </button>
                </div>
                <div className="play-trailer">
                  <button
                    id="play-btn"
                    className="play-btn"
                    onClick={() => setShowTrailer(true)}
                  >
                    {<FaPlay />}
                  </button>
                  <label
                    htmlFor=""
                    className="play-title"
                    onClick={() => setShowTrailer(true)}
                  >
                    Play Trailer
                  </label>
                </div>
              </div>
              <div className="tag-line">
                <em className="tagline">{movie?.tagline}</em>
              </div>
              <div className="movie-description p-2">
                <label htmlFor="" className="overview-label">
                  Overview
                </label>
                <p className="description">{movie?.overview}</p>
              </div>
            </div>
          </div>
        </div>
        {showTrailer && <PlayTrailer />}
        <div className="detail-information-container">
          <div className="top-cast-container border">
            <label className="top-cast-title w-100">Top Billed Cast</label>
            <div className="credit-main-container">
              {credits?.cast?.slice(0, 13).map((cast) => {
                return (
                  <div className="credit-container" key={cast.cast_id}>
                    <div className="credit-image">
                      <img
                        src={img + cast.profile_path}
                        alt="profile_image"
                        className="cast-profile-image"
                      />
                    </div>
                    <div className="label-container">
                      <label htmlFor="" className="cast-name">
                        {cast.original_name}
                      </label>
                      <p className="cast-character">{cast.character}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <label htmlFor="" className="full-cast-crew-label">
              Full cast & Crew
            </label>
            <hr />
          </div>
          {movie?.belongs_to_collection !== null && (
            <div className="movie-collection-container">
              <label htmlFor="" className="collection-heading">
                Collection
              </label>
              <div className="collection-image-card">
                <img
                  src={
                    img +
                    (movie?.belongs_to_collection?.backdrop_path
                      ? movie?.belongs_to_collection?.backdrop_path
                      : movie.backdrop_path)
                  }
                  alt="collection-background"
                  className="collection-image"
                />
                <div className="collection-overlay-container">
                  <label htmlFor="" className="collection-label">
                    {movie?.belongs_to_collection?.name}
                  </label>
                  <p className="collection-subtext">{movie?.tagline}</p>
                  <button
                    className="collection-btn"
                    onClick={viewCollectionDetails}
                  >
                    View the collection
                  </button>
                </div>
              </div>
              <hr />
            </div>
          )}
          <div className="media-container">
            <div className="nav-label-container">
              <label htmlFor="" className="media-heading">
                Media
              </label>
              <div className="nav-container">
                <ul className="nav-list">
                  <li
                    className={
                      mediaType === "backdrops"
                        ? "nav-items active"
                        : "nav-items"
                    }
                    onClick={() => setMediaType("backdrops")}
                  >
                    BackDrops
                  </li>
                  <li
                    className={
                      mediaType === "posters" ? "nav-items active" : "nav-items"
                    }
                    onClick={() => setMediaType("posters")}
                  >
                    Poster
                  </li>

                  <li
                    className={
                      mediaType === "videos" ? "nav-items active" : "nav-items"
                    }
                    onClick={() => setMediaType("videos")}
                  >
                    Videos
                  </li>
                </ul>
              </div>
            </div>
            <div className="media-card-wrapper">
              {movieImages && <MediaContainer mediatype={mediaType} />}
            </div>
            <hr />
          </div>
          <div className="side-bar-container">
            <div className="sidebar-wrapper">
              <div className="social-links-container">
                <span>
                  <FaFacebook />
                </span>
                <span>
                  <FaTwitter />
                </span>
                <span>
                  <FaInstagram />
                </span>
              </div>
              <div className="labels-conatiner">
                <div className="status">
                  <label htmlFor="" className="title">
                    Status
                  </label>
                  <p className="value">{movie?.status}</p>
                </div>
                <div className="language">
                  <label htmlFor="" className="title">
                    Original Language
                  </label>
                  <p className="value">{movie.original_language}</p>
                </div>
                <div className="budget">
                  <label htmlFor="" className="title">
                    Budget
                  </label>
                  <p className="value">{movie.budget}$</p>
                </div>
                <div className="revenue">
                  <label htmlFor="" className="title">
                    Revenue
                  </label>
                  <p className="value">{movie.revenue}$</p>
                </div>
              </div>
              <hr />
              <div className="characters-container"></div>
            </div>
          </div>
        </div>
      </div>
      <MovieFooter />
      {message.show && <Toast toastData={message.toastData} />}
    </div>
  );
};

export default MovieViewDetails;
