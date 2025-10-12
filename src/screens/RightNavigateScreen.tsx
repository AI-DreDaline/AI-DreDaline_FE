import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import MapLibreGL, { UserTrackingMode } from '@maplibre/maplibre-react-native';

import line from '../assets/images/line.png';
import line_active from '../assets/images/line_active.png';
import start from '../assets/images/start.png';
import endpin from '../assets/images/endpin.png';
import run from '../assets/images/run.png';

const { width, height } = Dimensions.get('window');
const MAP_STYLE_URL = 'https://api.maptiler.com/maps/streets-v2/style.json?key=QhGgr94B6Frh1kFgQHuB';

const RightNavigateScreen = () => {
    const [routeGeoJSON, setRouteGeoJSON] = useState<any>(null);
    const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
    const [percent, setPercent] = useState<number>(0);

    // 예시 경로 좌표
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
            <View style={styles.topview}>
                <View style={{ position: 'relative' }}>
                    <Image
                        source={line}
                        style={{width: 322, marginTop: 109, marginLeft: 34}}
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
                            fontWeight: '500',
                            position: 'absolute',
                            top: 90,
                            left: 21+145*(percent/100),
                        }}
                    >{percent}%</Text>
                    <Image
                        source={line_active}
                        style={{
                            width: 322*(percent/100),
                            position: 'absolute',
                            top: 106,
                            left: 30,
                        }}
                    />
                    <TouchableOpacity
                        onPress={go}
                        style={{
                            position: 'absolute',
                            top: 79,
                            left: 21+320*(percent/100),
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
            </View>
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
        </View>
    );
};

export default RightNavigateScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topview: {
        backgroundColor: '#1B1B1B',
        width: '100%',
        height: 132,
    },
    start:{
        width: 31,
        height: 35,
        position: 'absolute',
        top: 79,
        left: 21,
    },
    endpin:{
        width: 30,
        height: 30,
        position: 'absolute',
        top: 77,
        right: 21,
    },
    mapview: {
        flex: 1,
    },
});
