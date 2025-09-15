export default {
  testEnvironment: 'node',
  roots: ['<rootDir>/tests'],
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
};
