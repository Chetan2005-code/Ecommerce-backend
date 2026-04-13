import express from "express";
import {createProduct,deleteProduct,getAllProduct,getProductById, updateProduct} from "../controllers/product.controller.js"
import { protect } from "../middleware/auth.middleware.js";
import { createProductValidation } from "../validations/product.validation.js";
import { validate } from "../middleware/validate.middleware.js";
import { admin } from "../middleware/admin.middleware.js";
const router = express.Router();

router.post("/",protect,admin,createProductValidation,validate,createProduct)

router.get("/",getAllProduct)

router.get("/:id",getProductById)

router.put("/:id",protect,admin,updateProduct)

router.delete("/:id",protect,admin,deleteProduct)

export default router;