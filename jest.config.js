export default {
  testEnvironment: 'node',
  transform: {},
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: [
    'src/**/*.js',
    'tokens/**/*.js',
    '!**/node_modules/**',
    '!tokens/build.js',
    '!tokens/style-dictionary.config.js',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 84,
      statements: 84,
    },
  },
};
