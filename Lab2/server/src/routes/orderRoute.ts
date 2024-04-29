import { Router } from "express";
import { orderController } from "../controllers";
import { body } from "express-validator";
import { OrderStatus } from "../entities/order";

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
router.put("/:id/cancel", orderController.cancel);
router.put(
  "/:id/status",
  body(
    "status",
    `Invalid status, valid order statuses: ${Object.values(OrderStatus)}`
  ).isIn(Object.values(OrderStatus)),
  orderController.updateStatus
);

export default router;
