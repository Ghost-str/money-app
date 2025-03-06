import express from "express";
import { orm } from "./core/orm";
import { migrate } from "./core/migration";
import { logger } from "./core/logger";
import { changeWalletAmount } from "./controllers/wallet";

async function startApp() {
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
