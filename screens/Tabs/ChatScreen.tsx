import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import NewOutline from '@/app/components/ChatScreen/NewOutline';
import Chats from '@/app/components/ChatScreen/Chats';
import { useRouter } from 'expo-router';

export default function ChatScreen() {
  const router = useRouter();
  const handleSelectUser = (chatId: string, email: string) => {
    router.push({
      pathname: '/directmessages', 
      params: {
        chatId,
        recipientEmail: email,
      },
    });
  };

  return (
    <View style={styles.container}  testID='chat-screen'>
      <NewOutline onSelectUser={handleSelectUser} />
      <Chats />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
