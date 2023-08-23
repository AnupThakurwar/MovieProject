import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movieApi } from "../../Assets/APIs/MovieAPI";

export const fetchAllMovies = createAsyncThunk(
  "movie/fetchAllMovies",
  async ({ page, fetchAllMoviesCallback }) => {
    const results = await movieApi.get(
      `/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
    );
    fetchAllMoviesCallback(
      results.data,
      results.status,
      results.status_message
    );
    return results.data;
  }
);

export const fetchMoviebyId = createAsyncThunk(
  "movie/fetchMoviebyId",
  async ({ params, fetchMoviebyIdCallback }) => {
    const results = await movieApi.get(
      `3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&append_to_response=images,releases,credits,videos&include_image_language=en,null`
    );
    const watchProviders = await movieApi.get(
      `3/movie/${params.id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}&include_image_language=en,null`
    );
    fetchMoviebyIdCallback(
      results.data,
      watchProviders.data,
      results.status,
      results.status_message
    );
    return results.data;
  }
);

export const collectionMovie = createAsyncThunk(
  "movie/collectionMovie",
  async ({ params, collectionMovieCallback }) => {
    const results = await movieApi.get(
      `3/movie/${params.id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=images,credits,releases,collections&language=en-US&include_image_language=en,null`
    );
    const collectionnResults = await movieApi.get(
      `3/collection/${params.colid}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=images,credits,releases,collections&language=en-US&include_image_language=en,null`
    );
    collectionMovieCallback(
      results.data,
      collectionnResults.data,
      results.status,
      results.status_message
    );
    return results.data;
  }
);

const initialState = {
  movie: {},
  favMovie: [],
  movieById: {},
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setmovies: (state, { payload }) => {
      state.movie = payload;
    },
    setMoviesById: (state, { payload }) => {
      state.movieById = payload;
    },
    setFavoriteMovie: (state, { payload }) => {
      if (!state.favMovie.find((movie) => movie.title === payload.title))
        state.favMovie.push(payload);
    },
    removeFavoriteMovie: (state, { payload }) => {
      state.favMovie = payload;
    },
  },
});

export const {
  setmovies,
  setMoviesById,
  setFavoriteMovie,
  removeFavoriteMovie,
} = movieSlice.actions;
export default movieSlice.reducer;
