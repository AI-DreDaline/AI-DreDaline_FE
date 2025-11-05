// src/navigations/MainNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import NavigateScreen from '../screens/NavigateScreen';
import RecommendMapScreen from '../screens/RecommendMapScreen';
//import RecommendReadyMapScreen from '../screens/RecommendReadyMapScreen';
import DrawTrackMapScreen from '../screens/DrawTrackMapScreen';
//import DrawTrackReadyMapScreen from '../screens/DrawTrackReadyMapScreen';
import ReadyMapScreen from '../screens/ReadyMapScreen'
import LoadingScreen from '../screens/LoadingScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="MainScreen" 
        component={MainScreen} 
      />
      <Stack.Screen 
        name="Navigate" 
        component={NavigateScreen} 
      />
      <Stack.Screen 
        name="RecommendMap" 
        component={RecommendMapScreen}
      />
      {/*
      <Stack.Screen 
        name="RecommendReadyMap" 
        component={RecommendReadyMapScreen}
      />
      
      <Stack.Screen 
        name="DrawTrackReadyMap" 
        component={DrawTrackReadyMapScreen}
      />
      */}
      <Stack.Screen 
        name="DrawTrackMap" 
        component={DrawTrackMapScreen}
      />
      <Stack.Screen 
        name="ReadyMap" 
        component={ReadyMapScreen}
      />
      <Stack.Screen 
        name="Loading"
        component={LoadingScreen} 
      />
    </Stack.Navigator>
  );
}
