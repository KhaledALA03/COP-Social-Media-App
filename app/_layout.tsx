// app/_layout.tsx
import { SplashScreen, Slot, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const router = useRouter();

  const [fontsLoaded] = useFonts({
    'Lexend-Regular': require('../assets/fonts/Lexend-Regular.ttf'),
    'Lexend-Bold': require('../assets/fonts/Lexend-Bold.ttf'),
    'DancingScript-Regular': require('../assets/fonts/DancingScript-Regular.ttf'),
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setAuthChecked(true);

      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (fontsLoaded && authChecked) SplashScreen.hideAsync();
  }, [fontsLoaded, authChecked]);

  if (!fontsLoaded || !authChecked) return null;

  return (
    <>
      <Slot />
      <StatusBar style="dark" />
    </>
  );
}
