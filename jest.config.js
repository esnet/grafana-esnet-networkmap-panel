process.env.TZ = 'UTC';
const { grafanaESModules, nodeModulesToTransform } = require('./.config/jest/utils');

/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  ...require('./.config/jest.config'),
  // Inform jest to only transform specific node_module packages.
  transformIgnorePatterns: [nodeModulesToTransform([...grafanaESModules, 'rxjs'])],
};