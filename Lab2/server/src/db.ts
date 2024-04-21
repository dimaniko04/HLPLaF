import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

export const shopDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  entities: [__dirname + "/entities/**/*.ts"],
  migrations: [__dirname + "/../migrations/**/*.ts"],
  synchronize: false,
});
