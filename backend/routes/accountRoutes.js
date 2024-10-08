const express = require("express");
const accountController = require("../controllers/accountController");
const authController = require("../controllers/authController");
const router = express.Router();

router
  .route("/balance")
  .get(authController.protect, accountController.myBalance);
router
  .route("/transfer")
  .post(authController.protect, accountController.transfer);

module.exports = router;
