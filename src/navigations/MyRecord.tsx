// src/navigators/MyRecordNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { MyRecordStackParamList } from '../navigations/types';

import ReadyMapScreen from '../screens/ReadyMapScreen.tsx';
import MyRecordScreen from '../screens/RecordScreen.tsx';

const Stack = createNativeStackNavigator<MyRecordStackParamList>();

export default function MyRecordNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="MyRecord"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyRecord" component={MyRecordScreen} />
      <Stack.Screen name="ReadyMap" component={ReadyMapScreen} />
    </Stack.Navigator>
  );
}
