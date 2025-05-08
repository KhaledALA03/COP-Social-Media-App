// app/public/[uid].tsx
import { useLocalSearchParams, useNavigation } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Post, getPosts } from "@/firebase/getPosts";
import Header from "../components/ProfileScreen/Header";
import PostsList from "../components/UI/PostsList";
import { ref, get } from "firebase/database";
import { FIREBASE_DB } from "@/firebase/FirebaseConfig";

export default function PublicProfile() {
  const { uid } = useLocalSearchParams();
  const navigation = useNavigation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (uid && typeof uid === "string") {
      fetchUserPosts(uid);
      fetchUserInfo(uid);
    }
  }, [uid]);

  const fetchUserPosts = async (userId: string) => {
    const data = await getPosts();
    const userPosts = data.filter((post) => post.userId === userId);
    setPosts(userPosts);
  };

  const fetchUserInfo = async (userId: string) => {
    const snapshot = await get(ref(FIREBASE_DB, `users/${userId}`));
    if (snapshot.exists()) {
      const user = snapshot.val();
      setUserData(user);
      navigation.setOptions({
        title: `@${user.email.split("@")[0]}`, 
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header
        posts={posts}
        user={{
          email: userData?.email || "unknown",
        }}
      />
      <PostsList
        data={posts}
        refreshing={false}
        onRefresh={() => {}}
        header={false}
        showDelete={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
});
