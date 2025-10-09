// src/navigators/MyRecordNavigator.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyRecordScreen from '../screens/RecordScreen.tsx';

export type MyRecordStackParamList = {
  MyRecord: undefined;
  RecordDetail: { id: string }; // 예: 특정 기록의 상세 보기
};

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
    </Stack.Navigator>
  );
}
