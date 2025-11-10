// jest-setup.js
// Mock simples para expo-secure-store
jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn(async () => null),
  setItemAsync: jest.fn(async () => null),
  deleteItemAsync: jest.fn(async () => null),
}));
