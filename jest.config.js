process.env.TZ = 'UTC';

const { grafanaESModules, nodeModulesToTransform } = require('./.config/jest/utils');
const baseConfig = require('./.config/jest.config');
const { testMatch } = baseConfig;

testMatch.push('<rootDir>/tests/**/*.{js,jsx,ts,tsx}');

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  ...baseConfig,
  setupFilesAfterEnv: ['<rootDir>/.config/jest-setup.js'],
  testMatch,
  // Inform jest to only transform specific node_module packages.
  transformIgnorePatterns: [nodeModulesToTransform([...grafanaESModules, 'rxjs'])],
};