import { DataTypes } from "sequelize";
import { orm } from "../core/orm";

export const BALANCE_CHECK_CONSTRAINT_NAME = "users_balance_gte_0";

export const User = orm.define("user", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.NUMBER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
});
