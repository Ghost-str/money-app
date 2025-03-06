import { Sequelize } from "sequelize";
import { logger } from "./logger";

export const orm = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqllite",
  logging: (sql) => {
    logger.log(sql);
  },
});
