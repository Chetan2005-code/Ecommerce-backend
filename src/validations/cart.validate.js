import {body} from "express-validator";

export const addToCartValidation = [
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required"),

  body("quantity")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
];

export const updateCartValidation = [
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required"),

  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be 0 or more"),
];