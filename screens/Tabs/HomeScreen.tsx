import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { ref, get } from "firebase/database";
import { FIREBASE_DB } from "@/firebase/FirebaseConfig";
import Feed from "@/app/components/HomeScreen/Feed";
import Colors from "@/constants/Colors";
import { getPosts,Post } from "@/firebase/getPosts";
import post from "@/app/(tabs)/post";

export default function HomeScreen() {

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const fetchPosts = async () => {
    try {
      console.log("🔄 Fetching posts...");
      setLoading(true);
      const data = await getPosts();
      console.log("✅ Posts fetched:", data);
      setPosts(data);
    } catch (error) {
      console.error("❌ fetchPosts error:", error);
    } finally {
      setLoading(false);
      console.log("🔚 Loading complete");
    
    }
  };


  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <View style={styles.container}  testID="home-screen">
      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary100} />
      ) : (
        <Feed data={posts} onRefresh={fetchPosts} refreshing={loading} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
});
