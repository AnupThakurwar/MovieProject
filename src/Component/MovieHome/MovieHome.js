import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaRegMehRollingEyes } from "react-icons/fa";
//common components
import MovieHeader from "../../CommonComponent/Headers/MovieHeader";
import MovieFooter from "../../CommonComponent/Footers/MovieFooter";
import { SpinnerHoc } from "../../CommonComponent/SpinnerHOC/SpinnerHoc";
// components
import MovieCards from "../MovieCards/MovieCards";
import MoviePagination from "../../CommonComponent/Pagination/MoviePagination";
//style
import "./MovieHome.scss";

const MovieHome = ({ setIsLoading }) => {
  const [movieData, setMovieData] = useState({
    movies: [],
    error: null,
  });
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

    setIsLoading(true);
    axios
      .get(url)
      .then((response) => {
        setIsLoading(false);
        console.log("🚀 response:", response);
        setMovieData({ ...movieData, movies: response.data.results });
        setTotalPages(response.data.total_pages);
        setPage(response.data.page);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setMovieData({
          ...movieData,
          error: error,
        });
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
    if (e.key === "Enter") {
      setSearchInput(value.toLowerCase());
      onSearchClick();
    }
  };

  const onSearchClick = () => {
    const fiterMovie = [...movieData.movies];
    let item = fiterMovie.filter((movies) => {
      return searchInput.toLowerCase() === ""
        ? movies
        : movies.title.toLowerCase().includes(searchInput);
    });
    console.log(item, "item");
    setMovieData({
      ...movieData,
      movies: item,
    });
  };

  return (
    <div>
      <MovieHeader
        searchHandler={searchHandler}
        onSearchClick={onSearchClick}
        showBanner={true}
        bannerImage={bannerImage}
      />
      {movieData?.movies?.length > 0 ? (
        <MovieCards movieData={movieData?.movies} />
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

export default SpinnerHoc(MovieHome);
