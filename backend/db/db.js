const mongoose = require("mongoose");
require("dotenv").config();

const DB_URI = process.env.DB_URI;

async function dbConnect() {
  if (!process.env.DB_URI) {
    throw new Error("Please fix DB_URI in .env file.");
  }

  try {
    await mongoose.connect(DB_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log("Database Error: " + error);
  }
}

module.exports = dbConnect;
