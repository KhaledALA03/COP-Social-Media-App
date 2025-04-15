import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { ref, get } from 'firebase/database';
import { FIREBASE_DB, FIREBASE_AUTH } from '@/firebase/FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelectUser: (chatId: string, email: string) => void;
};

type User = {
  uid: string;
  email: string;
};

export default function NewChatModal({ visible, onClose, onSelectUser }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (visible) fetchUsers();
  }, [visible]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const snapshot = await get(ref(FIREBASE_DB, 'users'));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const parsed: User[] = Object.keys(data).map(uid => ({
          uid,
          email: `@${data[uid].email.split('@')[0]}`,
        }));
        setUsers(parsed);
      }
    } catch (error) {
      console.error('❌ Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.fullscreenModal}>
        <View style={styles.header}>
          <Text style={styles.title}>New Message</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeIcon}>
            <Ionicons name="close" size={26} color="#333" />
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={users}
            ListHeaderComponent={() => (
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'skyblue' }}>
                Select a user to message
              </Text>
            )}
            keyExtractor={(item) => item.uid}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.userItem}
                onPress={() => {
                  const currentUserId = FIREBASE_AUTH.currentUser?.uid;
                  if (!currentUserId) return;

                  const chatId = [currentUserId, item.uid].sort().join('_');

                  onSelectUser(chatId, item.email);
                  onClose();
                }}
              >
                <Text style={styles.userText}>{item.email}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fullscreenModal: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeIcon: {
    padding: 4,
  },
  userItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  userText: {
    fontSize: 16,
  },
});
