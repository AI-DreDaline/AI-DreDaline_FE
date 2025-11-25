import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import {WithLocalSvg} from 'react-native-svg/css';
import { useNavigateCtx } from './NavigateContext';

const round_3 = require('../assets/images/round_3.svg');
const map = require('../assets/images/map_ready_1.svg');

const LeftNavigateScreen = () => {

    const {timeIntervals} = useNavigateCtx();
    const { lappace } = useNavigateCtx();

    const [race, setRace] = useState<
        {
            lap: number;
            time: string;
            pace: string;
            heartRate: number;
            power: number;
        }[]
    >([]);

    function formatPace(pace: number) {
        if (!pace || pace <= 0) return "0'00\"/KM";

        const minutes = Math.floor(pace);            // 분
        const seconds = Math.round((pace - minutes) * 60); // 초

        const paddedSeconds = seconds.toString().padStart(2, '0');

        return `${minutes}'${paddedSeconds}\"/KM`;
    }

    useEffect(() => {
        console.log("timeIntervals 변경됨", timeIntervals);
        
        if (timeIntervals.length === 0) return;

        const lastInterval = timeIntervals[timeIntervals.length - 1];
        const [, end] = lastInterval;

        if (end === null) return; // 아직 마지막 구간이 진행 중이면 업데이트 안 함

        const newRace = timeIntervals.map(([start, end], index) => {
            const calculatedEnd = end ?? Date.now();
            const diff = calculatedEnd - start;
            const minutes = Math.floor(diff / 60000);
            const seconds = Math.floor((diff % 60000) / 1000);
            const pace = lappace[index] ? formatPace(lappace[index]) : '0\'00\"/KM';

            return {
                lap: index + 1,
                time: `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
                pace: pace,
                heartRate: 0,
                power: 0,
            };
        });

        setRace(newRace);
        console.log("newrace:",newRace);
    }, [timeIntervals]);

    return (
        <View style={styles.container}>
            <View style={styles.mapview}>
                <WithLocalSvg
                    asset={map}
                    width= {315}
                    height={277}
                    style={styles.map}
                />
                <WithLocalSvg
                    asset={round_3}
                    width={319}
                    height={280}
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

                <View style={{ width: 500, backgroundColor: 'green'}}>
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 50 }}
                    >
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
                    </ScrollView>
                </View>
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
        marginTop: 92,
        marginLeft: 32,
    },
    round: {
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
