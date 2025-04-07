// import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
// import React from "react";
// import PostImage from "./PostImage";

// import { Ionicons } from "@expo/vector-icons";
// import Engagement from "./Engagement";
// const screenWidth = Dimensions.get("window").width;

// type PostCardProps = {
//   imageUrl: string;
//   creator: string;
//   title: string;
//   id: string;
//   userId: string;
//   likes: number;
//   comments: number;
//   createdAt: string;
//   profilepic: string;
// };

// export default function PostCard({
//   imageUrl,
//   creator,
//   title,
//   id,
//   userId,
//   likes,
//   comments,
//   createdAt,
//   profilepic,
// }: PostCardProps) {
//   return (
//     <View style={styles.container}>
//       <View style={styles.imageWrapper}>
//         <PostImage imageUrl={imageUrl} />
//       </View>
//       <View style={styles.content}>
//         <View style={styles.header}>
//           <Image source={{ uri: profilepic }} style={styles.avatar} />
//           <Text style={styles.creator}>{creator}</Text>
//         </View>
//         <Text style={styles.text}>{title}</Text>
//         <View style={styles.footer}>
//           <Engagement likes={likes} comments={comments} />
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     width: screenWidth * 0.9,
//     backgroundColor: "white",
//     borderRadius: 23,
//     overflow: "hidden",
//     marginBottom: 20,
//   },
//   imageWrapper: {
//     height: 300,
//   },
//   content: {
//     padding: 12,
//     justifyContent: "center",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 4,
//   },
//   avatar: {
//     width: 30,
//     height: 30,
//     borderRadius: 15,
//     marginRight: 8,
//   },
//   creator: {
//     fontWeight: "600",
//     fontSize: 14,
//   },
//   text: {
//     fontSize: 25,
//     color: "#333",
//   },
//   footer: {
//     marginTop: 6,
//     flexDirection: "row",
//     justifyContent: "space-between",
//   },
// });
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import Engagement from "./Engagement";
const screenWidth = Dimensions.get('window').width;

type PostCardProps = {
  title: string;
  userEmail: string;
  likes: number;
  commentsCount: number;
  id: string;
  userId: string;
};

export default function PostCard({ title, userEmail,likes,commentsCount,id,userId }: PostCardProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.email}>{userEmail}</Text>
      <View style={styles.footer}>
     <Engagement likes={likes} commentsCount={commentsCount} id={id}  userId={userId} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.9,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
     footer: {
     marginTop: 6,
     flexDirection: "row",
justifyContent: "space-between",
   },
});
