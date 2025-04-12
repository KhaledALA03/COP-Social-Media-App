import { View, Text, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { FIREBASE_AUTH } from '@/firebase/FirebaseConfig';
import { useEffect, useState, useCallback } from 'react';
import { getPosts, Post } from '@/firebase/getPosts';
import PostsList from '../UI/PostsList';
import Header from './Header';
export default function UserPosts({header}) {
  const user = FIREBASE_AUTH.currentUser;
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getUserPosts = async () => {
    if (!user) return;

    setLoading(true);
    const data = await getPosts();
    const userPosts = data.filter((post) => post.userId === user.uid);
    console.log(userPosts)
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


    <PostsList  data={posts}  onRefresh={onRefresh} refreshing={refreshing} header={header}/>
    // <View style={styles.container}>
    //   {loading ? (
    //     <ActivityIndicator size="large" style={styles.loading} />
    //   ) : posts.length > 0 ? (
    //     <FlatList
    //       data={posts}
    //       keyExtractor={(item) => item.id}
    //       showsVerticalScrollIndicator={false}
    //       horizontal={false}
    //       onRefresh={onRefresh}
    //       refreshing={refreshing}
    //       renderItem={({ item }) => (
    //         <View style={styles.postCard}>
    //           <Text style={styles.postTitle}>{item.title}</Text>
    //           <Text style={styles.postDate}>{item.createdAt?.split('T')[0]}</Text>
    //         </View>
    //       )}
    //     />
    //   ) : (
    //     <Text style={styles.noPosts}>No posts found</Text>
    //   )}
    // </View>
  );
}

const styles = StyleSheet.create({  })
