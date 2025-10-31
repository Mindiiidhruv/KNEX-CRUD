const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Mount routes
app.use("/api", userRoutes);
app.use("/api", productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
