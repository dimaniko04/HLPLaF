import express from "express";
import categoryRouter from "./categoryRoute";
import productRoute from "./productRoute";

const router = express.Router();

router.use("/category", categoryRouter);
router.use("/product", productRoute);

export default router;
