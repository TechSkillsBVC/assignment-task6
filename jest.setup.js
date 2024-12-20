import '@testing-library/jest-native/extend-expect';

// Mock ExpoModulesCore which is used by many Expo packages
jest.mock('expo-modules-core', () => {
  const modules = jest.requireActual('expo-modules-core');
  return {
    ...modules,
    NativeModulesProxy: new Proxy({}, {
      get() {
        return () => {};
      },
    }),
  };
});

// Mock the AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock expo-constants
jest.mock('expo-constants', () => ({
  Constants: {
    manifest: {
      extra: {
        IMGBB_API_KEY: 'mock-api-key',
      },
    },
  },
}));

// Silence the warning: Animated: `useNativeDriver` is not supported
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
