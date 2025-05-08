module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-native-community' +
      '|react-native-safe-area-context' +
      '|@react-navigation' +
      '|@expo/vector-icons' +
      '|expo' +
      '|expo-router' +
      '|expo-notifications' +
      '|expo-asset' +
      '|expo-modules-core' +
      '|expo-application' +
      '|expo-constants' +
      '|expo-file-system' +
    ')/)',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@expo/vector-icons$': '<rootDir>/__mocks__/expo-icons.js',
    '^expo-font$': '<rootDir>/__mocks__/expo-font.js',
    '^expo-router$': '<rootDir>/__mocks__/expo-router.js',
    '^firebase/(.*)$': '<rootDir>/__mocks__/firebase/$1.js',
    '^firebase$': '<rootDir>/__mocks__/firebase/index.js',
  },
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
