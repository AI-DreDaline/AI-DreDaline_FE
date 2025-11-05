import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Modal, TouchableOpacity } from 'react-native';

import run from '../assets/images/run.png';
import map_ready from '../assets/images/map_ready.png';
import arrow from '../assets/images/arrow.png';
import x from '../assets/images/x.png';
import round_2 from '../assets/images/round_2.png';
import thunder_white from '../assets/images/thunder_white.png';
import thunder_blue from '../assets/images/thunder_blue.png';
import thunder_yellow from '../assets/images/thunder_yellow.png';
import thunder_orange from '../assets/images/thunder_orange.png';
import heartrate_img from '../assets/images/heartrate.png';

interface ModalLongProps {
  selectedDate: string | null;
  closeModal: () => void;
}

export default function Modal_long({ selectedDate, closeModal }: ModalLongProps) {
    const formattedDate = selectedDate
        ? selectedDate
            .split("-")
            .map((part, index) => (index === 1 || index === 2 ? part.padStart(2, "0") : part))
            .join("-")
        : "";

    const Date =
        `${formattedDate.split("-")[0]}년 ${formattedDate.split("-")[1]}월 ${formattedDate.split("-")[2]}일`;

    const km = 5.13;
    const face = '6\'29\"';
    const time = '00:34:15';
    const runway = '5.7';
    
    const km_info = [
        ['06:14', "6'14\"", '152', '142'],
        ['05:58', "5'58\"", '172', '162'],
        ['06:14', "6'14\"", '152', '142'],
        ['05:58', "5'58\"", '172', '162'],
        ['06:14', "6'14\"", '152', '142'],
        ['05:58', "5'58\"", '172', '162'],
    ];
    const km_count = km_info.length;
    const med_heartrate = 171;

    const heartrate = [
        ['01:23', '<141'],
        ['01:53', '142-154'],
        ['02:12', '155-166'],
        ['20:12', '167-179'],
        ['06:52', '180+']
    ];
    const heartrate_count = heartrate.length;
    
    const heartrateSeconds = heartrate.map(([time, _]) => {
        const [minStr, secStr] = time.split(':');
        const totalSeconds = parseInt(minStr, 10) * 60 + parseInt(secStr, 10);
        return totalSeconds;
    });

    const zoneColors = ['#3ca3f9', '#42f1e1', '#bdff00', '#ff8208', '#ff0c6e'];

    const totalHeartrateSeconds = heartrateSeconds.reduce((acc, curr) => acc + curr, 0);
    
    const heartrateBars = heartrateSeconds.map(sec => {
        return (sec / totalHeartrateSeconds) * 130;
    });

    return(
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
                                <Text style={styles.modaltitle}>{Date}</Text>
                            </View>

                            <TouchableOpacity onPress={closeModal} >
                                <Image
                                    source={x}
                                    style={styles.close}
                                />
                            </TouchableOpacity>
                        </View>
              
                        <ScrollView contentContainerStyle={styles.scrollContent}>
                            {/* 내용 */}
                            <View style={styles.content}>
                                <View style={styles.mapview}>
                                    <Image 
                                        source={map_ready} 
                                        style={{ width: 150, height: 150, marginBottom: 0 }} 
                                    />
                                    <Image 
                                        source={round_2} 
                                        style={{ 
                                            width: 155,
                                            height: 155,
                                            position: 'absolute',
                                            top: 23,
                                            left: 22,
                                        }} 
                                    />

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
                                                source={thunder_orange}
                                                style={styles.thunder}
                                            />
                                            <Text style={styles.list}>경사도</Text>
                                            <Text style={styles.listkey}>{runway}m</Text>
                                        </View>
                                        <View style={styles.listview}>
                                            <Image
                                                source={thunder_blue}
                                                style={styles.thunder}
                                            />
                                            <Text style={styles.list}>평균 페이스</Text>
                                            <Text style={styles.listkey}>{face}/km</Text>
                                        </View>
                                        <View style={styles.listview}>
                                            <Image
                                                source={thunder_yellow}
                                                style={styles.thunder}
                                            />
                                            <Text style={styles.list}>소요 시간</Text>
                                            <Text style={styles.listkey}>{time}</Text>
                                        </View>
                                    </View>
                                </View>

                                <View 
                                    style={[
                                        styles.kmboxview,
                                        { height: 76 + (km_count * 40) },
                                    ]}
                                >
                                    <Text style={styles.kmlisttitle}>키로수별 정보</Text>

                                    <View style={styles.kmlisttop}>
                                        <Text style={[styles.kmlisttoptext, { marginRight: 40 }]}>Time</Text>
                                        <Text style={[styles.kmlisttoptext, { marginRight: 68 }]}>Pace</Text>
                                        <Text style={[styles.kmlisttoptext, { marginRight: 35 }]}>Heart Rate</Text>
                                        <Text style={styles.kmlisttoptext}>Power</Text>
                                    </View>

                                    {km_info.map((r, index) => (
                                        <View key={index}>
                                            <View key={index} style={styles.kmlist}>
                                                <Text style={styles.kmlap}>{index + 1}</Text>
                                                <Text style={styles.kmtime}>{r[0]}</Text>
                                                <Text style={styles.kmpace}>{r[1]}/km</Text>
                                                <Text style={styles.kmheartRate}>{r[2]}BPM</Text>
                                                <Text style={styles.kmpower}>{r[3]}W</Text>
                                            </View>
                                            <View style={styles.kmseparator} />
                                        </View>
                                    ))}
                                </View>

                                <View style={[styles.heartrateboxview, { height: 290 + (heartrate_count * 30) }]}>
                                    <Text style={styles.kmlisttitle}>심박수 정보</Text>
            
                                    <View style={styles.heartratetitlebox}>
                                        <Text style={styles.heartratetitle}>평균 심박수</Text>
                                        <Text style={styles.heartratebpm}>{med_heartrate}BPM</Text>
                                        <View style={styles.heartrateseparator} />
            
                                        <Text style={styles.heartratetitle_2}>심박수 변화</Text>
                                        <Image
                                            source={heartrate_img}
                                            style={{width: 353, height: 83, marginTop: 0,}}
                                        />
                                        <Text style={styles.heartrateavg}>171 BPM AVG</Text>
                                        <View style={styles.heartrateseparator_2} />
              
                                        <View>
                                            {heartrate.map((r, index) => (
                                                <View key={index}>
                                                    <View style={styles.heartratelist}>
                                                        <Text style={[styles.heartratezone, { color: zoneColors[index % zoneColors.length] }]}>Zone {index + 1}</Text>
                                                        <View 
                                                            style={[
                                                                styles.zoneBar, 
                                                                { 
                                                                    backgroundColor: zoneColors[index % zoneColors.length],
                                                                    width: heartrateBars[index], // 길이
                                                                }
                                                            ]} 
                                                        />
                                                        <Text style={styles.heartratetime}>{r[0]}</Text>
                                                        <View style={styles.heartratetotalbpmview}>
                                                            <Text style={styles.heartratetotalbpm}>{r[1]}BPM</Text>
                                                        </View>
                                                    </View>
                                                    <View style={styles.heartrateseparator_3} />
                                                </View>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
        </View>
    );
}

const styles = StyleSheet.create ({
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
    modaltitle: {
        color: '#fff',
        fontSize: 16,
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