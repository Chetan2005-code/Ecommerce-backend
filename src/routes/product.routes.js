import express from "express";
import {createProduct,deleteProduct,getAllProduct,getProductById, updateProduct} from "../controllers/product.controller.js"
import { protect } from "../middleware/auth.middleware.js";
import { createProductValidation } from "../validations/product.validation.js";
import { validate } from "../middleware/validate.middleware.js";
const router = express.Router();

router.post("/",protect,createProductValidation,validate,createProduct)

router.get("/",getAllProduct)

router.get("/:id",getProductById)

router.put("/:id",protect,updateProduct)

router.delete("/:id",protect,deleteProduct)

export default router;