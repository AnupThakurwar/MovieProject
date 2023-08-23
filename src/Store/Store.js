import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./Slices/MovieSlice";

export const store = configureStore({
  reducer: movieReducer,
});
