import { ref, set, push,update,get, child  } from 'firebase/database';
import { FIREBASE_APP, FIREBASE_DB } from './FirebaseConfig';


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
      email: email || '', 
      title,
      photo: photo || '',
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
    });

    console.log('✅ Post saved to Firebase DB');
  } catch (error) {
    console.error('❌ Failed to create post:', error);
  }
}

export async function updateLikes(postId: string, increment: number) {
  try {
    const postRef = ref(FIREBASE_DB, `posts/${postId}`);
    await update(postRef, {
      likes: increment
    });
    console.log('✅ Likes updated in Firebase DB');
  } catch (error) {
    console.error('❌ Failed to update likes:', error);
  }
}
export async function createComments(
  userId: string,
  content: string,
  postId: string,
  userEmail: string
) {
  try {
  
    const postRef = ref(FIREBASE_DB, `posts/${postId}`);
    const snapshot = await get(postRef);
    const currentPost = snapshot.val();

    let currentCommentsCount = currentPost?.commentsCount || 0; 

  
    const commentRef = push(ref(FIREBASE_DB, `posts/${postId}/comments`));
    await set(commentRef, {
      userId,
      content,
      createdAt: new Date().toISOString(),
      userEmail,
    });


  
    const updatedCommentsCount = currentCommentsCount + 1;


    await update(postRef, {
      commentsCount: updatedCommentsCount, 
    });

    console.log("Updated comments count: " + updatedCommentsCount);
    console.log('✅ Comment saved and comments count updated in Firebase DB');
  } catch (error) {
    console.error('❌ Failed to create comment:', error);
  }
}



