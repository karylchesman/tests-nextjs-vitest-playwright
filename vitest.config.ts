/// <reference types="vitest" />
// Garante que o TypeScript reconheça os tipos do Vitest

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

// Carrega variáveis de ambiente antes de tudo
// Estou usando a linha de comando para isso (mas deixei aqui caso queira)
// import dotenv from 'dotenv';
// dotenv.config({ path: '.env.test' });

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    fileParallelism: false,
    setupFiles: ["vitest.setup.ts"],
    globalSetup: ["vitest.global.setup.ts"],
    include: ["src/**/*.{spec,test}.{ts,tsx}"],
    testTimeout: 10000,

    coverage: {
      reportsDirectory: "./coverage",
      provider: "v8",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        // Ignora arquivos de teste
        "**/*.test.{ts,tsx}",
        "**/*.spec.{ts,tsx}",

        // Ignora arquivos que TEM APENAS types ou interfaces
        "**/types/**",
        "**/*.d.ts",
        "**/*.type.{ts,tsx}",
        "**/*.types.{ts,tsx}",
        "**/*.contract.{ts,tsx}",
        "**/*.protocol.{ts,tsx}",
        "**/*.interface.{ts,tsx}",

        // Ignora layout.tsx (se for precisar testar o layout, remova)
        "src/app/**/layout.{ts,tsx}",

        // Ignora arquivos e pastas de mocks e utilitários de testes
        "**/*.mock.{ts,tsx}",
        "**/*.mocks.{ts,tsx}",
        "**/mocks/**",
        "**/__mocks__/**",
        "**/__tests__/**",
        "**/__test-utils__/**",
        "**/*.test-util.ts",

        // Ignora arquivos e pastas do Storybook
        "**/*.story.{ts,tsx}",
        "**/*.stories.{ts,tsx}",
        "**/stories/**",
        "**/__stories__/**",
      ],
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
