import { StyleSheet, Text, View, Image, Dimensions, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';

type LoginImageProps = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export default function LoginImage({ loading, setLoading }: LoginImageProps) {
  const { width } = Dimensions.get('window');

  return (
    <View style={styles.container}>


      <Image
        source={require('@/assets/images/login-illustration.png')}
        style={[styles.image, { width: width * 0.5, height: width * 0.5 }]}
        resizeMode="contain"
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 200, // ensure space for the spinner
  },
  image: {
    // Add any styling you'd like here
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
});
