import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { shopDataSource } from "./db";
import { Product } from "./entities/product";

dotenv.config();

const PORT = Number(process.env.PORT) | 5000;

const app = express();

app.use(express.json());
app.use(cors());

app.get("/products", async (req, res) => {
  const products = await shopDataSource.getRepository(Product).find();

  res.json(products);
});

const start = async () => {
  try {
    await shopDataSource.initialize();

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();
