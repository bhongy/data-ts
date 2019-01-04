'use strict';

module.exports = {
  rootDir: './lib',
  // `js` is needed for node_modules
  moduleFileExtensions: ['js', 'ts'],
  testMatch: ['<rootDir>/**/?(*.)+(test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testEnvironment: 'node',
};
