import {body} from "express-validator";

export const updateUserValidation = [
body("name").optional().notEmpty(),
body("email").optional().isEmail()
];