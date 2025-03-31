import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import AuthInput from '../UI/AuthInput'; 
import { Link } from 'expo-router';
import SubmitButton from '../UI/SubmitButton';
import { router } from 'expo-router';
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

export default function LoginForm(){
  const initialValues: LoginValues = { email: '', password: '' };

  return (

    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(
        values: LoginValues,
        { setSubmitting }: FormikHelpers<LoginValues>
      ) => {
        console.log('Form submitted:', values);
        router.push('/(tabs)')
    
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
            placeholder="Password"
            icon="lock-closed-outline" 
            value={values.password}
            onChangeText={handleChange('password')}
            secureTextEntry={true}
            errorMessage={touched.password && errors.password ? errors.password : undefined}
          />

          <Link href="/signup" asChild>
            <SubmitButton title="Login" onPress={handleSubmit as () => void} />
          </Link>
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex:1,
  },
});
