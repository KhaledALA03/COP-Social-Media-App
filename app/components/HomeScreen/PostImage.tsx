import { Image, View, ActivityIndicator, StyleSheet } from 'react-native';
import React, { useState } from 'react';

type PostImageProps = {
  imageUrl: string;
};

export default function PostImage({ imageUrl }: PostImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#888" />
        </View>
      )}
      <Image
        source={require('../../../assets/images/erin-vey-0tEuA6ByeoY-unsplash.jpg')}
        style={styles.image}
        resizeMode="cover"
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    zIndex: 1,
  },
  image: {
    height: '100%',
    width: '100%',
    borderTopLeftRadius: 23,
    borderTopRightRadius: 23,
  },
});
