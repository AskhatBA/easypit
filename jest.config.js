const TRANSPILED_MODULES = [
  '(jest-)?react-native',
  '@react-native',
  '@react-native-community',
  '@react-navigation',
  'react-native-svg',
  'react-native-screens',
  'react-native-safe-area-context',
].join('|');

module.exports = {
  preset: '@react-native/jest-preset',
  // Эти пакеты публикуются как ESM — babel должен их обработать.
  transformIgnorePatterns: [
    `node_modules/(?!(?:.pnpm/)?(${TRANSPILED_MODULES})/)`,
  ],
  moduleNameMapper: {
    '\\.svg$': '<rootDir>/jest/svg-mock.tsx',
  },
};
