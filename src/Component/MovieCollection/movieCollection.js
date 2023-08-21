import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCircle, FaStar, FaStarHalf } from "react-icons/fa";
import MovieHeader from "../../CommonComponent/Headers/MovieHeader";
import MovieFooter from "../../CommonComponent/Footers/MovieFooter";
import "./movieCollection.scss";
import { SpinnerHoc } from "../../CommonComponent/SpinnerHOC/SpinnerHoc";

function MovieCollection({ setIsLoading }) {
  const img = `https://image.tmdb.org/t/p/original/`;
  const details = localStorage.getItem("movieDetail");
  const movieDetails = JSON.parse(details);

  const [collection, setCollection] = useState({
    data: [],
    error: null,
    collectionDetails: [],
  });
  useEffect(() => {
    fetchCollection();
  }, []);

  useEffect(() => {
    if (collection?.data?.belongs_to_collection?.id) fetchCollectionDetails();
  }, [collection.data]);

  const fetchCollectionDetails = () => {
    setIsLoading(true);
    const collectionUrl = `https://api.themoviedb.org/3/collection/${collection?.data?.belongs_to_collection?.id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=images,credits,releases,collections&language=en-US&include_image_language=en,null`;
    axios
      .get(collectionUrl)
      .then((response) => {
        setIsLoading(false);
        // console.log(response.data, "resp");
        if (response.status === 200)
          setCollection({
            ...collection,
            collectionDetails: response.data,
          });
      })
      .catch((error) => {
        setIsLoading(false);
        setCollection({
          ...collection,
          data: error.message,
        });
      });
  };

  const fetchCollection = () => {
    setIsLoading(true);
    const url = `https://api.themoviedb.org/3/movie/${movieDetails.id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=images,credits,releases,collections&language=en-US&include_image_language=en,null`;
    axios
      .get(url)
      .then((response) => {
        setIsLoading(false);
        setCollection({
          ...collection,
          data: response.data,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        setCollection({
          ...collection,
          error: error.data,
        });
      });
  };

  return (
    <div>
      <MovieHeader />
      <div className="collection-main-container">
        <div className="collection-container">
          <div className="collection-backdrop">
            <img
              src={img + collection.data.belongs_to_collection?.backdrop_path}
              alt="collection_Backdrop_Image"
              className="backdrop-image"
            />
          </div>

          <div className="collection-information">
            <div className="collection-poster">
              <img
                src={img + collection.data.belongs_to_collection?.poster_path}
                alt="poster_path"
                className="poster_image"
              />
            </div>
            <div className="collection-details">
              <label className="collection-label">
                {collection.data.title}
              </label>
              <div className="collection-facts">
                <div className="genere">
                  {collection?.data?.genres?.length > 0 &&
                    collection?.data?.genres.map((genres) => {
                      return (
                        <div
                          key={genres.id}
                          className="d-flex align-items-center"
                        >
                          <FaCircle className="fa-circle" />
                          <div>{genres.name}</div>
                        </div>
                      );
                    })}
                </div>
                <div className="rating">
                  {[...Array(11)].map((ele, index) => {
                    if (Math.floor(collection.data.vote_average) < index) {
                      return null;
                    } else if (
                      Math.floor(collection.data.vote_average) === index &&
                      collection.data.vote_average % 1 !== 0
                    ) {
                      return <FaStarHalf key={index} className="fa-star" />;
                    }
                    return <FaStar key={index} className="fa-star" />;
                  })}
                </div>
                <div className="overview">
                  <label className="collection-sublabel">Overview</label>
                  <div> {collection.data.overview}</div>
                </div>
                <div className="revenue">
                  <label className="collection-sublabel me-1">Revenue :</label>
                  <span>{collection.data.revenue} $</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cast-container">
          <label className="featured-cast">Featured Cast</label>
          <div className="card-details">
            {collection?.data?.credits?.cast?.length > 0 &&
              collection?.data?.credits?.cast?.slice(0, 15).map((members) => {
                return (
                  <div className="card-character" key={members.id}>
                    <div className="card-image">
                      <img
                        src={img + members.profile_path}
                        className="cast-image"
                        alt="cast_image"
                      />
                    </div>
                    <div className="card-info">
                      <div className="actor-name">{members.name}</div>
                      <div className="actor-detail">{members.character}</div>
                    </div>
                  </div>
                );
              })}
          </div>
          <hr />
        </div>
        <div className="crew-container">
          <label className="featured-cast">Featured crew</label>
          <div className="card-details">
            {collection?.data?.credits?.crew?.length > 0 &&
              collection?.data?.credits?.crew?.slice(0, 5).map((members) => {
                return (
                  <div className="card-character">
                    <div className="card-image">
                      <img
                        src={img + members.profile_path}
                        className="cast-image"
                        alt="cast_image"
                      />
                    </div>
                    <div className="card-info">
                      <div className="actor-name">{members.name}</div>
                      <div className="actor-detail">{members.job}</div>
                    </div>
                  </div>
                );
              })}
          </div>
          <hr />
        </div>
        <div className="number-of-movie-container">
          <label className="featured-cast">movies</label>
          <div className="collection-parts">
            {collection?.collectionDetails?.parts?.length > 0 &&
              collection.collectionDetails.parts.map((movies) => {
                return (
                  <div className="postercard">
                    <div className="postercard-image">
                      <img
                        src={img + movies.poster_path}
                        alt=""
                        className="poster-image"
                      />
                    </div>
                    <div className="postercard-details">
                      <div className="title">{movies.title}</div>
                      <div className="release_date">{movies.release_date}</div>
                      <div className="overview">{movies.overview}</div>
                    </div>
                  </div>
                );
              })}
          </div>

          <hr />
        </div>
      </div>
      <MovieFooter />
    </div>
  );
}

export default SpinnerHoc(MovieCollection);
