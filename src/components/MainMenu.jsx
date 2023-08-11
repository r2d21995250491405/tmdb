import React, { useCallback, useState } from "react";
import {
  useGetTopRatedMoviesQuery,
  useGetTrendingMoviesQuery,
  useSearchMoviesByNameQuery,
} from "../apis/movieApi";
import debounce from "lodash.debounce";
import {
  useGetPopularActorsQuery,
  useSearchActorByNameQuery,
} from "../apis/actorApi";
import MovieItem from "./MovieItem";
import ActorItem from "./ActorItem";
import {
  Container,
  Typography,
  Grid,
  Tabs,
  Tab,
  TextField,
  Pagination,
  CircularProgress,
} from "@mui/material";

function MainMenu() {
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [searchQueryActor, setSearchQueryActor] = useState("");
  const [searchQueryMovie, setSearchQueryMovie] = useState("");

  const {
    data: movieData,
    error: movieError,
    isLoading: movieLoading,
  } = useGetTrendingMoviesQuery();

  const {
    data: actorData,
    error: actorError,
    isLoading: actorLoading,
  } = useGetPopularActorsQuery(page);

  const { data, isLoading, error } =
    useSearchActorByNameQuery(searchQueryActor);
  const {
    data: searchedMovie,
    isLoading: searchedMovieisLoading,
    error: searchedMovieError,
  } = useSearchMoviesByNameQuery(searchQueryMovie);

  const {data: topRated,
    isLoading: topRatedisLoading,
    error: topRatedError,} = useGetTopRatedMoviesQuery(page);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleOnChangeActor = (e) => setSearchQueryActor(e.target.value);
  const debouncedFnActors = debounce(handleOnChangeActor, 500);
  const handleOnChangeMovie = (e) => setSearchQueryMovie(e.target.value);
  const debouncedFnMovie = debounce(handleOnChangeMovie, 500);

  return (
    <Container
      fixed
      sx={{ position: "absolute", top: 0, left: 0, marginLeft: 50 }}
    >
      <Typography variant="h4" gutterBottom>
        Popular Content
      </Typography>
      <Tabs
        TabIndicatorProps={{ style: { display: 'flex' } }}
        sx={{
          marginBottom: 3,
          padding: "10px",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "white",
        }}
        value={activeTab}
        onChange={handleTabChange}
      >
        <Tab sx={{ '&.MuiTab-root:focus': { outline: 'none' } }} label="Trending" />
        <Tab sx={{ '&.MuiTab-root:focus': { outline: 'none' } }} label="Top Rated" />
        <Tab sx={{ '&.MuiTab-root:focus': { outline: 'none' } }} label="Popular Actors" />
        <Tab sx={{ '&.MuiTab-root:focus': { outline: 'none' } }} label="Search Actor" />
        <Tab sx={{ '&.MuiTab-root:focus': { outline: 'none' } }} label="Search Movie" />
      </Tabs>
      {activeTab === 0 && (
        <Grid container spacing={3} className="content-grid">
          {movieLoading && <CircularProgress sx={{ margin: "0 auto" }} />}
          {movieError && <p>Error: {movieError.message}</p>}
          {movieData &&
            movieData.results.map((movie) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                <MovieItem movie={movie} />
              </Grid>
            ))}
        </Grid>
      )}
      {activeTab === 1 && (
        <>
          <Pagination
            sx={{ marginBottom: 1 }}
            count={topRated?.total_pages || 1}
            page={page}
            onChange={(event, value) => setPage(value)}
            shape="rounded"
          />
          <Grid container spacing={3} className="content-grid">
            {topRatedisLoading && <CircularProgress sx={{ margin: "0 auto" }} />}
            {topRatedError && <p>Error: {topRatedError.message}</p>}
            {topRated &&
              topRated.results.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                  <MovieItem movie={movie} />
                </Grid>
              ))}
          </Grid>
        </>
      )}
      {activeTab === 2 && (
        <>
          <Pagination
            sx={{ marginBottom: 1 }}
            count={actorData?.total_pages || 1}
            page={page}
            onChange={(event, value) => setPage(value)}
            shape="rounded"
          />
          <Grid container spacing={3} className="content-grid">
            {actorLoading && <CircularProgress />}
            {actorError && <p>Error: {actorError.message}</p>}
            {actorData &&
              actorData.results.map((actor) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={actor.id}>
                  <ActorItem actor={actor} />
                </Grid>
              ))}
          </Grid>
        </>
      )}
      {activeTab === 3 && (
        <div>
          <TextField
            sx={{ marginBottom: 2 }}
            label="Input actor name..."
            onChange={debouncedFnActors}
            variant="outlined"
            size="small"
            fullWidth
          />
          <Grid container spacing={3} className="content-grid">
            {isLoading && <CircularProgress />}
            {error && <p>Error: {error.message}</p>}
            {data &&
              data.results.map((actor) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={actor.id}>
                  <ActorItem actor={actor} />
                </Grid>
              ))}
          </Grid>
        </div>
      )}
      {activeTab === 4 && (
        <div>
          <TextField
            sx={{ marginBottom: 2 }}
            label="Input film name..."
            onChange={debouncedFnMovie}
            variant="outlined"
            size="small"
            fullWidth
          />
          <Grid container spacing={3} className="content-grid">
            {searchedMovieisLoading && <CircularProgress />}
            {searchedMovieError && <p>Error: {error.message}</p>}
            {searchedMovie &&
              searchedMovie.results.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                  <MovieItem movie={movie} />
                </Grid>
              ))}
          </Grid>
        </div>
      )}
    </Container>
  );
}

export default MainMenu;
