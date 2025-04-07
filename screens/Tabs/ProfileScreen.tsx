import { View, Text, Button, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '@/firebase/FirebaseConfig';
import { useEffect, useState } from 'react';
import { getPosts, Post } from '@/firebase/getPosts';

export default function ProfileScreen() {
  const user = FIREBASE_AUTH.currentUser;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const getUserPosts = async () => {
    if (!user) return;

    setLoading(true);
    const data = await getPosts();
    const userPosts = data.filter((post) => post.userId === user.uid);
    setPosts(userPosts);
    setLoading(false);
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <Text style={styles.email}>{user?.email ?? 'No user'}</Text>
        <Text style={styles.postCount}>Posts: {posts.length}</Text>
        <Button title="Logout" onPress={() => FIREBASE_AUTH.signOut()} />
      </View>

      {/* Posts List */}
      {loading ? (
        <ActivityIndicator size="large" style={styles.loading} />
      ) : posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 10 }}
          renderItem={({ item }) => (
            <View style={styles.postCard}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postDate}>{item.createdAt}</Text>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noPosts}>No posts found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center',
    marginTop: 50,
  },
  header: {
    marginBottom: 20,
    gap: 8,
  },
  email: {
    fontSize: 16,
    fontWeight: '600',
  },
  postCount: {
    fontSize: 14,
    color: 'gray',
  },
  loading: {
    marginTop: 20,
  },
  postCard: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f1f1f1',
    marginBottom: 10,
  },
  postTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postDate: {
    color: 'gray',
    fontSize: 12,
    marginTop: 4,
  },
  noPosts: {
    marginTop: 20,
    fontStyle: 'italic',
    color: 'gray',
  },
});
