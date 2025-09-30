import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 스크린들
import LogoScreen from '../screens/LogoScreen.tsx';

const Stack = createNativeStackNavigator();

export default function LoginNavigator() {
  return (
    <Stack.Navigator initialRouteName="Logo">
      <Stack.Screen name="Logo" component={LogoScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
