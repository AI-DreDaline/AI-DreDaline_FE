import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginNavigator from './src/navigations/LoginNavigator.tsx';
import { enableScreens } from 'react-native-screens';

enableScreens(); // 앱 시작 시 가장 먼저 호출

export default function App() {
  return (
    <NavigationContainer>
      <LoginNavigator />
    </NavigationContainer>
  );
}
