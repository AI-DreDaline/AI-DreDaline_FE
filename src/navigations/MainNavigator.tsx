// src/navigations/MainNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import RecommendMapScreen from '../screens/RecommendMapScreen';
import DrawTrackMapScreen from '../screens/DrawTrackMapScreen';
import LoadingScreen from '../screens/LoadingScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* 탭에서 보이는 화면 */}
      <Stack.Screen name="MainScreen" component={MainScreen} />
      {/* BottomBar 숨길 화면 */}
      <Stack.Screen 
        name="RecommendMap" 
        component={RecommendMapScreen}
      />
      <Stack.Screen 
        name="DrawTrackMap" 
        component={DrawTrackMapScreen}
      />
      <Stack.Screen name="Loading" component={LoadingScreen} />
    </Stack.Navigator>
  );
}
