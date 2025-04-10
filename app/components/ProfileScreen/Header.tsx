import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { FIREBASE_AUTH } from '@/firebase/FirebaseConfig';
import { Ionicons } from '@expo/vector-icons';

type HeaderProps = {
  posts: any[];  
};

export default function Header({ posts }: HeaderProps) {
  const user = FIREBASE_AUTH.currentUser;
  const domain = user?.email?.split('@')[0] || 'No domain';  
  return (
    <View style={styles.header}>
      <Ionicons name='person-circle' size={150} color='black' />
      <Text style={styles.username}>{`@${domain}`|| 'No user'}</Text>
      <Text style={styles.email}>{user?.email || 'No user'}</Text>

      <Text style={styles.postCount}>Posts: {posts.length}</Text> 

    </View>
  );
}

const styles = StyleSheet.create({
  header: {

    gap: 8,
    justifyContent:'center',
    alignItems:'center',
  
  },
  email: {
    fontSize: 20,
    fontWeight: '600',
    color: 'gray',
  },
  postCount: {
    fontFamily:'Lexend-Regular',
    fontSize:28
  },
  username:{
    fontSize: 40,
    fontWeight: 'bold',
  },

});
