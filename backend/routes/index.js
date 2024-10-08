const express = require("express");
const userRouter = require("./userRoutes");
const accountRouter = require("./accountRoutes");
const authController = require("../controllers/authController");
const router = express.Router();
const app = express();

router.use("/user", userRouter);
// app.use((req, res, next) => {
//   authController.protect;
//   next();
// });
router.use("/account", accountRouter);

module.exports = router;
