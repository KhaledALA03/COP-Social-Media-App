import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import CommentsModal from './CommentsModal';
import { FIREBASE_AUTH } from '@/firebase/FirebaseConfig';

type EngagementProps = {
  likes: number;
  commentsCount: number;
  userId: string;
  id: string; 
};

export default function Engagement({ likes, commentsCount, id, userId }: EngagementProps) {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  function handleLike() {
    setLiked(!liked);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
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
          <Text style={styles.text}>{likeCount}</Text>
          
        </TouchableOpacity>
      </View>

      <View style={styles.item}>
        <TouchableOpacity onPress={() => setShowComments(true)} style={styles.row}>
          <Ionicons name="chatbubble-ellipses-outline" size={25} color="#333" style={styles.icon} />
          {/* <Text style={styles.text}>{commentsCount}</Text> */}
        </TouchableOpacity>
      </View>

      <CommentsModal
        visible={showComments}
        onClose={() => setShowComments(false)}
        commentsCount={commentsCount}
        postId={id}
        userId={FIREBASE_AUTH.currentUser?.uid || ''}
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
