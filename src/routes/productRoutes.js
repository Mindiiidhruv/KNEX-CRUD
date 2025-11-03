const express = require("express");
const ProductController = require("../controllers/productController");
const ProductValidation = require("../validator/productValidaton");
const router = express.Router();

router.post("/products", ProductValidation, ProductController.createProduct);
router.get("/products", ProductController.getAllProducts);
router.get("/products/user/:user_id", ProductController.getProductsByUserId);
router.put("/products/:id", ProductValidation, ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

module.exports = router;
