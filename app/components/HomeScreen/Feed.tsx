import { StyleSheet, Text, View,} from 'react-native'
import React from 'react'
import PostCard from './PostCard'

export default function Feed() {
  return (
    <View style={styles.container}>
      <PostCard/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
    justifyContent:'flex-start',
    marginTop: 20,
  }
})