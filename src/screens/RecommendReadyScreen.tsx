import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import runner from '../assets/images/runner_active.png';
import graph from '../assets/images/graph.png';
import setting from '../assets/images/setting.png';
import map_ready from '../assets/images/map_ready.png';

const RecommendReadyScreen: React.FC = () => {
    const km = 6.17
    
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
            </View>
            
            <View style={styles.buttonview}>
                <Image
                    source={graph}
                    style={{width:20, height: 25}}
                />
                <TouchableOpacity
                    style={styles.button}
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
});
