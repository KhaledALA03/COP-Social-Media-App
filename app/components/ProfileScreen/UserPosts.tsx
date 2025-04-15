import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '@/firebase/FirebaseConfig';
import { useEffect, useState, useCallback } from 'react';
import { getPosts, Post } from '@/firebase/getPosts';
import PostsList from '../UI/PostsList';
import Header from './Header';

export default function UserPosts({ header }) {
  const user = FIREBASE_AUTH.currentUser;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getUserPosts = async () => {
    if (!user) return;

    setLoading(true);
    const data = await getPosts();
    const userPosts = data.filter((post) => post.userId === user.uid);
    setPosts(userPosts);
    setLoading(false);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true); 
    await getUserPosts();
    setRefreshing(false); 
  }, []);

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <PostsList
      data={posts}
      onRefresh={onRefresh}
      refreshing={refreshing}
      header={header}
      showDelete={true} 
    />
  );
}

const styles = StyleSheet.create({});
