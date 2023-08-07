import { createContext, useContext, useState } from "react";

const movieContext = createContext({
  favoriteMovie: [],
  getFavMovie: () => {},
  deleteFavMovie: () => {},
});

export const MovieContextProvider = ({ children }) => {
  const [favoriteMovie, setFavoriteMovie] = useState([]);
  const getFavMovie = (favMovie) => {
    if (!favoriteMovie.find((movie) => movie.title === favMovie.title)) {
      setFavoriteMovie([...favoriteMovie, favMovie]);
    }
  };
  const deleteFavMovie = (deletedMovie) => {
    const updatedList = favoriteMovie.filter(
      (movie) => movie.title !== deletedMovie.title
    );
    setFavoriteMovie(updatedList);
  };
  return (
    <movieContext.Provider
      value={{ favoriteMovie, getFavMovie, deleteFavMovie }}
    >
      {children}
    </movieContext.Provider>
  );
};

export const useMovieContext = () => {
  const { favoriteMovie, getFavMovie, deleteFavMovie } =
    useContext(movieContext);
  return { favoriteMovie, getFavMovie, deleteFavMovie };
};
