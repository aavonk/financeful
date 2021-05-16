module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  moduleNameMapper: {
    '@Lib/(.*)': '<rootDir>/src/lib/$1',
    '@Modules/(.*)': '<rootDir>/src/modules/$1',
    '@Shared/(.*)': '<rootDir>/src/shared/$1',
  },
};
