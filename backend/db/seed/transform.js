const fs = require("fs");
const path = require("path");
const movies = require("./data");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Sample transformation function
function transformData(moviesArray) {
  // Fixed adminId
  const adminId = "66e71ba97a4cf8884ecf078d";

  const filteredMovies = moviesArray.filter(
    (movie) =>
      movie.title &&
      movie.poster &&
      movie.plot &&
      movie.hasOwnProperty("released") &&
      typeof movie.released.$date === "string"
  );

  // Shuffle the filtered movies
  const shuffledMovies = shuffle(filteredMovies);

  // Pick the first 1000 movies
  const selectedMovies = shuffledMovies.slice(0, 1000);

  return selectedMovies.map((movie) => ({
    title: movie.title,
    description: movie.plot, // Choose available description
    releaseDate: movie.released.$date,
    posterUrl: movie.poster, // Use poster or empty string if not present
    adminId: adminId,
    actors: movie.cast,
  }));
}

// Transform and shuffle
const transformedMovies = transformData(movies);
console.log(`Transformed and selected ${transformedMovies.length} movies.`);

// write to a file
const filePath = path.join(__dirname, "movies.json");
const fileContent = JSON.stringify(transformedMovies, null, 2);
fs.writeFileSync(filePath, fileContent);
