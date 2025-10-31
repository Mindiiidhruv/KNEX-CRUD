const ProductModel = require("../models/productModel");

class ProductController {
  static async createProduct(req, res) {
    const { user_id, product_name, price } = req.body;

    try {
      await ProductModel.createProduct({ user_id, product_name, price });
      res.status(201).json({ message: "Product created successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error creating product", error: err.message });
    }
  }

  // get all with join + search + pagination + sorting
  static async getAllProducts(req, res) {
    const { search, page, limit, sortBy, order } = req.query;

    try {
      const result = await ProductModel.getAllProducts({
        search,
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 10,
        sortBy: sortBy || "product_name",
        order: order || "asc",
      });

      res.status(200).json(result);
    } catch (err) {
      console.error("Error fetching products:", err);
      res
        .status(500)
        .json({ message: "Error fetching products", error: err.message });
    }
  }

  static async getProductsByUserId(req, res) {
    const { user_id } = req.params;
    try {
      const products = await ProductModel.getProductsByUserId(user_id);
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({
        message: "Error fetching user's products",
        error: err.message,
      });
    }
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const { product_name, price } = req.body;
    try {
      await ProductModel.updateProduct(id, { product_name, price });
      res.status(200).json({ message: "Product updated successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error updating product", error: err.message });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;
    try {
      await ProductModel.deleteProduct(id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error deleting product", error: err.message });
    }
  }
}

module.exports = ProductController;
