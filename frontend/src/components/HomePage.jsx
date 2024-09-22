import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLatestMovies } from "../apiservice/apiservice";
import MovieItem from "./Movies/MovieItem";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getLatestMovies()
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
      <Box sx={{
        padding: 8,
        marginTop: 4,
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",    // 1 column for mobile (xs)
          md: "repeat(3, 1fr)",  // 3 columns for medium screens (md)
          lg: "repeat(4, 1fr)",  // 4 columns for large screens (lg)
        },
        gap: 2,  // Optional: Add gap between grid items
      }}>
        {movies &&
          movies
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
