import { enableScreens } from 'react-native-screens';
enableScreens();
import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
//import BottomBar from './src/navigations/BottomBar';
import LoginNavigator from './src/navigations/LoginNavigator';
import MainNavigator from "./src/navigations/MainNavigator";
import BottomBar from './src/navigations/BottomBar';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    console.log('로그아웃됨');
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <BottomBar onLogout={handleLogout} />
      ) : (
        <LoginNavigator onLogIn={handleLogin} />
      )}
    </NavigationContainer>
  );
}
