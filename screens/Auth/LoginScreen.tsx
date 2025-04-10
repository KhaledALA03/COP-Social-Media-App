import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import DismissKeyboard from '@/app/components/utils/DismissKeyboard';
import TopRightBlob from '@/app/components/SVG/TopRightBlob';
import BottomLeftBlob from '@/app/components/SVG/BottomLeftBlob';
import Title from '@/app/components/UI/Title';
import LoginImage from '@/app/components/UI/LoginImage';
import LoginForm from '@/app/components/AuthForm/LoginForm';
import AuthFooter from '@/app/components/UI/AuthFooter';
import Colors from '@/constants/Colors';

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <TopRightBlob />
        <BottomLeftBlob />

        <View style={styles.formContainer}>
          <Title />
          <LoginImage loading={loading} setLoading={setLoading} />
          <Text style={styles.title}>Login to your account</Text>
          <LoginForm />
        </View>

        <AuthFooter />

        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color={Colors.primary100} />
          </View>
        )}
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
  formContainer: {
    top: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Lexend-Regular',
    color: Colors.primary100,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
