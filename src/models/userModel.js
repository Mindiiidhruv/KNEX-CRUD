const db = require("../config/db");

class UserModel {
  // Create a new user
  static createUser(userData) {
    return db("users").insert(userData);
  }

  // Get all users
  static getAllUsers() {
    return db("users").select("*");
  }

  // Get a user by ID
  static getUserById(id) {
    return db("users").where({ id }).first();
  }

  // Update a user
  static updateUser(id, userData) {
    return db("users").where({ id }).update(userData);
  }

  // Delete a user
  static deleteUser(id) {
    return db("users").where({ id }).del();
  }
}

module.exports = UserModel;
