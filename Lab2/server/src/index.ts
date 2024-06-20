import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";

import router from "./routes";
import { shopDataSource } from "./db";
import { exceptionMiddleware } from "./middlewares/exceptionMiddleware";

dotenv.config();

const PORT = Number(process.env.PORT) | 5000;

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", express.static(path.resolve(__dirname, "static")));
app.use("/api", router);
app.use(exceptionMiddleware);

const start = async () => {
  try {
    await shopDataSource.initialize();
    app.listen(PORT, "192.168.31.54", () =>
      console.log(`Server started on port ${PORT}`)
    );
  } catch (error) {
    console.error(error);
  }
};

start();
