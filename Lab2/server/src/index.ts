import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import router from "./routes";
import { shopDataSource } from "./db";
import { exceptionMiddleware } from "./middlewares/exceptionMiddleware";

dotenv.config();

const PORT = Number(process.env.PORT) | 5000;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", router);
app.use(exceptionMiddleware);

const start = async () => {
  try {
    await shopDataSource.initialize();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();
