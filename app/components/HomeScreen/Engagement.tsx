import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { updateLikes } from '@/firebase/dbHelpers'; // Assuming you have the updateLikes function
import CommentsModal from './CommentsModal'; // Modal for comments
import { ref, get } from 'firebase/database';
import { FIREBASE_DB } from '@/firebase/FirebaseConfig'; // Make sure this is correct

type EngagementProps = {
  likes: number;
  userId: string;
  id: string; 
  userEmail: string; 
};

export default function Engagement({
  likes,
  id,
  userId,
  userEmail, 

}: EngagementProps) {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);
  const [commentsCount, setCommentsCount] = useState<number>(0);  

  useEffect(() => {

    const fetchCommentsCount = async () => {
      const postRef = ref(FIREBASE_DB, `posts/${id}`);
      const snapshot = await get(postRef);
      if (snapshot.exists()) {
        const postData = snapshot.val();
        setCommentsCount(postData.commentsCount || 0);
      }
    };

    fetchCommentsCount();
  }, [id]); 


  async function handleLike() {
    const increment = liked ? -1 : 1;
    setLiked(!liked); // Toggle like status
    setLikeCount((prev) => prev + increment);

    // Update likes count in Firebase
    await updateLikes(id, increment);
  }

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <TouchableOpacity onPress={handleLike} style={styles.row}>
          <Ionicons
            name={liked ? 'heart-sharp' : 'heart-outline'}
            size={25}
            color={liked ? 'red' : '#333'}
            style={styles.icon}
          />
          {/* <Text style={styles.text}>{likeCount}</Text> */}
        </TouchableOpacity>
      </View>

      <View style={styles.item}>
        <TouchableOpacity onPress={() => setShowComments(true)} style={styles.row}>
          <Ionicons name="chatbubble-ellipses-outline" size={25} color="#333" style={styles.icon} />
          <Text style={styles.text}>{commentsCount}</Text> 
        </TouchableOpacity>
      </View>

      <CommentsModal
        visible={showComments}
        onClose={() => setShowComments(false)}
        postId={id}
        userId={userId}
        setCommentsCount={setCommentsCount}  
        commentsCount={commentsCount}  
        userEmail={userEmail}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
  text: {
    fontSize: 24,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
