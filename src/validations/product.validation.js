import { body } from "express-validator";

export const createProductValidation = [
  body("name")
    .notEmpty()
    .withMessage("Product name is required"),

  body("description")
    .notEmpty()
    .withMessage("Description is required"),

  body("price")
    .isNumeric()
    .withMessage("Price must be a number"),

  body("stock")
    .isInt({ min: 0 })
    .withMessage("Stock must be a positive number"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),
];