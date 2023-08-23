import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FaRegMehRollingEyes } from "react-icons/fa";
//actions
import { fetchAllMovies, setmovies } from "../../Store/Slices/MovieSlice";
//common components
import MovieHeader from "../../CommonComponent/Headers/MovieHeader";
import MovieFooter from "../../CommonComponent/Footers/MovieFooter";
import { SpinnerHoc } from "../../CommonComponent/SpinnerHOC/SpinnerHoc";
// components
import MovieCards from "../MovieCards/MovieCards";
import MoviePagination from "../../CommonComponent/Pagination/MoviePagination";
import { bannerImage } from "../../Utils/Carousal/constants";
//style
import "./MovieHome.scss";

const MovieHome = ({ setIsLoading }) => {
  const dispatch = useDispatch();
  const [movieData, setMovieData] = useState({
    movies: [],
    error: null,
  });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [searchInput, setSearchInput] = useState("");

  useEffect(
    () => {
      setIsLoading(true);
      dispatch(fetchAllMovies({ page, fetchAllMoviesCallback }));
    },
    [page, searchInput === ""],
    []
  );

  const fetchAllMoviesCallback = (response, status, message) => {
    if (status === 200) {
      setIsLoading(false);
      console.log("🚀 response:", response);
      setMovieData({ ...movieData, movies: response.results });
      setTotalPages(response.total_pages);
      setPage(response.page);
      dispatch(setmovies(response));
    } else {
      setIsLoading(false);
      console.log(message);
      setMovieData({
        ...movieData,
        error: message,
      });
    }
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
