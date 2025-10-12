import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import MapLibreGL, { UserTrackingMode } from '@maplibre/maplibre-react-native';

import line from '../assets/images/line.png';
import line_active from '../assets/images/line_active.png';
import start from '../assets/images/start.png';
import endpin from '../assets/images/endpin.png';
import run from '../assets/images/run.png';
import round_4 from '../assets/images/round_4.png';
import allow_navigate from '../assets/images/allow_navigate.png';

const MAP_STYLE_URL = 'https://api.maptiler.com/maps/streets-v2/style.json?key=QhGgr94B6Frh1kFgQHuB';

const MainNavigateScreen = () => {
    const km = 1.79;
    const pace = "6'12''";
    const time = "08:12";
    const kcal = 13;
    const runway = 2;
    const BPM = 145;
    const navigatetext = "다음 안내까지 직진";

    const [percent, setPercent] = useState<number>(0);
    const [routeGeoJSON, setRouteGeoJSON] = useState<any>(null);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

    const exampleRoute = [
        [126.5618, 33.4553], // 제주대학교 근처
        [126.5625, 33.4560],
        [126.5635, 33.4565],
    ];

    const go = () => {
        setPercent(prev => Math.min(prev + 10, 100)); // 10 증가, 최대 100
    };

    useEffect(() => {
            const geojson = {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: exampleRoute,
                },
            };
            setRouteGeoJSON(geojson);
        }, []);
    
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.mapview}>
                    <MapLibreGL.MapView style={{ flex: 1 }} mapStyle={MAP_STYLE_URL}>
                        {/* 카메라: 내 위치 따라가기 */}
                        <MapLibreGL.Camera
                            zoomLevel={15}
                            centerCoordinate={userLocation || [126.5618, 33.4554]} // 제주대 기본값
                            followUserLocation={true}
                            followUserMode={UserTrackingMode.Follow}
                        />
                    
                        {/* 현재 위치 표시 */}
                        <MapLibreGL.UserLocation
                            visible={true}
                            onUpdate={(location) => {
                                const { longitude, latitude } = location.coords;
                                setUserLocation([longitude, latitude]);
                            }}
                        />
                    </MapLibreGL.MapView>
                </View>
                <View style={styles.navigateview}>
                    <Text style={styles.navigatetext}>{navigatetext}</Text>
                    <Image
                        source={allow_navigate}
                        style={{width: 48.79, height: 100, marginTop: 30}}
                    />
                </View>
            </View>
            <View style={styles.parentview}>
                <Image
                        source={round_4}
                        style={{width: 393, height: 98, marginLeft: 1}}
                    />
                <Image
                    source={line}
                    style={{
                        width: 322,
                        height: 3,
                        position: 'absolute',
                        top: 73,
                        left: 35,
                    }}
                />
                <Image
                    source={start}
                    style={styles.start}
                />
                <Image
                    source={endpin}
                    style={styles.endpin}
                />
                <Text 
                    style={{
                        fontSize: 12,
                        color: '#39FF14',
                        fontWeight: '700',
                        position: 'absolute',
                        top: 55,
                        left: 37+145*(percent/100),
                    }}
                >{percent}%</Text>
                <Image
                    source={line_active}
                    style={{
                        width: 322*(percent/100),
                        height: 5,
                        position: 'absolute',
                        top: 72,
                        left: 36,
                    }}
                />
                <TouchableOpacity
                    onPress={go}
                    style={{
                        position: 'absolute',
                        top: 43,
                        left: 28+320*(percent/100),
                    }}
                >
                    <Image
                        source={run}
                        style={{
                            width: 35,
                            height: 35,
                        }}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.infoview}>
                <View style={[styles.info, {paddingTop: 44,}]}>
                    <Text style={styles.infotext}>{km}</Text>
                    <Text style={styles.infotext}>{pace}</Text>
                    <Text style={styles.infotext}>{time}</Text>
                </View>
                <View style={[styles.info, {paddingTop: 1,}]}>
                    <Text style={styles.infotexts}>km</Text>
                    <Text style={styles.infotexts}>평균 페이스</Text>
                    <Text style={styles.infotexts}>시간</Text>
                </View>
                <View style={[styles.info, {paddingTop: 29,}]}>
                    <Text style={styles.infotext}>{kcal}</Text>
                    <Text style={styles.infotext}>{runway}</Text>
                    <Text style={styles.infotext}>{BPM}</Text>
                </View>
                <View style={[styles.info, {paddingTop: 3,}]}>
                    <Text style={styles.infotexts}>kcal</Text>
                    <Text style={[styles.infotexts,{paddingTop: 1}]}>경사</Text>
                    <Text style={styles.infotexts}>BPM</Text>
                </View>
            </View>
        </View>
    );
};

export default MainNavigateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    mapview: {
        width: 259,
        height: 266,
        borderRadius: 4,
        borderWidth: 3,
        borderColor: '#ffffff', 
        marginTop: 62,
    },
    navigateview: {
        width: 130,
        height: 266,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ffffff', 
        marginTop: 62,
        marginLeft: 4,
        backgroundColor: '#1B1B1B',
        alignItems: 'center',
    },
    navigatetext: {
        color: '#39FF14',
        fontSize: 16,
        fontWeight: '400',
        width: 90,
        textAlign: 'center',
        paddingTop: 40,
    },
    navigateimage: {

    },
    parentview: {
        width: '100%',
        height: 109,
        marginTop: 12,
        backgroundColor: '#1B1B1B',
    },
    start:{
        width: 31,
        height: 35,
        position: 'absolute',
        top: 43,
        left: 27,
    },
    endpin:{
        width: 30,
        height: 30,
        position: 'absolute',
        top: 40,
        right: 21,
    },
    infoview: {
        width: '100%',
        height: 242,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ffffff', 
        backgroundColor: '#1B1B1B',
    },
    info: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    infotext: {
        fontSize: 36,
        fontWeight: '700',
        color: '#ffffff',
        width: 123,
        textAlign: 'center',
        paddingLeft: 0,
    },
    infotexts: {
        fontSize: 14,
        fontWeight: '500',
        color: '#ffffff',
        width: 123,
        textAlign: 'center',
    },
});
