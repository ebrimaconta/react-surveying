module.exports = {
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(test).js'],
  setupFiles: ['<rootDir>/__mocks__/animate.css.js'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./setupTests.js'],
};
