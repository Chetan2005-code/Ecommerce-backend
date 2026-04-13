import { body } from "express-validator";

// 🛒 Create Order Validation
export const createOrderValidation = [
  body("address")
    .notEmpty()
    .withMessage("Address is required"),

  body("paymentMethod")
    .isIn(["COD", "ONLINE"])
    .withMessage("Invalid payment method"),
];


// 🔄 Update Order Status Validation
export const updateOrderStatusValidation = [
  body("status")
    .isIn(["pending", "paid", "shipped", "delivered", "cancelled"])
    .withMessage("Invalid status"),
];