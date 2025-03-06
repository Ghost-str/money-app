import { SequelizeStorage, Umzug } from "umzug";
import { orm } from "./orm.js";
import { logger } from "./logger.js";
import { z } from "zod";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

const schemaValidation = z.object({
  up: z.function(),
  down: z.function(),
});

export async function migrate() {
  const umzung = new Umzug({
    migrations: {
      glob: "migrations/*.{js,ts}",
      resolve: (params) => {
        if (!params.path) {
          return Umzug.defaultResolver(params);
        }
        const migration = schemaValidation.parse(require(params.path));

        return {
          // это удаляет расширение файла для миграции
          name: params.name.replace(/\.\S+$/gm, ""),
          up: async () => {
            await migration.up(params);
          },
          down: async () => {
            await migration.down(params);
          },
        };
      },
    },
    context: orm.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize: orm }),
    logger: logger,
  });

  await umzung.up();
}
