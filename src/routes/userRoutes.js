const express = require("express");
const UserController = require("../controllers/userController");
const UserValidation = require("../validator/userValidation");
const router = express.Router();

router.post("/users", UserValidation, UserController.createUser);
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserValidation, UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

module.exports = router;
