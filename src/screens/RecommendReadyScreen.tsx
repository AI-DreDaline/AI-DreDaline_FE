import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/types';

import runner from '../assets/images/runner_active.png';
import graph from '../assets/images/graph.png';
import setting from '../assets/images/setting.png';
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

function RecommendReadyScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'RecommendReady'>) {
    const km = 6.17;
    const address = '서울특별시 세종로 1-88';
    const level = '중';
    const time = '00:34:15';
    const runway = '5.7'
    const [visible, setVisible] = useState(false);
    
    return (
        <View style={styles.container}>
            <View style={styles.topline}>
                <Image
                    source={runner}
                    style={{width: 35, height: 35}}
                />
                <Text style={styles.toptext}>
                    <Text style={{ fontWeight: 'bold' }}>러닝 </Text>
                    모양{' '}
                    <Text style={{ fontWeight: 'bold' }}>{km}km</Text>
                    {' '}추천 경로입니다.
                </Text>
            </View>
            <View style={styles.runview}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('RecommendReadyMap')}
                >
                    <View style={styles.runbox}>
                        <Image
                            source={map_ready}
                            style={{
                                width: 333,
                                height: 355,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                            }}
                        />
                        <View style={styles.runtextview}>
                            <Text style={styles.runtextone}>{km}km</Text>
                            <Text style={styles.runtexttwo}>address</Text>
                            <Text style={styles.runtextthree}>예상 난의도: 중</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            
            <View style={styles.buttonview}>
                <View>
                    <TouchableOpacity onPress={() => setVisible(true)}>
                        <Image
                            source={graph}
                            style={{width:20, height: 25}}
                        />
                    </TouchableOpacity>
                    
                    <Modal visible={visible} animationType="slide" transparent>
                        <View style={styles.overlay}>
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
                                        <Text style={styles.title}>경로 세부사항</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => setVisible(false)}>
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
                                        <Image 
                                            source={round_2} 
                                            style={{ 
                                                width: 305,
                                                height: 305,
                                                position: 'absolute',
                                                top: 15,
                                                left: 45,
                                            }} 
                                        />
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
                    </Modal>
                    
                </View>

                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{navigation.navigate('Navigate')}}
                >
                    <Text style={styles.buttonText}>안내 시작</Text>
                </TouchableOpacity>
                    <Image
                        source={setting}
                        style={{width:23, height: 24}}
                    />
            </View>
        </View>
    );
};

export default RecommendReadyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    topline: {
        flexDirection: 'row',
        paddingLeft: 29,
        backgroundColor: '#141414',
        marginTop: 7,
    },
    toptext: {
        color: 'rgba(255, 255, 255, 0.95)',
        fontSize: 15,
        fontWeight: '300',
        paddingLeft: 8,
        paddingTop: 8,
    },
    runview: {
        backgroundColor: '#141414',
        height: 460,
    },
    runbox: {
        backgroundColor: '#1B1B1B',
        borderRadius: 10,
        width: 333,
        height: 430,
        marginTop: 10,
        marginLeft: 29
    },
    runtextview:{
        paddingLeft: 20,
    },
    runtextone: {
        fontSize: 16,
        fontWeight: '700',
        color: '#ffffff',
        paddingTop: 7,
    },
    runtexttwo: {
        fontSize: 15,
        fontWeight: '300',
        color: '#ffffff',
        paddingTop: 3,
    },
    runtextthree: {
        fontSize: 12,
        fontWeight: '500',
        color: '#39FF14',
        paddingTop: 4,
    },
    buttonview:{
        backgroundColor:'#141414',
        height: 77,
        paddingTop: 9,
        paddingHorizontal: 45,
        paddingBottom: 22,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#39FF14',
        width: 186,
        height: 52,
        borderRadius: 8,
        alignItems: 'center',
        paddingTop: 15,
    },
    buttonText: {
        color: 'black',
        fontSize: 18,
        fontWeight: '700',
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
