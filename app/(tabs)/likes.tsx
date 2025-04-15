import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Likes() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Coming soon....</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // vertical centering
    alignItems: 'center',     // horizontal centering
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
});
