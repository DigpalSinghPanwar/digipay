const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const rootRouter = require("./routes/index");
const config = require("./config");

mongoose
  .connect(config.DATABASE)
  .then(() => console.log("Database connected successfully"));

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

app.use("/api/v1", rootRouter);

app.get("/api/v1", (req, res) => {
  console.log("Hi request");
  res.status(200).json({
    message: "welcome digpal to paytm",
  });
});

app.listen(3000, () => {
  console.log("welcome to paytm app");
});

// app.use((req, res, next) => {
//   console.log("middleware successful");
//   next();
// });
