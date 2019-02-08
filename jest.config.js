'use strict';

module.exports = {
  rootDir: './src',
  // `js` is needed for node_modules
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['<rootDir>/**/*.test.{js,ts}'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
};
