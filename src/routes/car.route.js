const express = require("express");
const router = express.Router({ mergeParams: true });

const CarService = require("../services/car.service");
const CarController = require("../controllers/car.controller");

const carService = new CarService();
const carController = new CarController(carService);

router.get("/", (req, res) => carController.getAll(req, res));
router.get("/:_id", (req, res) => carController.get(req, res));
router.get("/yearsGreater/:_id", (req, res) =>
  carController.getCarsYearsGreaterThanCarId(req, res)
);

module.exports = router;
