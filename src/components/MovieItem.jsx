import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom'; 


function MovieItem({ movie }) {
  return (
    <Card className="movie-card">
      <Link to={`/movie/${movie.id}`}> 
        <CardMedia
          component="img"
          alt={movie.title}
          height="auto"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        />
        <CardContent>
          <Typography variant="h6" gutterBottom>
            {movie.title}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}

export default MovieItem;
