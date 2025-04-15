import { StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '@/firebase/FirebaseConfig';
import Colors from '@/constants/Colors';
const screenWidth = Dimensions.get('window').width;
type HeaderProps = {
  posts: any[];
};

export default function Header({ posts }: HeaderProps) {
  const user = FIREBASE_AUTH.currentUser;
  const domain = user?.email?.split('@')[0] || 'user';
  const email = user?.email || 'no@email.com';

  return (
    <View style={styles.header}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{domain.charAt(0).toUpperCase()}</Text>
      </View>

      <Text style={styles.username}>{`@${domain}`}</Text>
      <Text style={styles.email}>{email}</Text>
      <Text style={styles.postCount}>Posts: {posts.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    width: screenWidth * 0.9,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  avatarText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: Colors.primary100,
    fontFamily: 'Lexend-Regular',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  email: {
    fontSize: 15,
    fontWeight: '600',
    color: 'gray',
  },
  postCount: {
    fontFamily: 'Lexend-Regular',
    fontSize: 24,
    marginTop: 8,
  },
});
