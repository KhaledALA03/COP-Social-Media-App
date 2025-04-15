import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import AuthInput from '../UI/AuthInput';
import SubmitButton from '../UI/SubmitButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebase/FirebaseConfig';



interface LoginValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email.')
    .required('Email is required.'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters.')
    .required('Password is required.'),
});

export default function LoginForm() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const auth = FIREBASE_AUTH;


  const handleLogin = async (
    values: LoginValues,
    { setSubmitting }: FormikHelpers<LoginValues>
  ) => {
    setIsAuthenticating(true);
    try {
      const response = await signInWithEmailAndPassword(auth, values.email, values.password);
      console.log("✅ Login success:", response.user.email);

    } catch (error: any) {
      console.error('Login error:', error.code || error.message);
    } finally {
      setIsAuthenticating(false);
      setSubmitting(false);
    }
  };

  if (isAuthenticating) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleLogin}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <AuthInput
            placeholder="Email"
            icon="mail-outline"
            value={values.email}
            onChangeText={handleChange('email')}
            keyboardType="email-address"
            errorMessage={touched.email && errors.email ? errors.email : undefined}
          />
          <AuthInput
            placeholder="Password"
            icon="lock-closed-outline"
            value={values.password}
            onChangeText={handleChange('password')}
            secureTextEntry
            errorMessage={touched.password && errors.password ? errors.password : undefined}
          />
          <SubmitButton title="Login" onPress={handleSubmit as () => void} />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
});
