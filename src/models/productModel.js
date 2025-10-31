const db = require("../config/db");

class ProductModel {
  // Create a new product
  static createProduct(productData) {
    return db("products").insert(productData);
  }

  // Get all products with JOIN + Search + Pagination + Sorting
  static async getAllProducts({
    search,
    page = 1,
    limit = 10,
    sortBy = "product_name",
    order = "asc",
  }) {
    const offset = (page - 1) * limit;

    // Base query
    let query = db("products")
      .join("users", "products.user_id", "users.id")
      .select(
        "products.id as product_id",
        "products.product_name",
        "products.price",
        "users.id as user_id",
        "users.name as user_name",
        "users.email as user_email"
      );

    // Search filter
    if (search) {
      query = query.where((builder) => {
        builder
          .where("products.product_name", "like", `%${search}%`)
          .orWhere("users.name", "like", `%${search}%`)
          .orWhere("users.email", "like", `%${search}%`);
      });
    }

    // Sorting
    const validSortColumns = ["product_name", "price", "user_name"];
    if (!validSortColumns.includes(sortBy)) sortBy = "product_name";
    query = query.orderBy(sortBy, order);

    query = query.limit(limit).offset(offset);

    const data = await query;

    const totalResult = await db("products")
      .join("users", "products.user_id", "users.id")
      .modify((builder) => {
        if (search) {
          builder.where((b) => {
            b.where("products.product_name", "like", `%${search}%`)
              .orWhere("users.name", "like", `%${search}%`)
              .orWhere("users.email", "like", `%${search}%`);
          });
        }
      })
      .countDistinct("products.id as total")
      .first();

    const total = totalResult.total;

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static getProductsByUserId(user_id) {
    return db("products")
      .join("users", "products.user_id", "users.id")
      .where("products.user_id", user_id)
      .select(
        "products.id as product_id",
        "products.product_name",
        "products.price",
        "users.id as user_id",
        "users.name as user_name",
        "users.email as user_email"
      );
  }

  static updateProduct(id, productData) {
    return db("products").where({ id }).update(productData);
  }

  static deleteProduct(id) {
    return db("products").where({ id }).del();
  }
}

module.exports = ProductModel;
