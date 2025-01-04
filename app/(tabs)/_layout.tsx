import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { SvgXml } from "react-native-svg";
import { Home,Workout,Chat, Profile,Add,ActiveHome,ActiveWorkout,ActiveChat,ActiveProfile} from "../../assets/icons/Index";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color }) => <SvgXml xml={focused ? ActiveHome : Home} height={28} />,
        }}
      />
      <Tabs.Screen
        name="workouts"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color }) => <SvgXml xml={focused ? ActiveWorkout : Workout} height={28} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color }) => <SvgXml xml={Add} height={28} />,
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color }) => <SvgXml xml={focused ? ActiveChat : Chat} height={28} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color }) => <SvgXml xml={focused ? ActiveProfile : Profile} height={28} />,
        }}
      />
    </Tabs>
  );
}