import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import Colors from '@/constants/Colors';
const { width } = Dimensions.get('window');

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
      
        tabBarStyle: {
          height: 90,
          borderRadius: 40,
          backgroundColor: 'white',
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.05,
          shadowOffset: { width: 0, height: 5 },
          shadowRadius: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        
        options={{
          headerTitle: 'LinkUp',
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTitleStyle: {
            fontFamily: 'DancingScript-Regular',
            fontSize: 30,
            color: Colors.primary300,
            alignItems:'flex-start',
            height: 50,
          },
          headerShadowVisible: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home-outline" size={24} color={color} style={styles.icon} />
          ),
        }}
      
      />
      <Tabs.Screen
        name="chat"
        
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-outline" size={24} color={color} style={styles.icon}/>
          ),
        }}
        
      />
          <Tabs.Screen
        name="post"
        options={{
          headerShown: false,
          tabBarButton: (props) => (
            <CustomCenterButton />
          ),
        }}
      />
      <Tabs.Screen
        name="likes"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="heart-outline" size={24} color={color} style={styles.icon}/>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} style={styles.icon}/>
          ),
        }}
      />
    </Tabs>
  );
}

function CustomCenterButton() {
  return (
    <TouchableOpacity
      style={styles.centerButtonWrapper}
  
      activeOpacity={0.8}
    >
      <View style={styles.centerButton}>
        <Ionicons name="add" size={24} color="#fff"  style={{    transform: [{ rotate: '-45deg' }] }}/>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  centerButtonWrapper: {
    top: -10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    width: 64,
    height: 64,
    borderRadius: 23,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    transform: [{ rotate: '45deg' }] 
    },
  icon:{
    paddingTop: 5,
    
  }
});
