import { Routes, Route } from "react-router-dom";
import MovieHome from "./Component/MovieHome/MovieHome";
import About from "./Component/About/About";
import ErrorPage from "./Component/ErrorPage/ErrorPage";
import MovieFavorite from "./Component/MovieFavorite/MovieFavorite";
function App() {
  return (
    <main className="App">
      <Routes>
        <Route path="/" Component={MovieHome} />
        <Route path="/favoritemovie" Component={MovieFavorite} />
        <Route path="/aboutus" Component={About} />
        <Route Component={ErrorPage} />
      </Routes>
    </main>
  );
}

export default App;
