import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/types';
import Myprofile from '../assets/images/Myprofile.png';
import RecommendRunScreen from './RecommendRunScreen';
import DrawTrackRunScreen from './DrawTrackRunScreen';
import { MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import { Route } from '@react-navigation/native';
import useTabBarVisibility from "../assets/useTabBarVisibility";

type MainTabParamList = {
  RecommendRun: {address?: string};
  DrawTrackRun: undefined;
};

const Tab = createMaterialTopTabNavigator<MainTabParamList>();

// 탭에 들어갈 화면들
function FirstTab() {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.tabText}>첫 번째 탭</Text>
    </View>
  );
}

function SecondTab() {
  return (
    <View style={styles.tabContent}>
      <Text style={styles.tabText}>두 번째 탭</Text>
    </View>
  );
}

type Props = NativeStackScreenProps<RootStackParamList, 'MainScreen'>;

const MainScreen: React.FC<Props> = ({ route }) => {
  const [address, setAddress] = useState(route.params?.address || '');
  useTabBarVisibility(true);
  
  return (
    <View style={styles.container}>
      <View style={styles.topview}/>
      <View style={styles.titleview}>
        <Text style={styles.title}>달려볼까요?</Text>
        <Image 
          source={Myprofile} 
          style={{ width: 32, height: 32, marginTop: 9 }} 
        />
      </View>

      {/* 탭 네비게이션 추가 */}
      <View style={{ flex: 1, backgroundColor: '#141414' }}>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: { backgroundColor: 'transparent', elevation: 0, shadowOpacity: 0 },
            tabBarIndicatorStyle: { backgroundColor: 'transparent' }, // 밑줄 제거
          }}
          tabBar={(props: MaterialTopTabBarProps) => {
            const { state, descriptors, navigation } = props;

              return (
                <View style={styles.tabContainer}>
                  {state.routes.map((route: Route<string>, index: number) => {
                    const { options } = descriptors[route.key];
                    const label =
                      options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;
                    const isFocused = state.index === index;

                    return (
                      <TouchableOpacity
                        key={route.key}
                        onPress={() => navigation.navigate(route.name)}
                        style={[
                          styles.tabButton,
                          isFocused ? styles.tabButtonActive : styles.tabButtonInactive,
                        ]}
                      >
                        <Text style={[styles.tabTextToggle, isFocused && styles.tabTextActive]}>
                          {typeof label === 'string' ? label : route.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              );
            }}
          >
          <Tab.Screen
            name="RecommendRun"
            options={{ title: '추천 경로로 달리기' }} 
            component={RecommendRunScreen}
            initialParams={{ address: address }}
          />
          <Tab.Screen name="DrawTrackRun" component={DrawTrackRunScreen} options={{ title: '나만의 경로 그리기' }} />
        </Tab.Navigator>
      </View>
    </View>
  );
}
export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  topview: {
    height: 49,
    backgroundColor: '#141414',
  },
  titleview: {
    height: 70,
    backgroundColor: '#141414',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 0,
    flexDirection: 'row',           // 🔹 가로 배치
        justifyContent: 'space-between',
  },
  title: {
    fontSize: 38,
    fontWeight: '600',
    color: '#ffffff',
  },
  tabContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
  },
  tabText: {
    fontSize: 18,
    color: '#fff',
  },
  /** 🔽 토글 탭 커스텀 스타일 */
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 11,
  },
  tabButton: {
    paddingVertical: 6.3,
    paddingHorizontal: 37,
    borderRadius: 20,
    marginHorizontal: 3, // 버튼 사이 간격
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#39FF14',
  },
  tabButtonInactive: {
    backgroundColor: '#141414',
  },
  tabTextToggle: {
    color: '#39FF14',
    fontWeight: '400',
    fontSize: 15,
  },
  tabTextActive: {
    color: '#141414',
    fontWeight: '900',
    fontSize: 16,
  },
});

