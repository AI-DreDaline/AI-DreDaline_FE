import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './src/navigations/MainNavigator.tsx';
import { enableScreens } from 'react-native-screens';

enableScreens(); // 앱 시작 시 가장 먼저 호출

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}
