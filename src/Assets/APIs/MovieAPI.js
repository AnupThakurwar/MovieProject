import axios from "axios";

export const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org",
});
