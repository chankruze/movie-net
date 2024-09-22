const express = require("express");
const {
  addMovie,
  getMovies,
  getMovieById,
  getLatestMovies,
} = require("../controllers/movie.controller");
const movieRouter = express.Router();
movieRouter.get("/", getMovies);
movieRouter.get("/latest", getLatestMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", addMovie);
module.exports = movieRouter;
