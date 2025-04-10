import { StyleSheet, View, FlatList } from "react-native";
import React from "react";
import PostCard from "./PostCard";
import PostsList from "../UI/PostsList";

type Post = {
  id: string | number;
  userId: string | number;
  title: string;
  creator?: string;
  photo?: string;
  profilePic?: string;
  likes?: number;
  comments?: number;
  createdAt?: string;
  email?: string;
};

type User = {
  userId?: number;
  email?: string;
};

type FeedProps = {
  data?: Post[]; // Mark as optional or provide a default
  onRefresh?: () => void;
  refreshing?: boolean;
};

export default function Feed({ data = [], onRefresh, refreshing }: FeedProps) {
  return (
    <View style={styles.container}>
      {/* <FlatList
          data={data}
          renderItem={({ item }) => (
            <PostCard
              // title={item.title}
              // imageUrl={item.photo || ''}
              // creator={typeof item.creator === 'string' ? item.creator : String(item.userId)}
              // likes={typeof item.likes === 'number' ? item.likes : 0}
              // comments={typeof item.comments === 'number' ? item.comments : 0}
              // createdAt={item.createdAt || ''}
              // id={item.id?.toString?.() || ''}
              // userId={item.userId?.toString?.() || ''}
              // profilepic={item.profilePic || ''}

              title={item.title}
              userEmail={`@${item.email?.slice(0, item.email.indexOf('@')) || ''}`}

              likes={item.likes ?? 0}
              userId={(item.userId ?? '').toString()}
              id={(item.id ?? '').toString()}
          

            />
          )}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          onRefresh={onRefresh} 
          refreshing={refreshing} 
        /> */}
      <PostsList
        data={data}
        onRefresh={onRefresh ?? (() => {})} // fallback to empty function
        refreshing={refreshing ?? false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 20,
  },
});
