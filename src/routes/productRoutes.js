const express = require("express");
const ProductController = require("../controllers/productController");
const router = express.Router();

router.post("/products", ProductController.createProduct);
router.get("/products", ProductController.getAllProducts);
router.get("/products/user/:user_id", ProductController.getProductsByUserId);
router.put("/products/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

module.exports = router;
