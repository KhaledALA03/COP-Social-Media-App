import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import AuthInput from '../UI/AuthInput';
import SubmitButton from '../UI/SubmitButton';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebase/FirebaseConfig';

interface RegValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email.')
    .required('Email is required.'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters.')
    .required('Password is required.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match.')
    .required('Confirm Password is required.'),
});

export default function RegForm() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleSignUp = async (
    values: RegValues,
    { setSubmitting }: FormikHelpers<RegValues>
  ) => {
    setIsAuthenticating(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      console.log("✅ Signup success:", response.user.email);

    } catch (error) {
      console.error("❌ Signup error:", error);
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
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSignUp}
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

          <AuthInput
            placeholder="Confirm Password"
            icon="lock-closed-outline"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            secureTextEntry
            errorMessage={
              touched.confirmPassword && errors.confirmPassword
                ? errors.confirmPassword
                : undefined
            }
          />
  
          <SubmitButton title="Register" onPress={handleSubmit as () => void} />
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
