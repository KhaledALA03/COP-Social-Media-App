import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function Messaging() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Messaging</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // vertical center
    alignItems: 'center',     // horizontal center
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
});
