import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { useState, useEffect } from "react";
import { router } from 'expo-router';
import AuthInput from '@/app/components/UI/AuthInput';
import LoginForm from '@/app/components/AuthForm/LoginForm';
import TopRightBlob from '@/app/components/SVG/TopRightBlob';
import Colors from '@/constants/Colors';
import BottomLeftBlob from '@/app/components/SVG/BottomLeftBlob';
import Title from '@/app/components/UI/Title';
import { SafeAreaView } from 'react-native-safe-area-context';
import DismissKeyboard from '@/app/components/utils/DismissKeyboard';
import AuthFooter from '@/app/components/UI/AuthFooter';
import login from '@/app/login';
import { ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {


  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <TopRightBlob />
        <BottomLeftBlob />

        <View style={styles.formContainer}>
          <Title />
          <Text style={styles.title}>Login to your account</Text>
          <LoginForm />
        </View>

        <AuthFooter />
      </SafeAreaView>
    </DismissKeyboard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,

    
  },
  title: {
    fontSize: 28,
    fontFamily: 'Lexend-Regular',
    color: Colors.primary100,
  },
  formContainer: {
    top:100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
