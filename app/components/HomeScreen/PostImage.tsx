import { StyleSheet, Image } from 'react-native';
import React from 'react';

export default function PostImage() {
  return (
    <Image
      source={require('../../../assets/images/erin-vey-0tEuA6ByeoY-unsplash.jpg')}
      style={styles.image}
      resizeMode="cover" 
    />
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
  },
});
