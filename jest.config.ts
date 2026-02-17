import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  collectCoverageFrom: [
    "src/shared/**/*.{ts,tsx}",
    "src/app/\\(features\\)/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.test.{ts,tsx}",
    "!src/**/*.types.ts",
    "!src/shared/components/icons/**",
    "!src/shared/**/index.ts",
    "!src/app/\\(features\\)/**/index.ts",
    "!src/app/\\(features\\)/**/interfaces/**",
    "!src/app/\\(features\\)/**/enums/**",
    "!src/app/\\(features\\)/**/services/**",
    "!src/app/\\(features\\)/**/page.tsx",
    "!src/app/\\(features\\)/\\(landing\\)/**",
  ],
  coverageThreshold: {
    global: {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};

export default createJestConfig(config);
