import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase } from 'firebase/database'; 
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyDzpc2CcAIgwpjlgFdmFGJjT0kMenJbBjE',
  authDomain: 'cop-social-media-app-cf3c8.firebaseapp.com',
  projectId: 'cop-social-media-app-cf3c8',
  storageBucket: 'cop-social-media-app-cf3c8.appspot.com',
  messagingSenderId: '821243500651',
  appId: '1:821243500651:web:82ce2b97c63bb0fb4d792e',
  databaseURL: 'https://cop-social-media-app-cf3c8-default-rtdb.firebaseio.com', // ✅ Required for Realtime DB
};

export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const FIREBASE_STORAGE = getStorage(FIREBASE_APP); 
export const FIREBASE_DB = getDatabase(FIREBASE_APP);
