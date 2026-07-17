module.exports = {
  project: {
    ios: {},
    android: {},
  },
  // npx react-native-asset копирует эти шрифты в нативные проекты
  // (iOS: Info.plist + Copy Bundle Resources, Android: assets/fonts).
  assets: ['./src/assets/fonts'],
};
