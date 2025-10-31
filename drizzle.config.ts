import { getFullEnv } from "@/env/config";
import { defineConfig } from "drizzle-kit";

const { drizzleSchemaFiles, drizzleMigrationFolder, databaseFile } =
  getFullEnv();

export default defineConfig({
  schema: drizzleSchemaFiles,
  out: drizzleMigrationFolder,
  dialect: "sqlite",
  dbCredentials: {
    url: databaseFile,
  },
});
