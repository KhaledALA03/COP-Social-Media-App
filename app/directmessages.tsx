import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ref, onValue, push } from 'firebase/database';
import { FIREBASE_DB, FIREBASE_AUTH } from '@/firebase/FirebaseConfig';

type Message = {
  sender: string;
  text: string;
  timestamp: number;
};

export default function DirectMessagesScreen() {
  const { chatId, recipientEmail } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  const currentUserId = FIREBASE_AUTH.currentUser?.uid;

  useEffect(() => {
    const chatRef = ref(FIREBASE_DB, `chats/${chatId}/messages`);
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const data = snapshot.val() || {};
      const parsed = Object.values(data) as Message[];
      const sorted = parsed.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(sorted);
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;

    const msg: Message = {
      sender: currentUserId || 'unknown',
      text: newMessage.trim(),
      timestamp: Date.now(),
    };

    await push(ref(FIREBASE_DB, `chats/${chatId}/messages`), msg);
    setNewMessage('');
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.sender === currentUserId;
    return (
      <View style={[styles.messageBubble, isMe ? styles.myMessage : styles.theirMessage]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : undefined}
    >
      <Text style={styles.title}>Chat with {recipientEmail}</Text>

      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.messagesContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    padding: 16,
    fontSize: 18,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  messagesContainer: {
    padding: 10,
    flexGrow: 1,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
    maxWidth: '75%',
  },
  myMessage: {
    backgroundColor: '#DCF8C5',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#E8E8E8',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fafafa',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#007bff',
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: 'center',
  },
  sendText: {
    color: '#fff',
    fontWeight: '600',
  },
});
