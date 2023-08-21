export const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

export const movie_genre = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  ScienceFiction: 878,
  TvMovie: 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

// export const movie_genre = {
//   28: "Action",
//   12: "Adventure",
//   16: "Animation",
//   35: "Comedy",
//   80: " Crime",
//   99: "Documentary",
//   18: "Drama",
//   10751: "Family",
//   14: "Fantasy",
//   36: "History",
//   27: "Horror",
//   10402: "Music",
//   9648: "Mystery",
//   10749: "Romance",
//   878: "ScienceFiction",
//   10770: "ScienceFiction",
//   53: "Thriller",
//   10752: "War",
//   37: " Western",
// };

//apis
//for upcoming movies
// const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;
//for finding the case info
// const url = `https://api.themoviedb.org/3/search/person?api_key=${process.env.REACT_APP_API_KEY}&searxh_type=ngram&query=jason&language=en-US&page=${page}`;
// for finding movie cast
// const url = `https://api.themoviedb.org/3/movie/298618?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}&append_to_response=credits`;
//for videos
// const url = `https://api.themoviedb.org/3/movie/496450/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;
// const url1 = `https://api.themoviedb.org/3/movie/streaming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;
