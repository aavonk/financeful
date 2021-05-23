module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/public/', '__mocks__', '/dist/', '__tests__/helpers/'],
  setupFilesAfterEnv: ['<rootDir>/src/testSetup.ts'],
  moduleNameMapper: {
    '@Lib/(.*)': '<rootDir>/src/lib/$1',
    '@Modules/(.*)': '<rootDir>/src/modules/$1',
    '@Shared/(.*)': '<rootDir>/src/shared/$1',
  },
};
