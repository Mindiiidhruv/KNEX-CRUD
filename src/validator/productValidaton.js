const Ajv = require("ajv");
const addErrors = require("ajv-errors");

const ajv = new Ajv({ allErrors: true });
addErrors(ajv);

const productSchema = {
  type: "object",
  properties: {
    user_id: {
      type: "integer",
      errorMessage: "User ID must be a number",
    },
    product_name: {
      type: "string",
      minLength: 2,
      errorMessage: {
        type: "Product name must be a string",
        minLength: "Product name must have at least 2 characters",
      },
    },
    price: {
      type: "number",
      minimum: 1,
      errorMessage: {
        type: "Price must be a number",
        minimum: "Price must be at least 1",
      },
    },
  },
  required: ["user_id", "product_name", "price"],
  additionalProperties: false,
  errorMessage: {
    required: {
      user_id: "User ID is required",
      product_name: "Product name is required",
      price: "Product price is required",
    },
    additionalProperties: "Extra field is not allowed",
  },
};

const validateProduct = ajv.compile(productSchema);

function productValidationMiddleware(req, res, next) {
  const isValid = validateProduct(req.body);
  if (!isValid) {
    const errors = validateProduct.errors.map((err) => err.message);
    return res.status(400).json({ message: "Validation failed", errors });
  }
  next();
}

module.exports = productValidationMiddleware;
