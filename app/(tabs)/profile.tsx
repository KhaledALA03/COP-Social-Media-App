
import { Link } from 'expo-router';
import { View, Text } from 'react-native';
import { router } from 'expo-router';

export default function ProfileScreen() {
  return (
    <View>
      <Text>This is your Profile!</Text>
      <Link href={"/login"} replace/>
    </View>
  );
}
