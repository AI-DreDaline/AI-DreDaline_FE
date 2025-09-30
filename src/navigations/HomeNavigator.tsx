import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 스크린들
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
