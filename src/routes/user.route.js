const express = require("express");
const router = express.Router({ mergeParams: true });

const UserService = require("../services/user.service");
const UserController = require("../controllers/user.controller");

const userService = new UserService();
const userController = new UserController(userService);

router.get("/", (req, res) => userController.getAll(req, res));
router.get("/:_id", (req, res) => userController.get(req, res));
router.get("/genders/:_id", (req, res) =>
  userController.getAllGendersById(req, res)
);

module.exports = router;
