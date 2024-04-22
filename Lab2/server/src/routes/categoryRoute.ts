import express from "express";
import { categoryController } from "../controllers";
import { body } from "express-validator";

const router = express.Router();

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getOne);
router.post(
  "/",
  body("name", "Category name is required!").trim().notEmpty(),
  categoryController.create
);
router.delete("/:id", categoryController.delete);

export default router;
