const express = require("express");
const cors = require("cors");
const dbConnect = require("./db/db");
const userRouter = require("./routes/user.route");
const adminRouter = require("./routes/admin.route");
const movieRouter = require("./routes/movie.route");
const bookingRouter = require("./routes/booking.route");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.use("/admin", adminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);
app.listen(5000, () => {
  console.log(`Server started at port ${5000}`);
});
dbConnect();
