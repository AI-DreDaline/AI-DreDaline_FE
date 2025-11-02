import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import round_3 from '../assets/images/round_3.png';
import map from '../assets/images/map_ready.png';

const LeftNavigateScreen = () => {
    const race = [
        {
            lap: 1,
            time: "06:14",
            pace: "6'14''/KM",
            heartRate: 152,
            power: 142
        },
        {
            lap: 2,
            time: "05:58",
            pace: "5'58''/KM",
            heartRate: 172,
            power: 162
        },
        {
            lap: 3,
            time: "05:53",
            pace: "5'53''/KM",
            heartRate: 176,
            power: 166
        }
    ];


    return (
        <View style={styles.container}>
            <View style={styles.mapview}>
                <Image
                    source={map}
                    style={styles.map}
                />
                <Image 
                    source={round_3}
                    style={styles.round}
                />
            </View>
            <View style={styles.listview}>

                <Text style={styles.listtitle}>키로수별 정보</Text>

                <View style={styles.listtop}>
                    <Text style={[styles.listtoptext, { marginRight: 40 }]}>Time</Text>
                    <Text style={[styles.listtoptext, { marginRight: 68 }]}>Pace</Text>
                    <Text style={[styles.listtoptext, { marginRight: 35 }]}>Heart Rate</Text>
                    <Text style={styles.listtoptext}>Power</Text>
                </View>

                {race.map((r, index) => (
                    <View key={index}>
                        <View key={index} style={styles.list}>
                            <Text style={styles.lap}>{r.lap}</Text>
                            <Text style={styles.time}>{r.time}</Text>
                            <Text style={styles.pace}>{r.pace}</Text>
                            <Text style={styles.heartRate}>{r.heartRate}BPM</Text>
                            <Text style={styles.power}>{r.power}W</Text>
                        </View>
                        <View style={styles.separator}></View>
                    </View>
                ))}
                
            </View>
        </View>
    );
};

export default LeftNavigateScreen;

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        backgroundColor: '#1C1C1E',
    },
    mapview: {
        backgroundColor: '#1C1C1E',
        height: 400,
    },
    map: {
        width: 315,
        height: 277,
        marginTop: 92,
        marginLeft: 32,
    },
    round: {
        width: 319,
        height: 280,
        position: 'absolute',
        top: 90,
        left: 30,
    },
    listview: {
        backgroundColor: '#1C1C1E',
    },
    listtitle: {
        color: '#ffffff',
        fontSize: 17,
        fontWeight: '600',
        marginTop: 27,
        marginLeft: 19,
    },
    listtop: {
        marginTop: 22,
        marginLeft: 70,
        flexDirection: 'row',
        marginBottom: 2,
    },
    listtoptext: {
        color: '#98989f',
        fontSize: 11,
        fontWeight: '400',
        marginRight: 40,
    },
    list: {
        flexDirection: 'row',
        marginTop: 12,
        marginLeft: 30,
        alignContent: 'center',
    },
    lap: {
        color: '#98989f',
        fontSize: 16,
        marginLeft: 0,
        width: 18,
        textAlign: 'left',
    },
    time: {
        color: '#ffe621',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 22,
        width: 55,
        textAlign: 'left',
    },
    pace: {
        color: '#39e9e6',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 11,
        width: 90,
        textAlign: 'left',
    },
    heartRate: {
        color: '#ff3819',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 3,
        width: 80,
        textAlign: 'left',
    },
    power: {
        color: '#a6ff00',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 12,
        width: 60,
        textAlign: 'left',
    },
    separator: {
        height: 0.3,              // 선 높이
        backgroundColor: '#98989f',  // 선 색
        marginHorizontal: 30,     // 좌우 여백
        marginTop: 10,
    },
});
