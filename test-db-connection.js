const knex = require("knex");
require("dotenv").config(); // To load .env variables

// Create Knex instance with database configuration
const db = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  },
});

// Test the connection
db.raw("SELECT 1+1 AS result")
  .then(() => {
    console.log("Database connection successful!");
    db.destroy(); // Close the connection
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err.message);
    db.destroy(); // Close the connection even if there's an error
  });
