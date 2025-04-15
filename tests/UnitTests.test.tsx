import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

import LoginScreen from '@/screens/Auth/LoginScreen';
import SignupScreen from '@/screens/Auth/SignupScreen';
import HomeScreen from '@/screens/Tabs/HomeScreen';
import ProfileScreen from '@/screens/Tabs/ProfileScreen';
import ChatScreen from '@/screens/Tabs/ChatScreen';

// Mocks
jest.mock('firebase/database', () => ({
  ref: jest.fn(() => 'mockRef'),
  get: jest.fn(() =>
    Promise.resolve({
      val: () => ({
        user1: { email: 'mock@user.com' },
      }),
    })
  ),
  onValue: jest.fn((ref, cb) => {
    cb({
      val: () => ({
        chat1: { message: 'hello' },
        chat2: { message: 'world' },
      }),
    });
    return () => {};
  }),
}));

jest.mock('@/app/components/UI/AuthFooter', () => () => <></>);

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  getAllKeys: jest.fn(),
}));

jest.mock('@/firebase/FirebaseConfig', () => ({
  FIREBASE_AUTH: {
    currentUser: { uid: '123', email: 'test@example.com' },
    signOut: jest.fn(),
  },
}));

jest.mock('firebase/app', () => ({}));
jest.mock('firebase/auth', () => ({}));
jest.mock('firebase/auth/react-native', () => ({
  getReactNativePersistence: () => jest.fn(),
}));
jest.mock('firebase/storage', () => ({}));

jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
  FontAwesome: () => null,
  AntDesign: () => null,
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

jest.mock('@/app/components/ProfileScreen/UserPosts', () => () => <></>);
jest.mock('@/app/components/ProfileScreen/Header', () => () => <></>);

describe('Screen render tests', () => {
  it('renders Login screen', () => {
    const { getByTestId } = render(<LoginScreen />);
    expect(getByTestId('login-screen')).toBeTruthy();
  });

  it('renders Register screen', () => {
    const { getByTestId } = render(<SignupScreen />);
    expect(getByTestId('signup-screen')).toBeTruthy();
  });

  it('renders Home screen', () => {
    const { getByTestId } = render(<HomeScreen />);
    expect(getByTestId('home-screen')).toBeTruthy();
  });

  it('renders Profile screen', () => {
    const { getByTestId } = render(<ProfileScreen />);
    expect(getByTestId('profile-screen')).toBeTruthy();
  });

  it('renders Chat screen', () => {
    const { getByTestId } = render(<ChatScreen />);
    expect(getByTestId('chat-screen')).toBeTruthy();
  });
});

describe('LoginForm validation tests', () => {
  it('shows validation errors when form is empty', async () => {
    const { getByText } = render(<LoginScreen />);

    fireEvent.press(getByText('Login'));

    await waitFor(() => {
      expect(getByText('Email is required.')).toBeTruthy();
      expect(getByText('Password is required.')).toBeTruthy();
    });
  });
});
