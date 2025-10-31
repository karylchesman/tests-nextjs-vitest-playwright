import { join } from "node:path";

const commonKeys = {
  drizzleSchemaFiles: [
    join("src", "core", "todo", "schemas", "drizzle-todo-table.schema.ts"),
  ],
  drizzleMigrationFolder: join("src", "db", "drizzle", "migrations"),
};

const envConfigs = {
  development: {
    databaseFile: "dev.db.sqlite3",
    currentEnv: "development",
    ...commonKeys,
  },
  production: {
    databaseFile: "prod.db.sqlite3",
    currentEnv: "production",
    ...commonKeys,
  },
  test: {
    databaseFile: "int.test.db.sqlite3",
    currentEnv: "test",
    ...commonKeys,
  },
  e2e: {
    databaseFile: "e2e.test.db.sqlite3",
    currentEnv: "e2e",
    ...commonKeys,
  },
} as const;

type ConfigByEnv = {
  readonly databaseFile: string;
  readonly currentEnv: keyof EnvConfigs;
} & typeof commonKeys;

type EnvConfigs = typeof envConfigs;
type AllowedEnvKeys = keyof EnvConfigs;

function isValidEnv(env: string): env is AllowedEnvKeys {
  return Object.keys(envConfigs).includes(env);
}

export function checkEnv(): AllowedEnvKeys {
  const currentEnv = process.env.CURRENT_ENV;
  if (!currentEnv || !isValidEnv(currentEnv)) {
    throw new Error(
      `Invalid CURRENT_ENV value: ${currentEnv}. Allowed values are: ${Object.keys(
        envConfigs
      ).join(", ")}`
    );
  }
  return currentEnv;
}

export function getFullEnv() {
  const env = checkEnv();
  return envConfigs[env] as ConfigByEnv;
}

export function getEnv<C extends keyof ConfigByEnv>(key: C) {
  const env = checkEnv();
  return envConfigs[env][key];
}
