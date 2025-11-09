import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LoingStackParamList } from '../navigations/types';
import { useNavigation } from '@react-navigation/native';
import PagerView from 'react-native-pager-view';

import GuideLeftScreen from '../screens/GuideLeftScreen';
import GuideMainScreen from '../screens/GuideMainScreen';
import GuideRightScreen from '../screens/GuideRightScreen';

type GuideTabParamList = {
  GuideLeft: undefined;
  GuideMain: undefined;
  GuideRight: undefined;
};

const Tab = createMaterialTopTabNavigator<GuideTabParamList>();

type Props = NativeStackScreenProps<LoingStackParamList, 'Guide'>;

const GuideScreen: React.FC<Props> = () => {
    const navigation = useNavigation<any>(); // Tab 네비게이션 접근용
    
    const pagerRef = useRef<PagerView>(null);
    const [currentPage, setCurrentPage] = useState(0); // 처음은 Main
    

    const goToPage = (index: number) => {
        pagerRef.current?.setPage(index);
        setCurrentPage(index);
    };

    return(
        <View style={styles.container}>
            <PagerView
                style={{ flex: 1 }}
                initialPage={1}
                ref={pagerRef}
                onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
            >
                <View key={0}>
                    <GuideLeftScreen />
                </View>
                <View key={1}>
                    <GuideMainScreen />
                </View>
                <View key={2}>
                    <GuideRightScreen />
                </View>
            </PagerView>

            {/* 하단 고정 탭 */}
            <View style={styles.tabBar}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <View style={styles.button_1}>
                            <Text 
                                style={[
                                    styles.buttontext_1,
                                    // 조건부 스타일 적용
                                ]}
                            >회원가입</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Login')}
                    >
                        <View style={styles.button_2}>
                            <Text 
                                style={[
                                    styles.buttontext_2,
                                    // 조건부 스타일 적용
                                ]}
                            >로그인</Text>
                        </View>
                    </TouchableOpacity> 

                </View>
                <View style={styles.tabview}>
                    <TouchableOpacity onPress={() => goToPage(0)} style={styles.tab}>
                        <View
                        style={[
                            styles.circle,
                            currentPage === 0 ? styles.circleFilled : styles.circleEmpty,
                        ]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goToPage(1)} style={styles.tab}>
                        <View
                        style={[
                            styles.circle,
                            currentPage === 1 ? styles.circleFilled : styles.circleEmpty,
                        ]}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goToPage(2)} style={styles.tab}>
                        <View
                        style={[
                            styles.circle,
                            currentPage === 2 ? styles.circleFilled : styles.circleEmpty,
                        ]}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
export default GuideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  tabBar: {
        width: '100%',
        height: 193,
        backgroundColor:'#1B1B1B',
        alignContent: 'center',
    },
    buttonContainer: {
        width: '100%',
    },
    button_1: {
        width: 352,
        height: 52,
        backgroundColor: '#39FF14',
        borderRadius: 8,
        marginTop: 13,
        marginHorizontal:22,
    },
    buttontext_1: {
        fontSize: 19,
        color: '#000000',
        fontWeight: '800',
        paddingTop: 15,
        textAlign: 'center',
    },
    button_2: {
        width: 355,
        height: 52,
        borderRadius: 8,
        marginTop: 13,
        marginHorizontal:20,
    },
    buttontext_2: {
        fontSize: 19,
        color: '#9095A0',
        fontWeight: '600',
        paddingTop: 15,
        textAlign: 'center',
    },
    tabview: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
        marginTop: 12,
    },
    tab: {
        justifyContent: 'center',
    },
    circle: {
        width: 13,
        height: 13,
        borderRadius: 8, // 원 모양
    },
    circleFilled: {
        backgroundColor: '#39FF14', // 선택 시 채워진 색
    },
    circleEmpty: {
        borderWidth: 1,
        borderColor: '#39FF14', // 선택 안 됐을 때 테두리만
        backgroundColor: 'transparent',
    },
});