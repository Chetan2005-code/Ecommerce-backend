import express from "express";
import { getUserProfile,updateUserProfile } from "../controllers/user.controller";
import { protect } from "../middleware/auth.middleware";
import { updateUserValidation } from "../validations/user.validate.js";
import { validate } from "../middleware/validate.middleware.js";
const router = express.Router();

router.get("/profile",protect,getUserProfile);
router.put("/profile",protect,updateUserValidation,validate,updateUserProfile);



export default router;