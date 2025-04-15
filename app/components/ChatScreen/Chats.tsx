import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ref, onValue, get } from 'firebase/database';
import { FIREBASE_DB, FIREBASE_AUTH } from '@/firebase/FirebaseConfig';
import { useRouter } from 'expo-router';

type Message = {
  text: string;
  timestamp: number;
  sender: string;
}; 

export default function Chats() {
  const [chatList, setChatList] = useState<any[]>([]);
  const [userMap, setUserMap] = useState<Record<string, string>>({});
  const currentUserId = FIREBASE_AUTH.currentUser?.uid;
  const router = useRouter();

  useEffect(() => {
    if (!currentUserId) return;

    const fetchUsers = async () => {
      const snapshot = await get(ref(FIREBASE_DB, 'users'));
      const data = snapshot.val() || {};

      const map = Object.fromEntries(
        Object.entries(data).map(([uid, user]: any) => [uid, user.email])
      );

      setUserMap(map);
    };

    fetchUsers();

    const chatRef = ref(FIREBASE_DB, 'chats');

    const unsubscribe = onValue(chatRef, (snap) => {
      const data = snap.val() || {};

      const chats = Object.entries(data)
        .filter(([id]) => id.includes(currentUserId))
        .map(([chatId, chatData]: any) => {
          const messages = Object.values(chatData.messages || {}) as Message[];
          const last = messages.sort((a, b) => b.timestamp - a.timestamp)[0];
          const otherUid = chatId.split('_').find((uid: string) => uid !== currentUserId);

          const username = userMap[otherUid || '']?.split('@')[0] || otherUid?.slice(0, 6);
          const email = `@${username}`;

          return {
            chatId,
            lastMessage: last?.text || 'No messages yet',
            recipientEmail: email,
          };
        });

      setChatList(chats);
    });

    return () => unsubscribe();
  }, [userMap]);

  return (
    <FlatList
      data={chatList}
      keyExtractor={(item) => item.chatId}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: '/directmessages',
              params: {
                chatId: item.chatId,
                recipientEmail: item.recipientEmail,
              },
            })
          }
        >
          <View style={styles.chatItem}>
            <Text style={styles.initial}>
              {item.recipientEmail.charAt(1).toUpperCase()}
            </Text>
            <View style={styles.textWrapper}>
              <Text style={styles.chatTitle}>{item.recipientEmail}</Text>
              <Text style={styles.chatSubtitle}>{item.lastMessage}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No chats yet. Start a conversation!</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  initial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginRight: 12,
    width: 26,
    textAlign: 'center',
  },
  textWrapper: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  chatSubtitle: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  emptyContainer: {
    marginTop: 60,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    fontStyle: 'italic',
  },
});
