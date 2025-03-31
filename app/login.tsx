import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginScreen from '@/screens/Auth/LoginScreen'
import DissmissKeyboard from './components/utils/DismissKeyboard'
export default function login() {
  return (
  <DissmissKeyboard>
    <LoginScreen/>
  </DissmissKeyboard>
  )
}

const styles = StyleSheet.create({})