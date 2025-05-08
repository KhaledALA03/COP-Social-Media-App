
import { Link } from 'expo-router';
import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';
import { FIREBASE_AUTH } from '@/firebase/FirebaseConfig';
import ProfileScreen from '@/screens/Tabs/ProfileScreen';

export default function Profile() {
  return (
    <ProfileScreen/>
  );
}
