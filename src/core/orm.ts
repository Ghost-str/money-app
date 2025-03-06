import { Sequelize } from "sequelize";
import { logger } from "./logger.js";
import dotenv from "dotenv";
dotenv.config();

export const orm = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USER as string,
  process.env.DATABASE_PASSWORD as string,
  {
    dialect: "postgres",
    host: process.env.DATABASE_HOST,
    port: +(process.env.DATABASE_PORT as string),
    logging: (sql) => {
      logger.info(sql);
    },
  },
);
