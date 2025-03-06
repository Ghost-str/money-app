import { QueryInterface, DataTypes, Op } from "sequelize";

export async function up({
  context: queryInterface,
}: {
  context: QueryInterface;
}) {
  await queryInterface.createTable("users", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    balance: {
      type: DataTypes.NUMBER,
      allowNull: false,
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

  await queryInterface.addConstraint("users", {
    type: "check",
    where: { balance: { [Op.gte]: 0 } },
    name: "users_balance_gte_0",
    fields: ["balance"],
  });

  await queryInterface.insert(null, "users", {
    id: "7e45261b-41a5-4919-b688-b10e2500f516",
    name: "Some name",
    balance: 10000,
    createdAt: new Date().toISOString(),
  });
}

export async function down({
  context: queryInterface,
}: {
  context: QueryInterface;
}) {
  await queryInterface.dropTable("users");
}
