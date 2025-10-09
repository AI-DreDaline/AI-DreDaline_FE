import { enableScreens } from 'react-native-screens';
enableScreens();

import { NavigationContainer } from '@react-navigation/native';
import BottomBar from './src/navigations/BottomBar';

export default function App() {
  return (
    <NavigationContainer>
      <BottomBar />
    </NavigationContainer>
  );
}
