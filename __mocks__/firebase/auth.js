export const initializeAuth = jest.fn();
export const getAuth = jest.fn(() => ({
  currentUser: { uid: '123', email: 'test@example.com' },
}));
export const onAuthStateChanged = jest.fn();
