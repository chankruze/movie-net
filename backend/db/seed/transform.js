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

  // Transform each movie object
  const ten = moviesArray.slice(-10);

  return moviesArray
    .slice(-2000)
    .filter(
      (movie) =>
        movie.title &&
        movie.poster &&
        movie.plot &&
        movie.hasOwnProperty("released") &&
        movie.year > 2010
    )
    .map((movie) => ({
      title: movie.title,
      description: movie.plot, // Choose available description
      releaseDate: movie.released.$date,
      posterUrl: movie.poster, // Use poster or empty string if not present
      adminId: adminId,
      actors: movie.cast,
    }));
}

// transform and shuffle
const transformedMovies = shuffle(transformData(movies));
console.log(`Transformed and shuffled ${transformedMovies.length} movies.`);

// write to a file
const filePath = path.join(__dirname, "movies.json");
const fileContent = JSON.stringify(transformedMovies, null, 2);
fs.writeFileSync(filePath, fileContent);
