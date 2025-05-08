import React, { useEffect } from 'react';
import { registerForPushNotificationsAsync } from '@/hooks/useNotifications'; // or wherever it's stored
import { FIREBASE_AUTH, FIREBASE_DB } from '@/firebase/FirebaseConfig';
import { ref, update } from 'firebase/database';
import { View,Text } from 'react-native';
import HomeScreen from '@/screens/Tabs/HomeScreen';
export default function Index() {
  useEffect(() => {
    const getToken = async () => {
      const token = await registerForPushNotificationsAsync();
      console.log('🔔 Expo Push Token:', token);

      if (token && FIREBASE_AUTH.currentUser) {
        const userRef = ref(FIREBASE_DB, `users/${FIREBASE_AUTH.currentUser.uid}`);
        await update(userRef, { expoPushToken: token });
      }
    };

    getToken();
  }, []);

  return (
    <HomeScreen/>
  );
}
