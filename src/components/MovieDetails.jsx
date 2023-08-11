import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetMovieDetailsQuery } from "../apis/movieApi";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Button,
  CircularProgress,
} from "@mui/material";

function MovieDetails() {
  const navigate = useNavigate();
  const { movieId } = useParams();
  const { data, error, isLoading } = useGetMovieDetailsQuery(movieId);

  const goBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (data) {
    return (
      <Container>
        <Button
          sx={{ position: "absolute", top: "10%", left: "6%" }}
          variant="outlined"
          onClick={goBack}
        >
          Go Back
        </Button>
        <Card sx={{ display: "flex", flexDirection: "row" }}>
          <CardMedia
            component="img"
            alt={data.title}
            src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
            sx={{ width: "30%", objectFit: "cover" }}
          />
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {data.title}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {data.overview}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Genres:{" "}
              {data.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  sx={{ marginRight: 1 }}
                />
              ))}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Rating: {data.vote_average}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
              Duration: {data.runtime} min
            </Typography>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return null;
}

export default MovieDetails;
