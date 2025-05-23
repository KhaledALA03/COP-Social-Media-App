import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from "react-native";
import Colors from "@/constants/Colors";
import CreatePostModal from "../components/HomeScreen/CreatePostModal";
import { uploadImageAsync } from "@/firebase/storageHelpers";
import { createPost } from "@/firebase/dbHelpers";
import { FIREBASE_AUTH } from "@/firebase/FirebaseConfig";
import { useRouter } from "expo-router"; 

const { width } = Dimensions.get("window");

export default function TabsLayout() {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSubmit = async (title: string) => {
    try {
      const user = FIREBASE_AUTH.currentUser;
      if (!user) throw new Error("User not authenticated");

      const userId = user.uid;
      const email = user.email;

      if (!email) throw new Error("User email not found");

      const photoUri = "";
      await createPost(userId, title, photoUri, email);

      console.log("✅ Post created (no image)");
    } catch (err) {
      console.error("❌ Error creating text post:", err);
    }
  };

  return (
    <>
      <CreatePostModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
      />

      <Tabs
        screenOptions={{
          tabBarStyle: {
            height: 90,
            borderRadius: 40,
            backgroundColor: "white",
            elevation: 10,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 10,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerTitle: "LinkUp Feed",
            headerTitleAlign: "left",
            tabBarLabel: "Home",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTitleStyle: {
              fontFamily: "DancingScript-Regular",
              fontSize: 30,
              color: Colors.primary300,
              alignItems: "flex-start",
              height: 50,
            },
            headerShadowVisible: false,
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="home-outline"
                size={24}
                color={color}
                style={styles.icon}
              />
            ),
            headerRight: () => <SearchButton />, // ✅ added search button
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            headerTitle: "LinkUp Direct Messages",
            headerTitleAlign: "left",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTitleStyle: {
              fontFamily: "DancingScript-Regular",
              fontSize: 30,
              color: Colors.primary300,
              alignItems: "flex-start",
              height: 50,
            },
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="chatbubble-outline"
                size={24}
                color={color}
                style={styles.icon}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="post"
          options={{
            headerShown: false,
            tabBarButton: () => (
              <CustomCenterButton onPress={() => setModalVisible(true)} />
            ),
          }}
        />

        <Tabs.Screen
          name="likes"
          options={{
            headerTitle: "LinkUp Likes",
            headerTitleAlign: "left",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTitleStyle: {
              fontFamily: "DancingScript-Regular",
              fontSize: 30,
              color: Colors.primary300,
              alignItems: "flex-start",
              height: 50,
            },
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="heart-outline"
                size={24}
                color={color}
                style={styles.icon}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            headerTitle: "LinkUp Profile",
            headerTitleAlign: "left",
            tabBarLabel: "Home",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTitleStyle: {
              fontFamily: "DancingScript-Regular",
              fontSize: 30,
              color: Colors.primary300,
              alignItems: "flex-start",
              height: 50,
            },
            headerShadowVisible: false,
            tabBarIcon: ({ color }) => (
              <Ionicons
                name="person-outline"
                size={24}
                color={color}
                style={styles.icon}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

// ✅ Custom search button component
function SearchButton() {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/search")}
      style={{ marginRight: 15 }}
    >
      <Ionicons
        name="search"
        size={24}
        color={Colors.primary300}
        style={{ marginRight: 10 }}
      />
    </TouchableOpacity>
  );
}

function CustomCenterButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      style={styles.centerButtonWrapper}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.centerButton}>
        <Ionicons
          name="add-outline"
          size={24}
          color="#fff"
          style={styles.rotatedIcon}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  centerButtonWrapper: {
    top: -10,
    justifyContent: "center",
    alignItems: "center",
  },
  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 23,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    transform: [{ rotate: "45deg" }],
  },
  icon: {
    paddingTop: 5,
  },
  rotatedIcon: {
    transform: [{ rotate: "-45deg" }],
  },
});
