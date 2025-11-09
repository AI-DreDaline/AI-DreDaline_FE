import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 스크린들
import LogoScreen from '../screens/LogoScreen.tsx';
import GuideScreen from '../screens/GuideScreen.tsx';
import LoginScreen from '../screens/LoginScreen.tsx';
import PhoneLoginScreen from '../screens/PhoneLoginScreen.tsx';
import PhoneVerfyScreen from '../screens/PhoneVerfyScreen.tsx';
import ProfileScreen from '../screens/profileScreen.tsx';
import ConnectHealthScreen from '../screens/ConnectHealthScreen.tsx';
import ConnectLocationScreen from '../screens/ConnectLocationScreen.tsx';
import ConnectFitenssScreen from '../screens/ConnectFitenssScreen.tsx';
import AlamScreen from '../screens/AlamScreen.tsx';
import BottomBar from './BottomBar.tsx';
import { LoingStackParamList } from './types.ts';

const Stack = createNativeStackNavigator<LoingStackParamList>();

export default function LoginNavigator() {
  return (
    <Stack.Navigator initialRouteName="Logo" screenOptions={{ headerShown: false, }}>
      <Stack.Screen name="Logo" component={LogoScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Guide" component={GuideScreen} options={{animation: 'none'}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="PhoneLogin" component={PhoneLoginScreen} options={{headerShown: false}}/>
      <Stack.Screen name="PhoneVerfy" component={PhoneVerfyScreen} options={{headerShown: false}} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{animation: 'none'}} />
      <Stack.Screen name="ConnectHealth" component={ConnectHealthScreen} options={{animation: 'none'}} />
      <Stack.Screen name="ConnectLocation" component={ConnectLocationScreen} options={{animation: 'none'}} />
      <Stack.Screen name="ConnectFitenss" component={ConnectFitenssScreen} options={{animation: 'none'}} />
      <Stack.Screen name="Alam" component={AlamScreen} options={{headerShown: false}} />
      <Stack.Screen name="BottomBar" component={BottomBar} options={{animation: 'none'}} />
    </Stack.Navigator>
  );
}
