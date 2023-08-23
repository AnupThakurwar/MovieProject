import { Routes, Route, BrowserRouter } from "react-router-dom";
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
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={MovieHome} />
          <Route path="/favoritemovie" Component={MovieFavorite} />
          <Route path="/viewdetails/:id" Component={MovieViewDetails} />
          <Route path="/playlist" Component={moviePlaylist} />
          <Route path="/collection/:id/:colid" Component={MovieCollection} />
          <Route path="/aboutus" Component={About} />
          <Route Component={ErrorPage} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
