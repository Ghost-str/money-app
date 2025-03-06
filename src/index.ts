import express from "express";
import { orm } from "./core/orm.js";
import { migrate } from "./core/migration.js";
import { logger } from "./core/logger.js";
import { changeWalletAmount } from "./controllers/wallet.js";
import dotenv from "dotenv";

async function startApp() {
  dotenv.config();
  await orm.authenticate();
  await migrate();

  const app = express();
  const port = process.env.PORT || 3000;

  app.use(express.json({ type: "application/json" }));
  app.post("/change-many", changeWalletAmount);

  app.listen(port, () => {
    logger.log(`app started and listening on port="${port.toString()}"`);
  });
}

void startApp();
