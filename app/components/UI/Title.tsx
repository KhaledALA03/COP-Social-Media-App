import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
export default function Title() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>LinkUp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 60,
    fontFamily:'DancingScript-Regular',
    color: Colors.primary300,
    textAlign: 'center',
  },
});
