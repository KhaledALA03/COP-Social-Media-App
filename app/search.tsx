import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { ref, get } from 'firebase/database';
import { FIREBASE_DB } from '@/firebase/FirebaseConfig';
import React, {useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

type User = {
  uid: string;
  email: string;
};

export default function SearchScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchText, setSearchText] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
        setFilteredUsers(parsed);
      }
    } catch (error) {
      console.error('❌ Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.email.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchText]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Users</Text>
      <TextInput
        style={styles.input}
        placeholder="Search by username..."
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={setSearchText}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#aaa" style={{ marginTop: 30 }} />
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/public/[uid]",
                params: { uid: item.uid },
              })
            }
              style={styles.userCard}
            >
              <Text style={styles.userText}>{item.email}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text style={styles.empty}>No users found.</Text>}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    color: '#333',
  },
  userCard: {
    padding: 15,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    backgroundColor: '#fafafa',
    borderRadius: 8,
    marginBottom: 10,
  },
  userText: {
    fontSize: 18,
    color: '#444',
  },
  empty: {
    textAlign: 'center',
    color: '#888',
    marginTop: 40,
    fontSize: 16,
  },
});
