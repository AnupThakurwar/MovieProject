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

  const fetchMovie = () => {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=844dba0bfd8f3a4f3799f6130ef9e335&language=en-US&page=${page}`;
    axios
      .get(url)
      .then((response) => {
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
    setSearchInput(value);
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
      />
      {movieData?.length > 0 ? (
        <MovieCards movieData={movieData} />
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