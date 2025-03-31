
  import { Tabs } from 'expo-router';
  import { Ionicons } from '@expo/vector-icons';

  export default function TabLayout() {
    return (
      <Tabs       screenOptions={{
        tabBarShowLabel: false,
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'index',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={30} />
            ),
          }}
        />
        <Tabs.Screen  
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person-outline" color={color} size={30} />
            ),
          }}
        />
        
      </Tabs>
    );
  }
