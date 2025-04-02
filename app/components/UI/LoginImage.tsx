import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'

export default function LoginImage() {
  const { width } = Dimensions.get("window");

  return (
    <View style={styles.container}>

      <Image
        source={require('@/assets/images/login-illustration.png')} 
        style={[styles.image, { width: width * 0.5, height: width * 0.5 }]}
        resizeMode="contain"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  
  },

  image: {

    
  },

})
