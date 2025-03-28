import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <Link href="/(tabs)"  asChild>
        <Pressable style={styles.linkButton}  >
          <Text style={styles.linkText}>Go to Home</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
  },
  linkButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  linkText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 16,
  },
});
