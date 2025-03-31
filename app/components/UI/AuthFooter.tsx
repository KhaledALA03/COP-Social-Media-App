import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import Colors from '../../../constants/Colors'
import { Link } from 'expo-router';


export default function AuthFooter(){
  return (
    <View style={styles.footer}>
  <Link asChild href={"/signup"}>
        <Pressable
    
          style={({ pressed }) => (pressed ? styles.pressed : null)}
        >
          <Text style={styles.signup1}>
            Don't have an account?{" "}
            <Text style={styles.signupText}>Signup</Text>
          </Text>
        </Pressable>
  </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  signupText: {
    textDecorationLine: "underline",
    fontFamily: "Lexend-Regular",
    color: Colors.primary100,
    fontSize: 17,
  },
  signup1: {
    fontSize: 17,
    fontFamily: "Lexend-Regular",

  },
  footer: {
    position: "absolute",
    bottom: 30,
  },
  pressed: {
    opacity: 0.75,
  },
});
