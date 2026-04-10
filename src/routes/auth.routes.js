import express from "express";
import {registerUser,loginUser,logoutUser} from "../controllers/auth.controller.js";
import {validate} from "../middleware/validate.middleware.js";//check the declared rules is valid or not 
import { registerValidation,loginValidation } from "../validations/auth.validate.js";//declare the rules

const router = express.Router();

router.post("/register",registerValidation,validate,registerUser)

router.post("/login",loginValidation,validate,loginUser)

router.post("/logout",logoutUser)

export default router;