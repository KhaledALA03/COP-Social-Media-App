import { Ionicons } from '@expo/vector-icons';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import CommentsModal from './CommentsModal';
import { ref, get } from 'firebase/database';
import { FIREBASE_DB, FIREBASE_AUTH } from '@/firebase/FirebaseConfig';
import { toggleLike } from '@/firebase/dbHelpers';

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

  const currentUser = FIREBASE_AUTH.currentUser;
  const user = currentUser?.uid;

  useEffect(() => {
    const fetchData = async () => {
      const postRef = ref(FIREBASE_DB, `posts/${id}`);
      const snapshot = await get(postRef);

      if (snapshot.exists()) {
        const postData = snapshot.val();
        const likedBy = postData.likedBy || {};

        setLikeCount(Object.keys(likedBy).length);
        setLiked(!!likedBy[user]);
        setCommentsCount(postData.commentsCount || 0);
      }
    };

    if (user) fetchData();
  }, [id, user]);

  const handleLike = async () => {
    if (!user) return; // guard clause

    await toggleLike({ user, postId: id });

    const postRef = ref(FIREBASE_DB, `posts/${id}`);
    const snapshot = await get(postRef);

    if (snapshot.exists()) {
      const postData = snapshot.val();
      const likedBy = postData.likedBy || {};

      setLikeCount(Object.keys(likedBy).length);
      setLiked(!!likedBy[user]);
    }
  };

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
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={25}
            color="#333"
            style={styles.icon}
          />
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
    fontSize: 18,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
