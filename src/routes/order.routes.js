import express from "express";
import { createOrder,deleteOrder,getOrderById,getUserOrders, updateOrderStatus } from "../controllers/order.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import { createOrderValidation , updateOrderStatusValidation } from "../validations/order.validate.js";
import { validate } from "../middleware/validate.middleware.js";
import { admin } from "../middleware/admin.middleware.js";
const router = express.Router();

router.post("/",protect,createOrderValidation,validate,createOrder);
router.get("/",protect,getUserOrders);
router.get("/:id",protect,getOrderById);
router.put("/:id",protect,admin,updateOrderStatusValidation,validate,updateOrderStatus);
router.delete("/:id",protect,admin,deleteOrder);

export default router;