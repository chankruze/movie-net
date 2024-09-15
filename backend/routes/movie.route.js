const express = require("express");
const {
  addMovie,
  getMovies,
  getMovieById,
} = require("../controllers/movie.controller");
const movieRouter = express.Router();
movieRouter.get("/", getMovies);
movieRouter.get("/:id", getMovieById);
movieRouter.post("/", addMovie);
module.exports = movieRouter;
