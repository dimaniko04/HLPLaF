import { Router } from "express";
import { orderController } from "../controllers";
import { body } from "express-validator";

const router = Router();

router.get("/", orderController.getForCurrentUser);
router.post(
  "/",
  [
    body("orderDetails", "Order details are required!").isArray({ min: 1 }),
    body("orderDetails.*.productId", "Product id is required!")
      .trim()
      .notEmpty(),
    body(
      "orderDetails.*.quantity",
      "Quantity must be an integer number!"
    ).isNumeric(),
  ],
  orderController.createForCurrentUser
);

export default router;
