import { Tabs } from 'expo-router';
import React from 'react';
import Entypo from '@expo/vector-icons/Entypo';
<<<<<<< HEAD

=======
>>>>>>> 8fe12426210e3b63720c5d47598736533970af0e
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#fffafa',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#000000',
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
<<<<<<< HEAD
=======
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="heart-outlined" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
>>>>>>> 8fe12426210e3b63720c5d47598736533970af0e
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, focused }) => (
            <Entypo name="heart-outlined" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="CustomizeProfile"
        options={{
          title: 'Customize Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
