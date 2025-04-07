import { Stack, SplashScreen, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useEffect } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebase/FirebaseConfig";

export default function RootLayout() {
  const router = useRouter();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (!user) {
        router.replace("/login");
      }
      else{
        router.replace("/(tabs)");
      }
    });
    return unsubscribe;
  }, []);

  const [fontsLoaded] = useFonts({
    "Lexend-Regular": require("../assets/fonts/Lexend-Regular.ttf"),
    "Lexend-Bold": require("../assets/fonts/Lexend-Bold.ttf"),
    "DancingScript-Regular": require("../assets/fonts/DancingScript-Regular.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <>
      <Stack>
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="signup"
          options={{ headerTransparent: true, headerTitle: "" }}
        />
        
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
