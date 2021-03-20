jest.mock('react-native-navigation', () => ({
  Navigation: {
    push: (...args) => {
      return args;
    },
  },
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: async () => {},
  setItem: async () => {},
}));

jest.mock('react-native-vector-icons/Ionicons', () => 'Text');
