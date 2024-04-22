import express from "express";
import categoryRouter from "./categoryRoute";

const router = express.Router();

router.use("/category", categoryRouter);

export default router;
