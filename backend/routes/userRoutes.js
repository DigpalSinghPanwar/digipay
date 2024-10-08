const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.route("/signup").post(authController.signup);
router.route("/signin").post(authController.signin);
router.route("/").put(authController.protect, authController.update);
router.route("/bulk").get(authController.protect, authController.filter)


module.exports = router;
