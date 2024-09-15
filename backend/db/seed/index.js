const movies = require("./data");
const Movie = require("../../models/movie.model");
const mongoose = require("mongoose");
const Admin = require("../../models/admin.model");
const dotenv = require("dotenv");

async function seedMovies() {
  for (const movieData of movies) {
    let movie;
    try {
      const {
        description,
        releaseDate,
        featured,
        actors,
        adminId,
        posterUrl,
        title,
      } = movieData;
      movie = new Movie({
        description,
        releaseDate: new Date(`${releaseDate}`),
        featured,
        actors,
        admin: adminId,
        posterUrl,
        title,
      });

      const session = await mongoose.startSession();
      const adminUser = await Admin.findById(adminId);

      if (!adminUser) {
        console.log(
          `Admin with ID ${adminId} not found. Skipping movie "${title}".`
        );
        continue; // Skip if admin is not found
      }

      session.startTransaction();
      await movie.save({ session });
      adminUser.addedMovies.push(movie);
      await adminUser.save({ session });
      await session.commitTransaction();

      console.log(`Movie "${title}" successfully seeded.`);
    } catch (err) {
      console.log(`Error seeding movie "${movieData.title}":`, err);
      continue; // Skip to next movie in case of error
    }

    if (!movie) {
      console.log(`Failed to seed movie "${movieData.title}".`);
    }
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
