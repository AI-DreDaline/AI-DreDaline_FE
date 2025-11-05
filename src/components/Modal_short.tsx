import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import map_ready from '../assets/images/map_ready.png';
import arrow from '../assets/images/arrow.png';
import run from '../assets/images/run.png';
import x from '../assets/images/x.png';
import round_2 from '../assets/images/round_2.png';
import runway_img from '../assets/images/runway.png';

import thunder_white from '../assets/images/thunder_white.png';
import thunder_green from '../assets/images/thunder_green.png';
import thunder_blue from '../assets/images/thunder_blue.png';
import thunder_yellow from '../assets/images/thunder_yellow.png';
import thunder_orange from '../assets/images/thunder_orange.png';

import { RootStackParamList } from '../navigations/types';
import { NavigationProp } from '@react-navigation/native';

interface ModalShortProps {
    title: string | null;
    closeModal: () => void;
    navigation: NavigationProp<RootStackParamList>;
}

export default function Modal_short({ title, closeModal, navigation }: ModalShortProps) {
    const km = 6.17;
    const address = '서울특별시 세종로 1-88';
    const level = '중';
    const time = '00:34:15';
    const runway = '5.7'

    return (
        <View>
            <View style={styles.modalContainer}>
                {/* 상단바 */}
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Image
                            source={arrow}
                            style={{width: 24, height: 24}}
                        />
                    </TouchableOpacity>
                    <View style={styles.titleview}>
                        <Image
                            source={run}
                            style={{width: 35, height: 35}}
                        />
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <TouchableOpacity onPress={closeModal}>
                        <Image
                            source={x}
                            style={styles.close}
                        />
                    </TouchableOpacity>
                </View>
            
                {/* 내용 */}
                <View style={styles.content}>
                    <View style={styles.mapview}>
                        <Image 
                            source={map_ready} 
                            style={{ width: 300, height: 300, marginBottom: 0 }} 
                        />
            
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ReadyMap');
                                closeModal();
                            }}
                        >
                            <Image 
                                source={round_2} 
                                style={{ 
                                    width: 305,
                                    height: 305,
                                    position: 'absolute',
                                    top: -302,
                                    left: -153,
                                }} 
                            />
                        </TouchableOpacity>
                                                    
                    </View>
                    <View style={styles.lastview}>
                        <Text style={styles.listitle}>경로 정보</Text>
            
                        <View style={styles.listboxview}>
                            <View style={styles.listview}>
                                <Image
                                    source={thunder_white}
                                    style={styles.thunder}
                                />
                                <Text style={styles.list}>거리</Text>
                                <Text style={styles.listkey}>{km}km</Text>
                            </View>
                            <View style={styles.listview}>
                                <Image
                                    source={thunder_green}
                                    style={styles.thunder}
                                />
                                <Text style={styles.list}>시작 위치</Text>
                                <Text style={styles.listkey}>{address}</Text>
                            </View>
                            <View style={styles.listview}>
                                <Image
                                    source={thunder_blue}
                                    style={styles.thunder}
                                />
                                <Text style={styles.list}>예상 난의도</Text>
                                <Text style={styles.listkey}>{level}</Text>
                            </View>
                            <View style={styles.listview}>
                                <Image
                                    source={thunder_yellow}
                                    style={styles.thunder}
                                />
                                <Text style={styles.list}>예상소요 시간</Text>
                                <Text style={styles.listkey}>{time}</Text>
                            </View>
                            <View style={styles.listview}>
                                <Image
                                    source={thunder_orange}
                                    style={styles.thunder}
                                />
                                <Text style={styles.list}>경사도</Text>
                                <Text style={styles.listkey}>{runway}m</Text>
                            </View>
                        </View>
                        <View style={{paddingLeft: 36,}}>
                            <Image
                                source={runway_img}
                                style={{width: 319, height: 63}}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        height: 768,
        backgroundColor: '#1B1B1B',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingHorizontal: 0,
        paddingTop: 15,
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
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 6,
        textDecorationLine: 'underline',
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
        height: 350,
        width: '100%',
        alignItems: 'center',
        paddingTop: 17,
    },
    lastview: {
        backgroundColor: '#1B1B1B',
        flex:1,
        width: '100%',
    },
    listitle:{
        fontSize: 20,
        color: '#ffffff',
        fontWeight: '600',
        paddingHorizontal: 35,
        marginTop: 4,
    },
    listboxview: {
        paddingHorizontal: 35,
        paddingTop: 27,
    },
    listview: {
        flexDirection: 'row',
        marginBottom: 19,
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
});