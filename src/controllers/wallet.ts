import { Request, Response } from "express";
import { WalletService } from "../services/walletService.js";
import { z } from "zod";
import { logger } from "../core/logger.js";

const changeSchemaValidation = z.object({
  userId: z.string().uuid(),
  amount: z.number(),
});

export function changeWalletAmount(req: Request, res: Response) {
  const result = changeSchemaValidation.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      type: "validation_error",
      message: result.error.toString(),
    });
    return;
  }

  new WalletService()
    .changeBalance(result.data)
    .then((result) => {
      if (result.type === "success") {
        res.status(200).send();
        return;
      } else {
        res.status(400).send();
      }
    })
    .catch((error: unknown) => {
      logger.error(error);
      res.status(500).send();
    });
}
