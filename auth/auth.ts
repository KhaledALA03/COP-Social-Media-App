  import axios, { AxiosResponse } from 'axios';
  import { ref, set } from 'firebase/database';
  import { FIREBASE_DB,FIREBASE_AUTH } from '@/firebase/FirebaseConfig';
  import { createUserWithEmailAndPassword } from 'firebase/auth';

  interface FirebaseSignupResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
  }


  const API_KEY: string = 'AIzaSyDzpc2CcAIgwpjlgFdmFGJjT0kMenJbBjE';





  async function authenticate(
    mode: string,
    email: string,
    password: string
  ): Promise<FirebaseSignupResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;


    try {
      const response: AxiosResponse<FirebaseSignupResponse> = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });
    console.log(response.data)
      return response.data;
    } catch (error: any) {
      console.error('Firebase Auth Error:', error.response?.data || error.message);
      throw error;
    }
  }


  // export async function createUser(email: string, password: string): Promise<FirebaseSignupResponse> {
  //   return await authenticate('signUp', email, password);
  // }

  export async function createUser(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
    const { uid, email: userEmail } = userCredential.user;
  
    await set(ref(FIREBASE_DB, `users/${uid}`), {
      uid,
      email: userEmail,
    });
  
    return userCredential.user;
  }



  export async function testWriteToFirebase() {
    try {
      const testRef = ref(FIREBASE_DB, 'testObject');
      await set(testRef, {
        message: '🚀 Firebase write test successful!',
        timestamp: new Date().toISOString(),
      });
      console.log('✅ Test write successful');
    } catch (error) {
      console.error('❌ Test write failed:', error);
    }
  }
  
  export async function login(email: string, password: string): Promise<FirebaseSignupResponse> {
    return await authenticate('signInWithPassword', email, password);
  }
