import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDzpc2CcAIgwpjlgFdmFGJjT0kMenJbBjE',
  authDomain: 'cop-social-media-app-cf3c8.firebaseapp.com',
  projectId: 'cop-social-media-app-cf3c8',
  storageBucket: 'cop-social-media-app-cf3c8.appspot.com',
  messagingSenderId: '821243500651',
  appId: '1:821243500651:web:82ce2b97c63bb0fb4d792e',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
