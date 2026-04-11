import express from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.controller.js";
import { protect } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/",protect,addToCart);
router.get("/",protect,getCart);
router.delete("/:id",protect,removeFromCart);

export default router;