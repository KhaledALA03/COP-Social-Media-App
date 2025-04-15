import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import Engagement from "../HomeScreen/Engagement";
import PostImage from '../HomeScreen/PostImage';
import Colors from '@/constants/Colors';

const screenWidth = Dimensions.get('window').width;

type PostCardProps = {
  title: string;
  userEmail: string;
  likes: number;
  imageUrl: string;
  id: string;
  userId: string;
  showDelete?: boolean;
};

const avatarColors = [
  '#FF6B6B', 
  '#4ECDC4',
  '#FFD93D', 
  '#6A4C93', 
  '#1E90FF', 
  '#FF8C42', 
];


const getColorForUser = (email: string) => {
  const hash = email
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return avatarColors[hash % avatarColors.length];
};

export default function PostCard({ title, userEmail, likes, id, userId, imageUrl,showDelete }: PostCardProps) {
  const domain = `@${userEmail?.split('@')[0]}`;

  return (
    <View style={styles.container}>
      <View style={styles.usernameWrapper}>
        <View style={[styles.pfp, { backgroundColor: getColorForUser(userEmail) }]}>
          <Text style={styles.pfpText}>{domain[1].toUpperCase()}</Text>
        </View>
        <Text style={styles.email}>{domain}</Text>
      </View>

      <Text style={styles.title}>{title}</Text>

      <View style={styles.footer}>
        <Engagement likes={likes} id={id} userId={userId} userEmail={userEmail} showDelete={showDelete} />
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
    elevation: 1,
  },
  title: {
    fontSize: 20,

    marginBottom: 8,
    color: '#333',
  },
  email: {
    fontSize: 20,
    color: '#666',
    
  },
  footer: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageWrapper: {
    height: 300,
  },
  usernameWrapper: {
    flexDirection: "row",
    marginRight: 8,
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 8,
  },
  pfp: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  pfpText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});
