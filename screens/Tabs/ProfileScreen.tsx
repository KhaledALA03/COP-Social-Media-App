import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { FIREBASE_AUTH } from "@/firebase/FirebaseConfig";
import { useEffect, useState } from "react";
import { getPosts, Post } from "@/firebase/getPosts";
import Header from "@/app/components/ProfileScreen/Header";
import { testWriteToFirebase } from "@/auth/auth";
import UserPosts from "@/app/components/ProfileScreen/UserPosts";
import Colors from "@/constants/Colors";
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
    <SafeAreaView style={styles.container}>
      <UserPosts header={true} />

      <View style={{ alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => FIREBASE_AUTH.signOut()}
          style={styles.logoutButton}
        >
          <Text style={styles.logout}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.background100,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  loading: {
    marginTop: 20,
  },
  postCard: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f1f1f1",
    marginBottom: 10,
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  postDate: {
    color: "gray",
    fontSize: 12,
    marginTop: 4,
  },
  noPosts: {
    marginTop: 20,
    fontStyle: "italic",
    color: "gray",
  },
  logoutButton: {
    backgroundColor: Colors.primary300,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  logout: {
    fontSize: 20,
    color: "white",
  },
});
