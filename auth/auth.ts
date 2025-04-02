import axios, { AxiosResponse } from 'axios';


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


export async function createUser(email: string, password: string): Promise<FirebaseSignupResponse> {
  return await authenticate('signUp', email, password);
}


export async function login(email: string, password: string): Promise<FirebaseSignupResponse> {
  return await authenticate('signInWithPassword', email, password);
}
