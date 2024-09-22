const movies = require("./movies");
const Movie = require("../../models/movie.model");
const mongoose = require("mongoose");
const Admin = require("../../models/admin.model");
const dotenv = require("dotenv");

async function seedMovies() {
  let session;

  try {
    session = await mongoose.startSession();
    session.startTransaction();

    const moviePromises = movies.map(async (movieData) => {
      const {
        description,
        releaseDate,
        featured,
        actors,
        adminId,
        posterUrl,
        title,
      } = movieData;

      const movie = new Movie({
        description,
        releaseDate: new Date(releaseDate),
        featured,
        actors,
        admin: adminId,
        posterUrl,
        title,
      });

      const adminUser = await Admin.findById(adminId).session(session);
      if (!adminUser) {
        console.log(
          `Admin with ID ${adminId} not found. Skipping movie "${title}".`
        );
        return null;
      }

      adminUser.addedMovies.push(movie);
      await adminUser.save({ session });

      return movie;
    });

    const moviesToInsert = await Promise.all(moviePromises);
    const validMovies = moviesToInsert.filter(Boolean); // Filter out null values

    if (validMovies.length > 0) {
      await Movie.insertMany(validMovies, { session });
    }

    await session.commitTransaction();
    console.log(`${validMovies.length} movies successfully seeded.`);
  } catch (err) {
    console.error("Error seeding movies:", err);
    await session.abortTransaction();
  } finally {
    session.endSession();
  }
}

async function connectAndSeed() {
  // Load .env
  dotenv.config();

  if (!process.env.DB_URI) {
    throw new Error("Please fix DB_URI in .env file.");
  }

  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB.");

    await seedMovies();

    console.log("Movie seeding process completed.");
  } catch (err) {
    console.error("Error in seeding movies:", err);
  } finally {
    mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
  }
}

// Start the process
connectAndSeed();
