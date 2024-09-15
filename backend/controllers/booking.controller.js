const { default: mongoose } = require("mongoose");
const Booking = require("../models/booking.model");
const Movie = require("../models/movie.model");
const User = require("../models/user.model");

const newBooking = async (req, res, next) => {
  const { movie, date, seatNumber, user } = req.body;
  try {
    let existingMovie = await Movie.findById(movie);
    let existingUser = await User.findById(user);
    if (!existingMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    let booking = new Booking({
      movie,
      date: new Date(`${date}`),
      seatNumber,
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingMovie.bookings.push(booking);
    await existingUser.save({ session });
    await existingMovie.save({ session });
    await booking.save({ session });
    session.commitTransaction();
    if (!booking) {
      return res.status(500).json({ message: "Unable to book" });
    }
    return res.status(201).json({ booking });
  } catch (error) {
    console.log(error);
  }
};

const getBookingById = async (req, res, next) => {
  try {
    const id = req.params.id;
    let booking = await Booking.findById(id);
    if (!booking) {
      return res.status(500).json({ message: "Unexpected Error" });
    }
    return res.status(200).json({ booking });
  } catch (error) {
    console.log(error);
  }
};

const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Booking.findByIdAndDelete(id).populate("user movie");
    console.log(booking);
    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.movie.bookings.pull(booking);
    await booking.movie.save({ session });
    await booking.user.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};
module.exports = { newBooking, getBookingById, deleteBooking };
