module.exports = {
  roots: ['<rootDir>/src/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['src', 'node_modules'],
  testPathIgnorePatterns: ['/node_modules/', '/public/'],
  setupFilesAfterEnv: ['./src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/fileMock.js',
    '@Components/(.*)': '<rootDir>/src/components/$1',
    '@Common/(.*)': '<rootDir>/src/common/$1',
    '@Context/(.*)': '<rootDir>/src/context/$1',
    '@Images/(.*)': '<rootDir>/src/images/$1',
    '@Hooks/(.*)': '<rootDir>/src/hooks/$1',
    '@Pages/(.*)': '<rootDir>/src/pages/$1',
    '@Constants/(.*)': '<rootDir>/src/constants/$1',
    '@Globals/(.*)': '<rootDir>/src/globals/$1',
    '@Generated/(.*)': '<rootDir>/src/generated/$1',
    '@Lib/(.*)': '<rootDir>/src/lib/$1',
  },
};
