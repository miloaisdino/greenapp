const nextJest = require("next/jest");

// Define your custom Jest configuration
const customJestConfig = {
  testEnvironment: "jest-environment-jsdom",
  verbose: true,
};

// Create a Jest config with Next.js
const createJestConfig = nextJest({
  dir: "./",
});

// Create a Jest configuration object
const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)();
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      // Add SVG mock first
      "\\.svg$": "<rootDir>/__mocks__/svg.js",
      ...nextJestConfig.moduleNameMapper,
    },
  };
};

// Export the Jest configuration
module.exports = jestConfig;
