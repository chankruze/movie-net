import React from "react";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  return (
    <Card
      sx={{
        margin: 2,
        width: 250,
        height: 320,
        borderRadius: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <img width="100%" height={"50%"} src={posterUrl} alt="" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          LinkComponent={Link}
          to={`/booking/${id}`}
          size="small"
          sx={{
            margin: "auto",
            bgcolor: "#1c0840",
            ":hover": {
              bgcolor: "#121217",
            },
          }}
          variant="contained"
          fullWidth
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
