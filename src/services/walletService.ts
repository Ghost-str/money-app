import { Op } from "sequelize";
import { logger } from "../core/logger";
import { BALANCE_CHECK_CONSTRAINT_NAME, User } from "../models/user";
import { isConstraintError } from "../core/ormErrorAnalyze";

type ChangeBalanceData = {
  userId: string;
  amount: number;
};

type Result<Success, Error> =
  | { type: "success"; payload: Success }
  | { type: "error"; reason: Error };

const ErrorReason = [
  "user_not_found",
  "unexpected_error",
  "not_enough_money",
] as const;

type ErrorReason = (typeof ErrorReason)[number];

export class WalletService {
  async changeBalance(
    data: ChangeBalanceData,
  ): Promise<Result<null, ErrorReason>> {
    try {
      await User.increment(
        {
          balance: data.amount,
        },
        { where: { id: { [Op.eq]: data.userId } } },
      );
    } catch (error) {
      if (isConstraintError(error, BALANCE_CHECK_CONSTRAINT_NAME)) {
        return { type: "error", reason: "not_enough_money" };
      }

      logger.error(error);

      return { type: "error", reason: "unexpected_error" };
    }

    return { type: "success", payload: null };
  }
}
