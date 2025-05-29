import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native'; // Added this import
import HapticTab from '../../components/HapticTab';
import COLOR from '../../constants/color';

// Fixed image paths
import homeIcon from '../../../assets/images/home.png';
import laporanIcon from '../../../assets/images/laporan.png';
import chatIcon from '../../../assets/images/chat.png';
import profileIcon from '../../../assets/images/profile.png';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLOR.YELLOW,
        tabBarInactiveTintColor: COLOR.GRAY, // Added this
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: COLOR.PRIMARY,
          height: 80, // Added height
          paddingTop: 10, // Added padding
        },
        tabBarLabelStyle: { // Added label styling
          fontSize: 12,
          marginBottom: 4,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={homeIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? COLOR.YELLOW : COLOR.GRAY,
              }}
            />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tabs.Screen
        name="laporan"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={laporanIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? COLOR.YELLOW : COLOR.GRAY,
              }}
            />
          ),
          tabBarLabel: "Laporan",
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={chatIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? COLOR.YELLOW : COLOR.GRAY,
              }}
            />
          ),
          tabBarLabel: "Chat",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={profileIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: focused ? COLOR.YELLOW : COLOR.GRAY,
              }}
            />
          ),
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}