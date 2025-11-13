import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text } from 'react-native';
import {WithLocalSvg} from 'react-native-svg/css';

import MainNavigator from './MainNavigator';
import HomeNavigator from './HomeNavigator';
import MyRecordNavigator from './MyRecord';

const homeIcon = require('../assets/images/home.svg');
const homeActiveIcon = require('../assets/images/home_active.svg');
import mainIcon from '../assets/images/main.png';
const recordIcon = require('../assets/images/myrecord.svg');
const recordActiveIcon = require('../assets/images/myrecord_active.svg');

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

          case 'HomeTab':
            return (
              <WithLocalSvg
                asset={focused ? homeActiveIcon : homeIcon}
                width={28}
                height={28}
                style={{ marginTop: 43 }}
              />
            );

          case 'RecordTab':
            return (
              <WithLocalSvg
                asset={focused ? recordActiveIcon : recordIcon}
                width={28}
                height={28}
                style={{ marginTop: 43 }}
              />
            );
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
