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
      branches: 85,
      functions: 80,
      lines: 85,
      statements: 85,
    },
  },
};
