import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetActorByIdQuery } from "../apis/actorApi";
import {
  Container,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  CircularProgress
} from "@mui/material";

function ActorDetails() {
  const { actorId } = useParams();
  const { data, error, isLoading } = useGetActorByIdQuery(actorId);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); 
  };

  if (isLoading) {
    return <CircularProgress/>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }
  
  if (data) {
    return (
      <>
        <Button
          variant="outlined"
          onClick={goBack} 
          sx={{ position: "absolute", top: "10%", left: "6%" }}
        >
          Go Back
        </Button>
        <Container>
          <Card sx={{ display: "flex", flexDirection: "row" }}>
            <CardMedia
              component="img"
              alt={data.name}
              src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
              sx={{ width: "30%", objectFit: "cover" }}
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <Typography variant="h5" gutterBottom>
                {data.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {data.biography}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Popularity: {data.popularity}
              </Typography>
            </CardContent>
          </Card>
        </Container>
      </>
    );
  }

  return null;
}

export default ActorDetails;
