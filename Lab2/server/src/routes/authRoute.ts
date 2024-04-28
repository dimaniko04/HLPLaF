import { Router } from "express";
import { authController } from "../controllers";
import { body } from "express-validator";

const router = Router();

router.post(
  "/registration",
  body("email", "Invalid email").isEmail(),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Must be at least 8 characters long!")
    .isLength({ max: 32 })
    .withMessage("Must be no more than 32 characters long!"),
  authController.registration
);
router.post(
  "/login",
  body("email", "Email is required").trim().notEmpty(),
  body("password", "Password is required!").trim().notEmpty(),
  authController.login
);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);

export default router;
