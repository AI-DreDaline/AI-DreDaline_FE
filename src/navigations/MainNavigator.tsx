import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 스크린들
import RecommendRunScreen from '../screens/MainScreen';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="RR">
      <Stack.Screen name="RR" component={RecommendRunScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
