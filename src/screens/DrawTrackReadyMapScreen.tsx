import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput, Alert } from "react-native";
import useTabBarVisibility from "../assets/useTabBarVisibility";
import MapLibreGL, { MapViewRef, CameraRef } from '@maplibre/maplibre-react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/types';
import { API_KEY } from '@env';

import x_black from '../assets/images/x_black.png';

const MAP_STYLE_URL = `https://api.maptiler.com/maps/streets-v2/style.json?key=${API_KEY}`;
const centerCoord: [number, number] = [126.9780, 37.5665]; // 서울 좌표 예시

// 올바른 방법
function DrawTrackReadyMapScreen({navigation}: NativeStackScreenProps<RootStackParamList, 'DrawTrackReadyMap'>) {
    
    useTabBarVisibility(false);
    const mapRef = useRef<MapViewRef>(null);
    const cameraRef = useRef<CameraRef>(null);

    return (
        <View style={styles.container}>
            <MapLibreGL.MapView
                ref={mapRef}
                style={styles.map}
                mapStyle={MAP_STYLE_URL}
            >
                <MapLibreGL.Camera
                    ref={cameraRef}
                    zoomLevel={15}
                    centerCoordinate={centerCoord}
                />
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        position: 'absolute',
                        top: 60,      // 상단 위치
                        right: 15,    // 오른쪽에서 20px 떨어짐
                        width: 30,
                        height: 30,
                    }}
                >
                    <Image source={x_black} style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
            </MapLibreGL.MapView>
        </View>

    );
}
export default DrawTrackReadyMapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000', // 로딩 중 검은 화면 방지용
    },
    map: {
        flex: 1,
    },
});