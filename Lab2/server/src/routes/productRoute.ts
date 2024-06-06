import express from "express";
import { productController } from "../controllers";
import { body } from "express-validator";
import { multerMiddleware } from "../middlewares/multerMiddleware";

const router = express.Router();

router.get("/", productController.getAll);
router.get("/:id", productController.getOne);
router.post(
  "/",
  multerMiddleware.single("img"),
  [
    body("name", "Product name is required!").trim().notEmpty(),
    body("price").isDecimal().withMessage("Price must be a decimal number!"),
    body("category", "Product category is required!").trim().notEmpty(),
  ],
  productController.create
);
router.delete("/:id", productController.delete);
router.put(
  "/:id",
  multerMiddleware.single("img"),
  [
    body("name", "Product name is required!").trim().notEmpty(),
    body("price").isDecimal().withMessage("Price must be a decimal number!"),
    body("category", "Product category is required!").trim().notEmpty(),
  ],
  productController.update
);

export default router;
