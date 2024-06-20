import express from "express";
import categoryRouter from "./categoryRoute";
import productRoute from "./productRoute";
import authRoute from "./authRoute";
import orderRoute from "./orderRoute";
import reviewRoute from "./reviewRoute";
import favoriteRoute from "./favoriteRoute";

import { authMiddleware } from "../middlewares/authMiddleware";
import { recommendationController } from "../controllers/recommendationController";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/category", authMiddleware, categoryRouter);
router.use("/product", authMiddleware, productRoute);
router.use("/order", authMiddleware, orderRoute);
router.use(
  "/recommendations",
  authMiddleware,
  recommendationController.getUserRecommendations
);
router.use("/product", authMiddleware, reviewRoute);
router.use("/favorite", authMiddleware, favoriteRoute);

export default router;
