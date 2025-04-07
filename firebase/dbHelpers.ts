import { ref, set, push } from 'firebase/database';
import { FIREBASE_DB } from './FirebaseConfig';


export function writeUserData(
  userId: string,
  username: string,
  email: string,
  profilePic: string
) {
  const userRef = ref(FIREBASE_DB, `users/${userId}`);
  return set(userRef, {
    username,
    email,
    profile_picture: profilePic,
  });
}

/**
 * Create a new post in the database
 * @param userId - ID of the user creating the post
 * @param title - The post's caption or text
 * @param photo - Optional image URL
 */

export async function createPost(
  userId: string,
  title: string,
  photo?: string,
  email?: string
) {
  try {
    const postRef = push(ref(FIREBASE_DB, 'posts'));

    await set(postRef, {
      userId,
      email: email || '', // Set empty string if no email is provided
      title,
      photo: photo || '', // Set empty string if no image is provided
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    });

    console.log('✅ Post saved to Firebase DB');
  } catch (error) {
    console.error('❌ Failed to create post:', error);
  }
}


export async function createComments(
  userId: string,
  content: string,
  postId: string,
){
  try {
    const commentRef = push(ref(FIREBASE_DB, `posts/${postId}/comments`));
    await set(commentRef, {
      userId,
      content,
      createdAt: new Date().toISOString(),
    });
    console.log('✅ Comment saved to Firebase DB');

  } catch (error) {
    console.error('❌ Failed to create comment:', error);

  }
}