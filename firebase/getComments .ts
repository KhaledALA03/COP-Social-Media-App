import { get, ref } from 'firebase/database';
import { FIREBASE_DB } from '@/firebase/FirebaseConfig';

export const getComments = async (postId: string): Promise<Comment[]> => {
  try {
    const commentsRef = ref(FIREBASE_DB, `posts/${postId}/comments`);
    const snapshot = await get(commentsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      // Convert object to an array of comment objects
      const formattedComments: Comment[] = Object.entries(data).map(([key, value]: [string, any]) => ({
        id: key,    // Firebase key
        ...value,   // Firebase data
      }));

      return formattedComments.reverse();  // Newest comments first
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};