import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Modal, ScrollView, Image } from 'react-native';
import PagerView from 'react-native-pager-view';
import useTabBarVisibility from "../assets/useTabBarVisibility";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/types';

import map_ready from '../assets/images/map_ready.png';
import arrow from '../assets/images/arrow.png';
import run from '../assets/images/run.png';
import x from '../assets/images/x.png';
import round from '../assets/images/round.png';
import runway_img from '../assets/images/runway.png';

import thunder_white from '../assets/images/thunder_white.png';
import thunder_blue from '../assets/images/thunder_blue.png';
import thunder_yellow from '../assets/images/thunder_yellow.png';
import thunder_orange from '../assets/images/thunder_orange.png';

const { width } = Dimensions.get('window');

import MainNavigate from './MainNavigateScreen';
import LeftNavigate from './LeftNavigateScreen';
import RightNavigate from './RightNavigateScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'Navigate'>;

const NavigateScreen: React.FC<Props> = ({ navigation }) => {
    useTabBarVisibility(false);
    const pagerRef = useRef<PagerView>(null);
    const [currentPage, setCurrentPage] = useState(1); // 처음은 Main

    const [buttonText, setButtonText] = useState('계속 달리기');
    const timerRef = useRef<number | null>(null);
    const [isPressed, setIsPressed] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const today = "2025년 9월 25일";

    const handlePressIn = () => {
        // 3초 타이머 시작
        timerRef.current = setTimeout(() => {
            setModalVisible(true);
            /*navigation.navigate('MainScreen', {
                address: '서울시 강남구',
                mode: 'drawReady',
                screen: 'DrawTrackRun',
            });
            */
        }, 3000);
    };

    const handlePressOut = () => {
        // 손 뗐을 때 타이머 취소
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const handlePress = () => {
        // 클릭만 했을 때 텍스트 변경
        if (isPressed) {
            setButtonText('계속 달리기');
            setIsPressed(false);
        } else {
            setButtonText('일시 정지');
            setIsPressed(true);
        }
    };

    const goToPage = (index: number) => {
        pagerRef.current?.setPage(index);
        setCurrentPage(index);
    };

    return (
        <View style={{ flex: 1}}>
            <PagerView
                style={{ flex: 1 }}
                initialPage={1}
                ref={pagerRef}
                onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
            >
                <View key="0">
                    <LeftNavigate />
                </View>
                <View key="1">
                    <MainNavigate />
                </View>
                <View key="2">
                    <RightNavigate />
                </View>
            </PagerView>

            {/* 하단 고정 탭 */}
            <View style={styles.tabBar}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPressIn={handlePressIn}
                        onPressOut={handlePressOut}
                        onPress={handlePress}
                    >
                        <View style={styles.button}>
                            <Text 
                                style={[
                                    styles.buttontext,
                                    isPressed && { paddingLeft: 60 }, // 조건부 스타일 적용
                                ]}
                            >{buttonText}</Text>
                        </View>
                    </TouchableOpacity>

                    {/* ✅ 모달 부분 */}
                    <Modal
                        transparent
                        visible={modalVisible}
                        animationType="slide"
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalBox}>
                                <ScrollView contentContainerStyle={styles.scrollContainer}>

                                    <View style={styles.header}>`
                                        <View style={styles.titleview}>
                                            <Image
                                                source={run}
                                                style={{width: 35, height: 35}}
                                            />
                                            <Text style={styles.title}>경로 세부사항</Text>
                                        </View>
                                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                                            <Image
                                                source={x}
                                                style={styles.close}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <View>
                                            <Image
                                                source={map_ready}
                                                style={{}}
                                            />
                                            <Image
                                                source={round}
                                                style={{}}
                                            />
                                        </View>
                                        <View>
                                            
                                        </View>
                                    </View>


                                </ScrollView>
                            </View>
                        </View>
                    </Modal>

                    <Text style={styles.tabtitle}>러닝을 끝낼 경우 버튼을 3초 이상 눌러주세요.</Text>
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

export default NavigateScreen;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabBar: {
        width: '100%',
        height: 139,
        backgroundColor:'#1B1B1B',
        alignContent: 'center',
    },
    buttonContainer: {
        flexDirection: 'column', // 버튼과 텍스트를 세로 배치
        alignItems: 'center',    // 가로 중앙 정렬
    },
    button: {
        width: 186,
        height: 52,
        backgroundColor: '#39FF14',
        borderRadius: 8,
        marginTop: 13,
    },
    buttontext: {
        fontSize: 19,
        color: '#000000',
        fontWeight: '900',
        paddingTop: 15,
        paddingLeft: 50,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        //justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        width: '100%',
        height: 1020, // ✅ 고정 높이
        backgroundColor: '#1C1C1E',
        padding: 10,
        marginTop: 80,
    },
    scrollContainer: {
        paddingVertical: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 13,
        paddingLeft: 106,
    },
    titleview: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 6,
    },
    close: {
        width: 25,
        height: 25,

    },
    tabtitle: {
        color: '#39FF14',
        marginTop: 9,
        fontSize: 12,
        fontWeight: '500',
    },
    tabview: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
        marginTop: 8,
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