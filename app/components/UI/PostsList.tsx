import { View, Text, FlatList, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Post } from '@/firebase/getPosts';
import Engagement from '../HomeScreen/Engagement';
import Colors from '@/constants/Colors';
import PostImage from '../HomeScreen/PostImage';
import Header from '../ProfileScreen/Header';
import PostCard from '../HomeScreen/PostCard';

type PostsListProps = {
  data: any[];
  refreshing: boolean;
  onRefresh: () => void;
  header:boolean;
};

const screenWidth = Dimensions.get('window').width;

export default function PostsList({
  data,
  refreshing,
  onRefresh,
  header,
}: PostsListProps) {

  return (
    <View style={styles.container}>
      {refreshing ? (
        <ActivityIndicator size="large" color={Colors.primary100} style={styles.loading} />
      ) : data.length === 0 ? (
        <Text style={styles.noPosts}>No posts found</Text>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => (item.id ? item.id.toString() : `no-id-${Math.random()}`)}
          ListHeaderComponent={header ? <Header posts={data} /> : null}
          renderItem={({ item }) => (
          
              
              <PostCard likes={item.likes} id={item.id}  userId={item.userId}  userEmail={item.email} title={item.title} imageUrl={item.photo}/>
            
          )}
          onRefresh={onRefresh}
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  postCardContainer: {
    width: screenWidth * 0.90,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  
  },
  title: {
    fontSize: 20,
  
    marginBottom: 8,
    color: '#333',
    fontFamily:'Lexend-Regular'
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    height: 300,
  },
  noPosts: {
    marginTop: 20,
    fontStyle: 'italic',
    color: 'gray',
  },
  loading: {
    marginTop: 30,
  },
});
