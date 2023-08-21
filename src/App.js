import { Routes, Route } from "react-router-dom";
import MovieHome from "./Component/MovieHome/MovieHome";
import About from "./Component/About/About";
import ErrorPage from "./Component/ErrorPage/ErrorPage";
import MovieFavorite from "./Component/MovieFavorite/MovieFavorite";
import MovieViewDetails from "./Component/MovieViewDetails/MovieViewDetails";
import moviePlaylist from "./Component/MoviePlaylist/moviePlaylist";
import MovieCollection from "./Component/MovieCollection/movieCollection";

function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" Component={MovieHome} />
        <Route path="/favoritemovie" Component={MovieFavorite} />
        <Route path="/viewdetails" Component={MovieViewDetails} />
        <Route path="/playlist" Component={moviePlaylist} />
        <Route path="/collection" Component={MovieCollection} />
        <Route path="/aboutus" Component={About} />
        <Route Component={ErrorPage} />
      </Routes>
    </main>
  );
}

export default App;
