const express = require("express");
const cars = require("./car.route");
const users = require("./user.route");

const router = express.Router();

router.use("/cars", cars);
router.use("/users", users);

module.exports = router;
