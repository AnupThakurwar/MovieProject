import { createContext, useContext, useState } from "react";

const movieContext = createContext({
  favoriteMovie: [],
  getMovieById: () => {},
  moviebyId: [],
  getFavMovie: () => {},
  deleteFavMovie: () => {},
});

export const MovieContextProvider = ({ children }) => {
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  const [moviebyId, setSelectedMovie] = useState([]);
  const getFavMovie = (favMovie) => {
    if (!favoriteMovie.find((movie) => movie.title === favMovie.title)) {
      setFavoriteMovie([...favoriteMovie, favMovie]);
    }
  };
  const getMoviebyId = (movie) => {
    setSelectedMovie(movie);
  };
  const deleteFavMovie = (deletedMovie) => {
    const updatedList = favoriteMovie.filter(
      (movie) => movie.title !== deletedMovie.title
    );
    setFavoriteMovie(updatedList);
  };
  return (
    <movieContext.Provider
      value={{
        favoriteMovie,
        moviebyId,
        getFavMovie,
        getMoviebyId,
        deleteFavMovie,
      }}
    >
      {children}
    </movieContext.Provider>
  );
};

export const useMovieContext = () => {
  const {
    favoriteMovie,
    moviebyId,
    getFavMovie,
    getMoviebyId,
    deleteFavMovie,
  } = useContext(movieContext);
  return {
    favoriteMovie,
    moviebyId,
    getFavMovie,
    getMoviebyId,
    deleteFavMovie,
  };
};
