import { get, ref } from 'firebase/database';
import { FIREBASE_DB } from '@/firebase/FirebaseConfig';

export const getComments = async (postId: string): Promise<Comment[]> => {
  try {
    const commentsRef = ref(FIREBASE_DB, `posts/${postId}/comments`);
    const snapshot = await get(commentsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      const formattedComments: Comment[] = Object.entries(data).map(([key, value]: [string, any]) => ({
        id: key,   
        ...value,  
      }));
      

      return formattedComments.reverse();  
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};