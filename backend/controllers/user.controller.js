const Booking = require("../models/booking.model");
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const getAllUsers = async (req, res, next) => {
  try {
    let users = await User.find();
    if (!users) {
      return res.status(500).json({ message: "Unexpected Error" });
    }
    return res.status(200).json({ users });
  } catch (error) {
    console.log(error);
  }
};
const addUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Input" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  try {
    let user = new User({ name, email, password: hashedPassword });
    user = await user.save();
    if (!user) {
      return res.status(500).json({ message: "Unexpected Error" });
    }
    return res.status(201).json({ id: user._id });
  } catch (err) {
    console.log(err);
  }
};
const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  if (
    !name &&
    name.trim() === "" &&
    !email &&
    email.trim() === "" &&
    !password &&
    password.trim() === ""
  ) {
    return res.status(422).json({ message: "Invalid Input" });
  }
  const hashedPassword = bcrypt.hashSync(password);
  try {
    let user = await User.findByIdAndUpdate(id, {
      name,
      email,
      password: hashedPassword,
    });
    if (!user) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    res.status(200).json({ message: "Updated Successfully" });
  } catch (error) {
    return console.log(error);
  }
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    let user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(500).json({ message: "Something went wrong" });
    }
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Input" });
  }
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Unable to find user" });
    }
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Incorrect Password" });
    }
    return res.status(200).json({ message: "Login Successful", id: user._id });
  } catch (error) {
    console.log(error);
  }
};

const getBookingsOfUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    let bookings = await Booking.find({ user: id })
      .populate("movie")
      .populate("user");
    if (!bookings) {
      return res.status(500).json({ message: "Unable to get bookings" });
    }
    return res.status(200).json({ bookings });
  } catch (error) {
    console.log(error);
  }
};
const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let user;
  try {
    user = await User.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!user) {
    return res.status(500).json({ message: "Unexpected Error Occured" });
  }
  return res.status(200).json({ user });
};
module.exports = {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  login,
  getBookingsOfUser,
  getUserById,
};
