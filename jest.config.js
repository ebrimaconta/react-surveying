module.exports = {
  testMatch: ['**/__tests__/**/*.test.js', '**/?(*.)+(test).js'],

  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./setupTests.js'],
};
