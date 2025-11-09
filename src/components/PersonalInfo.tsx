import React, {useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { NavigationProp } from '@react-navigation/native';

import x from '../assets/images/x.png';
import person from '../assets/images/person.png';
import right_arrow from '../assets/images/right_arrow_2.png';
import info_1 from '../assets/images/info_1.png';
import info_2 from '../assets/images/info_2.png';
import info_3 from '../assets/images/info_3.png';
import info_4 from '../assets/images/info_4.png';
import info_5 from '../assets/images/info_5.png';
import NavigateScreen from '../screens/NavigateScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'PersonalInfo'>;

interface Personal_Info {
    closeModal: () => void;
    onLogout: () => void; 
}

export default function PersonalInfoScreen ({closeModal, onLogout}: Personal_Info) {
    const name = '홍길동';

    const LogoutAlert = () => {
        Alert.alert(
        "로그아웃", // 제목
        "지금 계정에서 로그아웃할까요?", // 메시지
        [
            { text: "취소", style: "cancel" },
            { 
                text: "확인",
                style: "destructive",
                onPress: () => {
                    console.log("로그아웃 버튼");
                    onLogout(); 
                }
            },
        ],
        { cancelable: true } // 바깥 터치로 닫을 수 있음 (iOS)
        );
    };

    const RemoveAlert = () => {
        Alert.alert(
        "계정 삭제", // 제목
        "정말 계정을 삭제하시겠습니까?", // 메시지
        [
            { text: "취소", style: "cancel" },
            { 
                text: "삭제",
                style: "destructive",
                onPress: () => {
                    console.log("로그아웃 버튼");
                    onLogout(); 
                }
            },
        ],
        { cancelable: true } // 바깥 터치로 닫을 수 있음 (iOS)
        );
    };

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>프로필</Text>
                <TouchableOpacity onPress={closeModal}>
                    <Image
                        source={x}
                        style={styles.close}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.topview}>
                <Image
                    source={person}
                    style={styles.personImage}
                />
                <Text style={styles.name}>{name}</Text>
            </View>

            <View style={{alignItems: 'center'}}>
                <View style={[styles.boxview_1, {paddingTop: 25}]}>
                    <View style={styles.box_1list}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image
                                source={info_1}
                                style={styles.Image}
                            />
                            <Text style={styles.box_text}>기본 정보</Text>
                        </View>
                        <Image
                            source={right_arrow}
                            style={{width: 29, height: 29}}
                        />
                    </View>
                    <View style={[styles.box_1list, {paddingTop: 25}]}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image
                                source={info_2}
                                style={styles.Image}
                            />
                            <Text style={styles.box_text}>신체 정보</Text>
                        </View>
                        <Image
                            source={right_arrow}
                            style={{width: 29, height: 29}}
                        />
                    </View>
                </View>

                <View style={{height: 41}}/>

                <View style={styles.boxview_2}>
                    <View style={[styles.box_1list, {paddingTop: 19}]}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image
                                source={info_3}
                                style={styles.Image}
                            />
                            <Text style={styles.box_text}>알림 설정</Text>
                        </View>
                        <Image
                            source={right_arrow}
                            style={{width: 29, height: 29}}
                        />
                    </View>
                </View>

                <View style={{height: 33}}/>

                <View style={[styles.boxview_3, {paddingTop: 19}]}>
                    <View style={styles.box_1list}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image
                                source={info_4}
                                style={styles.Image}
                            />
                            <Text style={styles.box_text}>기본 정보</Text>
                        </View>
                        <Image
                            source={right_arrow}
                            style={{width: 29, height: 29}}
                        />
                    </View>
                    <View style={[styles.box_1list, {paddingTop: 19}]}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image
                                source={info_3}
                                style={styles.Image}
                            />
                            <Text style={styles.box_text}>신체 정보</Text>
                        </View>
                        <Image
                            source={right_arrow}
                            style={{width: 29, height: 29}}
                        />
                    </View>
                    <View style={[styles.box_1list, {paddingTop: 19}]}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image
                                source={info_5}
                                style={styles.Image}
                            />
                            <Text style={styles.box_text}>신체 정보</Text>
                        </View>
                        <Image
                            source={right_arrow}
                            style={{width: 29, height: 29}}
                        />
                    </View>
                </View>
            </View>

            <View style={{marginLeft: 36,marginTop: 33}}>
                <TouchableOpacity
                    style={styles.button_1}
                    onPress={LogoutAlert}
                >
                    <Text style={styles.logouttext}>로그아웃</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button_2}
                    onPress={RemoveAlert}
                >
                    <Text style={styles.removetext}>계정 삭제</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
    
const styles = StyleSheet.create({
    container: {
        height: 802,
        backgroundColor: '#1B1B1B',
        paddingTop: 27,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: '#fff',
        fontSize: 21,
        fontWeight: '800',
        marginLeft: 170,
    },
    close: {
        width: 27,
        height: 27,
        marginLeft: 115,
    },
    topview: {
        marginTop: 27,
        alignItems: 'center',
    },
    personImage: {
        width: 70,
        height: 70,
    },
    name: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '500',
        paddingTop: 24,
        marginBottom: 27,
    },
    boxview_1: {
        width: 350,
        height: 136,
        borderRadius: 6,
        borderColor: '#DEE1E6',
        borderWidth: 1,
    },
    box_1list: {
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 15,
    },
    Image: {
        width: 28,
        height: 28,
    },
    box_text: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 17,
        fontWeight: '300',
    },
    boxview_2: {
        width: 350,
        height: 70,
        borderRadius: 6,
        borderColor: '#DEE1E6',
        borderWidth: 1,
    },
    boxview_3: {
        width: 350,
        height: 167,
        borderRadius: 6,
        borderColor: '#DEE1E6',
        borderWidth: 1,
    },
    button_1: {
        width: 60,
        height: 20,
    },
    button_2: {
        width: 60,
        height: 20,
        marginTop: 19,
    },
    logouttext: {
        color: '#DE3B40',
        fontSize: 15,
        fontWeight: '500',
    },
    removetext: {
        color: '#F5F5F5',
        fontSize: 15,
        fontWeight: '400',
    },
});