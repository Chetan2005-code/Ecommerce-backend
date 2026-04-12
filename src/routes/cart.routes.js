import express from "express";
import { addToCart, getCart, removeFromCart, updateCartItem } from "../controllers/cart.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { addToCartValidation , updateCartValidation } from "../validations/cart.validate.js";
const router = express.Router();

router.post("/",protect,addToCartValidation,validate,addToCart);
router.get("/",protect,getCart);
router.delete("/:id",protect,removeFromCart);
router.put("/",protect,updateCartValidation,validate,updateCartItem);

export default router;