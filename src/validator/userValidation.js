const Ajv = require("ajv");
const addFormats = require("ajv-formats");
const addErrors = require("ajv-errors");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
addErrors(ajv);

const userSchema = {
  type: "object",
  properties: {
    name: {
      type: "string",
      minLength: 2,
      errorMessage: {
        minLength: "Name must have at least 2 characters",
      },
    },
    email: {
      type: "string",
      format: "email",
      errorMessage: {
        format: "Please enter a valid email address",
      },
    },
  },
  required: ["name", "email"],
  additionalProperties: false,
  errorMessage: {
    required: {
      name: "Name is required",
      email: "Email is required",
    },
  },
};

const validateUser = ajv.compile(userSchema);

function userValidationMiddleware(req, res, next) {
  const isValid = validateUser(req.body);
  if (!isValid) {
    const errors = validateUser.errors.map((err) => err.message);
    return res.status(400).json({ message: "Validation failed", errors });
  }
  next();
}

module.exports = userValidationMiddleware;
