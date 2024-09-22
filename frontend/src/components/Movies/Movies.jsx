import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllMovies } from "../../apiservice/apiservice";
import MovieItem from "./MovieItem";

const Movies = () => {
  const [movies, setMovies] = useState();
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box sx={{
      padding: 4
    }}>
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        bgcolor={"#1f92b5"}
        color="white"
        textAlign={"center"}
      >
        All Movies
      </Typography>
      <Box sx={{
        marginTop: 4,
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",    // 1 column for mobile (xs)
          md: "repeat(3, 1fr)",  // 3 columns for medium screens (md)
          lg: "repeat(5, 1fr)",  // 4 columns for large screens (lg)
        },
        gap: 2,  // Optional: Add gap between grid items
      }}>
        {movies &&
          movies.map((movie, index) => (
            <MovieItem
              key={index}
              id={movie._id}
              posterUrl={movie.posterUrl}
              releaseDate={movie.releaseDate}
              title={movie.title}
            />
          ))}
      </Box>
    </Box >
  );
};

export default Movies;
