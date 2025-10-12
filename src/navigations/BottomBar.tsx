import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Text, View } from 'react-native';

import MainNavigator from './MainNavigator';
import HomeNavigator from './HomeNavigator';
import MyRecordNavigator from './MyRecord';

// 🔽 아이콘 이미지들
import homeIcon from '../assets/images/home.png';
import homeActiveIcon from '../assets/images/home_active.png';
import mainIcon from '../assets/images/main.png';
import recordIcon from '../assets/images/myrecord.png';
import recordActiveIcon from '../assets/images/myrecord_active.png';

const Tab = createBottomTabNavigator();

interface BottomBarProps {
  visible?: boolean;
}

const BottomBar: React.FC<BottomBarProps> = ({ visible = true }) => {
  if (!visible) return null;

  return (
    <Tab.Navigator
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
        iconSource = mainIcon;
        iconStyle = {
            width: 95,
            height: 95,
            marginTop: 38,
        };
        break;
        case 'HomeTab':
            iconSource = focused ? homeActiveIcon : homeIcon;
            iconStyle = { width: 28, height: 28, marginTop: 43, tintColor: focused ? '#39FF14' : '#BCC1CA' };
            break;
        case 'RecordTab':
            iconSource = focused ? recordActiveIcon : recordIcon;
            iconStyle = { width: 28, height: 28, marginTop: 43, tintColor: focused ? '#39FF14' : '#BCC1CA' };
            break;
    }

            return <Image source={iconSource} style={iconStyle} resizeMode="contain" />;
        },

      })}
    >
      <Tab.Screen name="HomeTab" component={HomeNavigator} />
      <Tab.Screen name="MainTab" component={MainNavigator} />
      <Tab.Screen name="RecordTab" component={MyRecordNavigator} />
    </Tab.Navigator>
  );
};
export default BottomBar;
