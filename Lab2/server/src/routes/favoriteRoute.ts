import { Router } from "express";
import { favoriteController } from "../controllers";
import { body } from "express-validator";

const router = Router();

router.get("/", favoriteController.get);
router.post(
  "/:productId",
  [body("text", "Review text is required!").trim().notEmpty()],
  favoriteController.create
);
router.delete("/:productId", favoriteController.delete);

export default router;
