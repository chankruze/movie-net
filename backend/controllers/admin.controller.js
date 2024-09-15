const Admin = require("../models/admin.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const addAdmin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Input" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }

  if (existingAdmin) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hashedPassword = bcrypt.hashSync(password);
  try {
    let admin = new Admin({ email, password: hashedPassword });
    admin = await admin.save();
    if (!admin) {
      return res.status(500).json({ message: "Unexpected Error" });
    }
    return res.status(201).json({ admin });
  } catch (err) {
    console.log(err);
  }
};

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email && email.trim() === "" && !password && password.trim() === "") {
    return res.status(422).json({ message: "Invalid Inputs" });
  }
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingAdmin) {
    return res.status(400).json({ message: "Admin not found" });
  }
  const isPasswordCorrect = bcrypt.compareSync(
    password,
    existingAdmin.password
  );

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Incorrect Password" });
  }
  const token = jwt.sign({ id: existingAdmin._id }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
  return res
    .status(200)
    .json({ message: "Authentication Complete", token, id: existingAdmin._id });
};

const getAdmins = async (req, res, next) => {
  try {
    let admins = await Admin.find();
    if (!admins) {
      return res.status(500).json({ message: "Internal Server Error" });
    }
    return res.status(200).json({ admins });
  } catch (error) {
    console.log(error);
  }
};

const getAdminById = async (req, res, next) => {
  const id = req.params.id;

  let admin;
  try {
    admin = await Admin.findById(id).populate("addedMovies");
  } catch (err) {
    return console.log(err);
  }
  if (!admin) {
    return console.log("Cannot find Admin");
  }
  return res.status(200).json({ admin });
};
module.exports = { addAdmin, adminLogin, getAdmins, getAdminById };
