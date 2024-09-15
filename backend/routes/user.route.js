const express = require("express");
const {
  getAllUsers,
  addUser,
  updateUser,
  deleteUser,
  login,
  getBookingsOfUser,
  getUserById,
} = require("../controllers/user.controller");
const userRouter = express.Router();
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/signup", addUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/login", login);
userRouter.get("/bookings/:id", getBookingsOfUser);
module.exports = userRouter;
