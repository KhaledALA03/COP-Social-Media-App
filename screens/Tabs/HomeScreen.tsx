import { View, Text, StyleSheet, FlatList } from 'react-native';
import Colors from '@/constants/Colors';
import Feed from '@/app/components/HomeScreen/Feed';
export default function HomeScreen() {
  return (
    <View style={styles.container}>
  
        <Feed/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',     
    backgroundColor: '#F5F5F5',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});
