import { SequelizeStorage, Umzug } from "umzug";
import { orm } from "./orm.js";

export async function migrate() {
  const umzung = new Umzug({
    migrations: { glob: "migrations/*.{js,ts}" },
    context: orm.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize: orm }),
    logger: console,
  });

  await umzung.up();
}
