import {validationResult} from "express-validator";
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  // If validation errors exist
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  // If no errors → move to controller
  next();
};
