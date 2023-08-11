import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function ActorItem({ actor }) {
  return (
    <Card sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Link to={`/actors/${actor.id}`}>
        <CardMedia
          component="img"
          alt={actor.name}
          src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
          sx={{ objectFit: "cover", maxHeight: "300px" }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h6" gutterBottom>
            {actor.name}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}

export default ActorItem;
