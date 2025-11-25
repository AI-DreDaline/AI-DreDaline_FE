import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Modal, Image, ScrollView } from 'react-native';
import PagerView from 'react-native-pager-view';
import useTabBarVisibility from "../assets/useTabBarVisibility";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/types';
import { useNavigateCtx } from './NavigateContext';

import MainNavigate from './MainNavigateScreen';
import LeftNavigate from './LeftNavigateScreen';
import RightNavigate from './RightNavigateScreen';

import Modal_long from '../components/Modal_long'
import { toString } from '@maptiler/sdk';

type Props = NativeStackScreenProps<RootStackParamList, 'Navigate'>;

const NavigateScreen: React.FC<Props> = ({ navigation }) => {
    useTabBarVisibility(false);

    const selectedDate = new Date().toISOString().split('T')[0];

    const pagerRef = useRef<PagerView>(null);
    const [currentPage, setCurrentPage] = useState(1); // 처음은 Main

    const [buttonText, setButtonText] = useState('계속 달리기');
    const timerRef = useRef<number | null>(null);
    const [timeIntervals, setTimeIntervals] = useState<[number, number | null][]>([]);

    const [isPressed, setIsPressed] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handlePressIn = () => {
        stopTimer();
        // 3초 타이머 시작
        timerRef.current = setTimeout(() => {
            setModalVisible(true);
            navigation.navigate('MainScreen', {
                address: '',
                mode: '',
                screen: 'RecommendRun',
            });
        }, 2000);
    };

    const handlePressOut = () => {
        // 손 뗐을 때 타이머 취소
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    const { startTimer } = useNavigateCtx();
    const { stopTimer } = useNavigateCtx();

    const handlePress = () => {
        const now = Date.now();

        if (!isPressed) {
            setButtonText('일시 정지');
            setIsPressed(true);
            startTimer();
        } else {
            setButtonText('계속 달리기');
            setIsPressed(false);
            stopTimer();
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
                <View key={0}>
                    <LeftNavigate />
                </View>
                <View key={1}>
                    <MainNavigate />
                </View>
                <View key={2}>
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

            <Modal
                transparent
                animationType="fade"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.overlay}>
                    <Modal_long
                        selectedDate={selectedDate}
                        closeModal={() => setModalVisible(false)} // ✅ 닫기 기능 전달
                    />
                </View>
            
            </Modal>

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
    overlay: {
        flex: 1,
        justifyContent: 'flex-end', // 화면 하단에 붙게
        backgroundColor: 'rgba(0,0,0,0.4)', // 살짝 어둡게
    },
    modalContainer: {
        height: 768,
        backgroundColor: '#1B1B1B',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingHorizontal: 0,
        paddingTop: 15,
    },
    scrollContent: {
        paddingBottom: 10, // 닫기 버튼과 겹치지 않게 여유
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
    },
    arrow: {
        color: '#fff',
        fontSize: 24,
    },
    titleview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -24,
    },
    title: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        marginLeft: 6,
    },
    close: {
        width: 25,
        height: 25,
    },
    content: {
        alignItems: 'center',
        flex: 1,
    },
    mapview: {
        flexDirection: 'row',
        height: 200,
        width: '100%',
        paddingLeft: 25,
        paddingTop: 25,
    },
    listboxview: {
       height: 150,
       width: '100%',
       marginLeft: 13,
       paddingTop: 14,
    },
    listview: {
        flexDirection: 'row',
        marginBottom: 17,
        alignItems: 'center',
    },
    thunder: {
        width: 16,
        height: 16,
    },
    list: {
        fontSize: 17,
        fontWeight: '600',
        color: '#ffffff',
        marginLeft: 5,
    },
    listkey: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        paddingLeft: 15,
    },
    kmboxview: {
        width: "100%",
    },
    kmlisttitle: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '700',
        marginTop: 15,
        marginLeft: 24,
    },
    kmlisttop: {
        marginTop: 20,
        marginLeft: 70,
        flexDirection: 'row',
        marginBottom: 2,
    },
    kmlisttoptext: {
        color: '#98989f',
        fontSize: 11,
        fontWeight: '400',
        marginRight: 40,
    },
    kmlist: {
        flexDirection: 'row',
        marginTop: 12.3,
        marginLeft: 30,
        alignContent: 'center',
    },
    kmlap: {
        color: '#98989f',
        fontSize: 14,
        marginLeft: 0,
        width: 18,
        textAlign: 'left',
    },
    kmtime: {
        color: '#ffe621',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 22,
        width: 55,
        textAlign: 'left',
    },
    kmpace: {
        color: '#39e9e6',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 11,
        width: 90,
        textAlign: 'left',
    },
    kmheartRate: {
        color: '#ff3819',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 3,
        width: 80,
        textAlign: 'left',
    },
    kmpower: {
        color: '#a6ff00',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 12,
        width: 60,
        textAlign: 'left',
    },
    kmseparator: {
        height: 0.2,              // 선 높이
        backgroundColor: '#98989f',  // 선 색
        marginHorizontal: 30,     // 좌우 여백
        marginTop: 10,
    },
    heartrateboxview: {
        width: '100%',
        height: 330,
        paddingTop: 2,
    },
    heartratetitlebox: {
        height: '100%',
        width: '100%',
        paddingLeft: 24,
        paddingRight: 24,
    },
    heartratetitle: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '400',
        marginTop: 24,
    },
    heartratebpm: {
        color: '#ff3819',
        fontSize: 25,
        fontWeight: '500',
        paddingTop: 5,
    },
    heartrateseparator: {
        height: 0.2,              // 선 높이
        backgroundColor: '#98989f',
        marginTop: 20,
    },
    heartratetitle_2: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '400',
        marginTop: 10,
    },
    heartrateavg: {
        color: '#ff3819',
        fontSize: 12,
        fontWeight: '400',
        paddingTop: 1,
    },
    heartrateseparator_2: {
        height: 0.3,              // 선 높이
        backgroundColor: '#98989f',
        marginTop: 10,
        marginBottom: 7,
    },
    heartratelist: {
        width: '100%',
        flexDirection: 'row',
        marginTop: 6.2,
        alignContent: 'center',
        //backgroundColor: 'green',
    },
    heartratezone: {
        color: 'rgba(57, 233, 230, 1)',
        fontSize: 15,
        fontWeight: '500',
        width: 50,
        textAlign: 'left',
    },
    zoneBar: {
        height: 8,          // 바의 두께
        borderRadius: 5,     // 모서리 둥글게
        marginLeft: 5, // Zone과 시간 사이 간격
        marginTop: 5.3,
    },
    heartratetime: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: '500',
        marginLeft: 8,
        width: 45,
        textAlign: 'left',
    },
    heartratetotalbpmview: {
        height: '100%',
        flex: 1,
        marginRight: 0,
    },
    heartratetotalbpm: {
        color: '#98989f',
        fontSize: 15,
        textAlign: 'right',
    },
    heartrateseparator_3: {
        height: 0.4,              // 선 높이
        backgroundColor: '#98989f',
        marginTop: 6,
    },
})