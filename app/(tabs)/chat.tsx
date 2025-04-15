import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ChatScreen from '@/screens/Tabs/ChatScreen';

export default function Messaging() {
  return (
    <ChatScreen/>
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
