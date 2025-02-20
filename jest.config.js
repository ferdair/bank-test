module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  testEnvironment: "jsdom",
  globalSetup: "jest-preset-angular/global-setup",
  transform: {
    "^.+\\.(ts|js|html)$": [
      "jest-preset-angular",
      {
        tsconfig: "<rootDir>/tsconfig.spec.json",
        stringifyContentPathRegex: "\\.(html|svg)$",
      },
    ],
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov", "html"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/src/app/core/models/",
    "/src/app/core/interfaces/",
  ],
  moduleNameMapper: {
    "^@core/(.*)$": "<rootDir>/src/app/core/$1",
    "^@shared/(.*)$": "<rootDir>/src/app/shared/$1",
    "^@features/(.*)$": "<rootDir>/src/app/features/$1",
    "^@config/(.*)$": "<rootDir>/src/app/core/config/$1",
    "^@services/(.*)$": "<rootDir>/src/app/core/services/$1",
    "^@env/(.*)$": "<rootDir>/src/environments/$1",
    "^@layout/(.*)$": "<rootDir>/src/app/layout/$1",
  },
  globals: {
    'ts-jest': {
      diagnostics: false
    }
  },
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)']
};
