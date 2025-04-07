import { get, ref } from 'firebase/database';
import { FIREBASE_DB } from '@/firebase/FirebaseConfig';

export type Post = {
  id: string;
  userId: string;
  title: string;
  creator?: string;
  photo?: string;
  profilePic?: string;
  likes?: number;
  comments?: number;
  createdAt?: string;
  email?: string;
};

export const getPosts = async (): Promise<Post[]> => {
  try {
    const postsRef = ref(FIREBASE_DB, 'posts');
    const snapshot = await get(postsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const formattedPosts: Post[] = Object.entries(data).map(([key, value]: [string, any]) => ({
        id: key,
        ...value,
      }));
      return formattedPosts.reverse(); 
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};
