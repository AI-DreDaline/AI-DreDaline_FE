import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ReadyMapScreen from '../screens/ReadyMapScreen.tsx';
import { HomeStackParamList } from './types.ts';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false, // 상단 헤더 숨김
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="ReadyMap" component={ReadyMapScreen} />
    </Stack.Navigator>
  );
}
