import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 스크린들
import LogoScreen from '../screens/LogoScreen.tsx';
import GuideScreen from '../screens/GuideScreen.tsx';
import LoginScreen from '../screens/LoginScreen.tsx'
import { LoingStackParamList } from './types.ts';

const Stack = createNativeStackNavigator<LoingStackParamList>();

export default function LoginNavigator() {
  return (
    <Stack.Navigator initialRouteName="Logo">
      <Stack.Screen name="Logo" component={LogoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Guide" component={GuideScreen} options={{headerShown: false}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}
