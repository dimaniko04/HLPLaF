import express from "express";
import categoryRouter from "./categoryRoute";
import productRoute from "./productRoute";
import authRoute from "./authRoute";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/category", authMiddleware, categoryRouter);
router.use("/product", authMiddleware, productRoute);

export default router;
