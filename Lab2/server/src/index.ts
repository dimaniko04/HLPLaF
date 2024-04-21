import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { shopDataSource } from "./db";

const PORT = Number(process.env.PORT) | 5000;

const app = express();

const start = async () => {
  try {
    await shopDataSource.initialize();

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();
