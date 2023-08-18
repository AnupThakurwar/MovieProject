import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegMehRollingEyes } from "react-icons/fa";
//common components
import MovieHeader from "../../CommonComponent/Headers/MovieHeader";
import MovieFooter from "../../CommonComponent/Footers/MovieFooter";
// components
import MovieCards from "../MovieCards/MovieCards";
import MoviePagination from "../../CommonComponent/Pagination/MoviePagination";
//style
import "./MovieHome.scss";
import Slider from "react-slick";
import { settings } from "../../Utils/Carousal/constants";

const MovieHome = () => {
  const [movieData, setMovieData] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  useEffect(
    () => {
      fetchMovie();
    },
    [page, searchInput === ""],
    []
  );

  const bannerImage =
    "https://cdn.pixabay.com/photo/2020/04/20/18/10/cinema-5069314_1280.jpg";

  const fetchMovie = () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;
    //for upcoming movies
    // const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;
    //for finding the case info
    // const url = `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_KEY}&searxh_type=ngram&query=jason&language=en-US&page=${page}`;
    // for finding movie cast
    // const url = `https://api.themoviedb.org/3/movie/298618?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&append_to_response=credits`;
    //for videos
    // const url = `https://api.themoviedb.org/3/movie/496450/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;
    // const url1 = `https://api.themoviedb.org/3/movie/streaming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;
    axios
      .get(url)
      .then((response) => {
        console.log("🚀 response:", response);
        setMovieData(response.data.results);
        setTotalPages(response.data.total_pages);
        setPage(response.data.page);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  const onChangeHandler = (e) => {
    if (e.target.value > 0) {
      setPage(+e.target.value);
    } else {
      setPage(1);
    }
  };

  const searchHandler = (e) => {
    const value = e.target.value;
    setSearchInput(value.toLowerCase());
    console.log("first");
    if (e.key === "Enter") {
      console.log("first");
    }
  };

  const onSearchClick = () => {
    const fiterMovie = [...movieData];
    let item = fiterMovie.filter((movies) => {
      return searchInput.toLowerCase() === ""
        ? movies
        : movies.title.toLowerCase().includes(searchInput);
    });
    setMovieData(item);
  };

  return (
    <div>
      <MovieHeader
        searchHandler={searchHandler}
        onSearchClick={onSearchClick}
        showBanner={true}
        bannerImage={bannerImage}
      />
      {movieData?.length > 0 ? (
        <Slider {...settings}>
          <MovieCards movieData={movieData} />
        </Slider>
      ) : (
        <div className="error-container">
          <h1>Oops! No movie found</h1>
          <FaRegMehRollingEyes className="ops-icon" />
          <p> Clear search & try again</p>
        </div>
      )}
      <MoviePagination
        currentPage={page}
        TotalPages={totalPages}
        previousPage={() => (page < 2 ? setPage(1) : setPage(page - 1))}
        nextPage={() => (page < totalPages ? setPage(page + 1) : setPage(1))}
        onChange={onChangeHandler}
      />
      <MovieFooter />
    </div>
  );
};

export default MovieHome;
