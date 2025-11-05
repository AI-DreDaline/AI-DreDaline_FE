import { enableScreens } from 'react-native-screens';
enableScreens();

import { NavigationContainer } from '@react-navigation/native';
//import BottomBar from './src/navigations/BottomBar';
import LoginNavigator from './src/navigations/LoginNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <LoginNavigator />
    </NavigationContainer>
  );
}
