import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import MovieDetails from "./components/MovieDetails";
import ActorDetails from "./components/ActorDetails";
import MainMenu from "./components/MainMenu";
// import MovieDetails from "./apis/components/MovieDetails";

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path="/actors/:actorId" element={<ActorDetails />} />
        <Route path="/movie/:movieId" element={<MovieDetails />} />
        <Route path="*" element={<p>Not Found 404</p>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
