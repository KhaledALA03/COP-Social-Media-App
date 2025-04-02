import { StyleSheet, Text, View, Dimensions } from 'react-native';
import React from 'react';
import PostImage from './PostImage';

const screenWidth = Dimensions.get('window').width;

export default function PostCard() {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <PostImage />
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Post Title</Text>
        <Text style={styles.text}>Post description or info</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: screenWidth * 0.9, // 90% of screen width
    backgroundColor: 'white',
    borderRadius: 23,
    overflow: 'hidden',
    marginBottom: 20,
  },
  imageWrapper: {
    height: 300, // ✅ fixed height to avoid extra white space
  },
  content: {
    padding: 12,
    justifyContent: 'center',
    height: 100, // ✅ fixed height to avoid extra white space
  },
  text: {
    fontSize: 14,
    color: '#333',
  },
});
