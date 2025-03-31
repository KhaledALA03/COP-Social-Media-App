import React from 'react';
import { View, StyleSheet,ScrollView } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import AuthInput from '../UI/AuthInput'; // adjust the path as needed
import { Link } from 'expo-router';
import SubmitButton from '../UI/SubmitButton';
import { router } from 'expo-router';

interface RegValues {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Please enter a valid email.')
    .required('Email is required.'),
  username: Yup.string().required('Username is required.'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters.')
    .required('Password is required.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match.')
    .required('Confirm Password is required.'),
});

export default function RegForm() {
  const initialValues: RegValues = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(
        values: RegValues,
        { setSubmitting }: FormikHelpers<RegValues>
      ) => {
        console.log('Form submitted:', values);
      
        router.push('/(tabs)');

        setSubmitting(false);
      }}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
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
            placeholder="Username"
            icon="person-outline"
            value={values.username}
            onChangeText={handleChange('username')}
            errorMessage={touched.username && errors.username ? errors.username : undefined}
          />

          <AuthInput
            placeholder="Password"
            icon="lock-closed-outline"
            value={values.password}
            onChangeText={handleChange('password')}
            secureTextEntry={true}
            errorMessage={touched.password && errors.password ? errors.password : undefined}
          />

          <AuthInput
            placeholder="Confirm Password"
            icon="lock-closed-outline"
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
            secureTextEntry={true}
            errorMessage={
              touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : undefined
            }
          />

          <Link href="/signup" asChild>
            <SubmitButton title="Register" onPress={handleSubmit as () => void} />
          </Link>
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
