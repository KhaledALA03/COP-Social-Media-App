import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import RegForm from "@/app/components/AuthForm/RegForm";
import DismissKeyboard from "@/app/components/utils/DismissKeyboard";
import Colors from "@/constants/Colors";
import BottomLeftBlob from "@/app/components/SVG/BottomLeftBlob";
import { createUser } from "@/auth/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from '@/firebase/FirebaseConfig';


export default function SignupScreen() {

  


  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}  testID="signup-screen">
        <BottomLeftBlob />

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.title}>Create a new account</Text>
          <RegForm />
        </ScrollView>
      </SafeAreaView>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background100,
    paddingHorizontal: 24,
    
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    top: 100,
  },
  title: {
    fontSize: 28,
    fontFamily: "Lexend-Regular",
    color: Colors.primary100,
    marginBottom: 24,
  
    
  },
});
