import { Router } from "express";
import { reviewController } from "../controllers";
import { body } from "express-validator";

const router = Router();

router.get("/:productId/review", reviewController.get);
router.post(
  "/:productId/review",
  [body("text", "Review text is required!").trim().notEmpty()],
  reviewController.create
);
router.delete("/:productId/review/:id", reviewController.delete);
router.put(
  "/:productId/review/:id",
  [body("text", "Review text is required!").trim().notEmpty()],
  reviewController.update
);

export default router;
