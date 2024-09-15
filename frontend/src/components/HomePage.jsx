import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../apiservice/apiservice";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  });
  return (
    <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2}>
      <Box margin={"auto"} width={"80%"} height={"50vh"} padding={2}>
        <img
          src="https://xl.movieposterdb.com/24_05/2024/11389872/xl_kingdom-of-the-planet-of-the-apes-movie-poster_f0a0b62e.jpg"
          alt="Godzilla"
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} textAlign={"center"}>
        <Typography variant="h4" textAlign={"center"}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        display={"flex"}
        width={"80%"}
        justifyContent={"center"}
        flexWrap={"wrap"}
        margin={"auto"}
        alignItems={"center"}
      >
        {movies &&
          movies
            .slice(0, 4)
            .map((movie, index) => (
              <MovieItem
                id={movie._id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
                key={index}
              />
            ))}
      </Box>
      <Box display={"flex"} padding={5} margin={"auto"}>
        <Button
          variant="outlined"
          sx={{ margin: "auto", color: "#2b242" }}
          LinkComponent={Link}
          to="/movies"
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
