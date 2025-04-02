
import { Link } from 'expo-router';
import { View, Text, Button } from 'react-native';
import { router } from 'expo-router';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

export default function ProfileScreen() {
  return (
    <View>
      <Text>This is your Profile!</Text>
      <Button onPress={()=> FIREBASE_AUTH.signOut()}  title='logout'></Button>
    </View>
  );
}
