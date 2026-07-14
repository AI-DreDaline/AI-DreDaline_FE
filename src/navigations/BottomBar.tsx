import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text } from 'react-native';

import MainNavigator from './MainNavigator';
import HomeNavigator from './HomeNavigator';
import MyRecordNavigator from './MyRecord';

import HomeIconSvg from '../assets/images/home.svg';
import HomeActiveIconSvg from '../assets/images/home_active.svg';
import mainIcon from '../assets/images/main.png';
import RecordIconSvg from '../assets/images/myrecord.svg';
import RecordActiveIconSvg from '../assets/images/myrecord_active.svg';

const Tab = createBottomTabNavigator();

interface BottomBarProps {
  visible?: boolean;
  onLogout: () => void;
}

const BottomBar: React.FC<BottomBarProps> = ({ visible = true, onLogout }) => {
  if (!visible) return null;

  return (
    <Tab.Navigator
      initialRouteName="MainTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        lazy: true,
        freezeOnBlur: true,
        tabBarStyle: {
          backgroundColor: '#1B1B1B',
          height: 102,
          borderTopWidth: 0,
        },
        tabBarShowLabel: true,
        tabBarLabel: ({ focused }) => {
          let label = '';
          if (route.name === 'MainTab') label = '';
          else if (route.name === 'HomeTab') label = '홈';
          else if (route.name === 'RecordTab') label = '나의 기록';

          return (
            <Text
              style={{
                color: focused ? '#39FF14' : '#BCC1CA',
                fontSize: 10,
                marginTop: route.name === 'MainTab' ? 0 : 27,
                fontWeight: focused ? '700' : '400',
              }}
            >
              {label}
            </Text>
          );
        },
        tabBarIcon: ({ focused }) => {
          let iconSource;
          let iconStyle;

        switch (route.name) {
          case 'MainTab':
            return (
              <Image
                source={mainIcon}
                style={{ width: 95, height: 95, marginTop: 38 }}
                resizeMode="contain"
              />
            );

          case 'HomeTab': {
            const HomeTabIcon = focused ? HomeActiveIconSvg : HomeIconSvg;
            return (
              <HomeTabIcon width={28} height={28} style={{ marginTop: 43 }} />
            );
          }

          case 'RecordTab': {
            const RecordTabIcon = focused ? RecordActiveIconSvg : RecordIconSvg;
            return (
              <RecordTabIcon width={28} height={28} style={{ marginTop: 43 }} />
            );
          }
        }
      },

      })}
    >
      <Tab.Screen name="HomeTab" component={HomeNavigator} />
      <Tab.Screen name="MainTab">
        {() => <MainNavigator onLogout={onLogout} />}
      </Tab.Screen>
      <Tab.Screen name="RecordTab" component={MyRecordNavigator} />
    </Tab.Navigator>
  );
};
export default BottomBar;
