const UserModel = require("../models/userModel");

class UserController {
  static async createUser(req, res) {
    const { name, email } = req.body;
    try {
      console.log("Creating user with:", { name, email }); // Debugging log
      await UserModel.createUser({ name, email });
      res.status(201).json({ message: "User created" });
    } catch (err) {
      console.error("Error creating user:", err);
      res
        .status(500)
        .json({ message: "Error creating user", error: err.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: "Error fetching users" });
    }
  }

  static async getUserById(req, res) {
    const { id } = req.params;
    try {
      const user = await UserModel.getUserById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (err) {
      res.status(500).json({ message: "Error fetching user" });
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      await UserModel.updateUser(id, { name, email });
      res.status(200).json({ message: "User updated" });
    } catch (err) {
      res.status(500).json({ message: "Error updating user" });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      await UserModel.deleteUser(id);
      res.status(200).json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting user" });
    }
  }
}

module.exports = UserController;
