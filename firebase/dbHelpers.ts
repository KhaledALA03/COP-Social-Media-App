import { ref, set, push,update,get, child, increment,remove} from 'firebase/database';
import { FIREBASE_APP, FIREBASE_DB, FIREBASE_AUTH } from './FirebaseConfig';


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
      likedBy:{      },
      createdAt: new Date().toISOString(),
    });

    console.log('Post saved to Firebase DB');
  } catch (error) {
    console.error('Failed to create post:', error);
  }
}


export async function saveUserDetails(uid: string, email: string) {
  try {
    await set(ref(FIREBASE_DB, `users/${uid}`), {
      uid,
      email,
    });
    console.log('User details saved to DB');
  } catch (error) {
    console.error('Failed to save user details:', error);
    throw error;
  }
}

export async function toggleLike({
  user,
  postId,
}: {
  user: string;
  postId: string;
}) {
  try {
    const likeRef = ref(FIREBASE_DB, `posts/${postId}/likedBy/${user}`);
    const postRef = ref(FIREBASE_DB, `posts/${postId}`);
    const snapshot = await get(likeRef);

    const updates: any = {};

    if (snapshot.exists()) {
      updates[`likedBy/${user}`] = null;
      updates[`likes`] = increment(-1);
      console.log('Like removed');
    } else {

      updates[`likedBy/${user}`] = true;
      updates[`likes`] = increment(1);
      console.log('Like added');
    }

    await update(postRef, updates);
  } catch (error) {
    console.error('Failed to toggle like:', error);
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


    console.log('Comment saved and comments count updated in Firebase DB');
  } catch (error) {
    console.error('Failed to create comment:', error);
  }
}



export async function deletePost(postId: string) {
  try {
    await remove(ref(FIREBASE_DB, `posts/${postId}`));
    console.log('Post deleted from Firebase DB');
  } catch (error) {
    console.error('Failed to delete post:', error);
  }
}