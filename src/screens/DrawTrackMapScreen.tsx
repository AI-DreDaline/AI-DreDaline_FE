import React, { useState, useRef, useLayoutEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput, Alert } from "react-native";
import MapLibreGL from "@maplibre/maplibre-react-native";
import type { Feature, LineString } from 'geojson';
import { useNavigation } from "@react-navigation/native";
import useTabBarVisibility from "../assets/useTabBarVisibility";
import MapView from 'react-native-maps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/types';

import back from '../assets/images/back.png';
import draw from '../assets/images/draw.png';
import mountain from '../assets/images/mountain.png';
import camera from '../assets/images/camera.png';
import draw_active from '../assets/images/draw_active.png';
import mountain_active from '../assets/images/mountain_active.png';
import camera_active from '../assets/images/camera_active.png';

const MAP_STYLE_URL = 'https://api.maptiler.com/maps/streets-v2/style.json?key=QhGgr94B6Frh1kFgQHuB';
const API_KEY = "QhGgr94B6Frh1kFgQHuB";

// 올바른 방법
function DrawTrackMapScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'DrawTrackMap'>) {
    
    useTabBarVisibility(false);
    const mapRef = useRef<MapView>(null);

    const [address, setAddress] = useState('위치를 불러오는 중...');
    const cameraRef = useRef<MapLibreGL.CameraRef>(null);
    const [query, setQuery] = useState('');
    const [centerCoord, setCenterCoord] = useState<[number, number]>([126.9780, 37.5665]);
    const [lineCoords, setLineCoords] = useState<[number, number][]>([]);
    const [selectedTool, setSelectedTool] = useState<'draw' | 'mountain' | 'camera' | null>(null);

    const handleMapPress = (e: any) => {
        if (selectedTool !== 'draw') return;
        const [lng, lat] = e.geometry.coordinates;

        // 기존 좌표와 같은 점이 있는지 검사 (오차 허용)
        const index = lineCoords.findIndex(
            ([x, y]) => Math.abs(x - lng) < 0.00001 && Math.abs(y - lat) < 0.00001
        );

        if (index >= 0) {
            // 이미 있는 점이면 제거
            setLineCoords(prev => prev.filter((_, i) => i !== index));
        } else {
            // 없으면 추가
            setLineCoords(prev => [...prev, [lng, lat]]);
        }
    };


    async function searchPlace(query: string) {
        console.log("검색 활성화",query);
        const url = `https://api.maptiler.com/geocoding/${encodeURIComponent(query)}.json?key=${API_KEY}&limit=5`;

        try {
            const response = await fetch(url);
            const result = await response.json();
            console.log("검색 결과:", result.features);
            if (result.features && result.features.length > 0) {
                const place = result.features[0];
                const [lon, lat] = place.geometry.coordinates;
                setCenterCoord([lon, lat]);

                // Camera를 통해 중심 이동
                cameraRef.current?.setCamera({
                    centerCoordinate: [lon, lat],
                    zoomLevel: 15,
                    animationDuration: 1000,
                });
            } else {
                console.log("검색 결과 없음");
            }
        } catch (error) {
            console.error("검색 중 오류:", error);
        }
    };


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topscreen}>
                <View style={styles.topview}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()} // 뒤로가기
                    >
                        <Image 
                            source={back}
                            style={{width: 11, height:18}}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>지도에서 그리기</Text>
                    <TouchableOpacity>
                        <Text style={styles.subtitle}>완료</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* 검색 바 */}
            <MapLibreGL.MapView
                style={styles.map}
                mapStyle={MAP_STYLE_URL}
                onPress={(e) => handleMapPress(e)}
            >
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="검색"
                        placeholderTextColor="white" 
                        value={query}
                        onChangeText={setQuery}
                        returnKeyType="search"          // 엔터키 모양을 검색으로 변경 (iOS/Android 모두)
                        onSubmitEditing={() => searchPlace(query)} // 엔터 눌렀을 때 실행
                    />
                </View>
                <MapLibreGL.Camera
                    ref={cameraRef}
                    zoomLevel={14}
                    centerCoordinate={centerCoord}
                />

                {lineCoords.length > 0 && (
                    <>
                        {/* 라인 */}
                        <MapLibreGL.ShapeSource
                            id="userLine"
                            shape={{
                                type: "Feature",
                                geometry: { type: "LineString", coordinates: lineCoords },
                                properties: {},
                            }}
                        >
                            <MapLibreGL.LineLayer
                                id="userLineLayer"
                                style={{
                                    lineColor: "#d6ff5c",
                                    lineWidth: 6,
                                    lineJoin: "round",
                                    lineCap: "round",
                                }}
                            />
                        </MapLibreGL.ShapeSource>

                        {/* 꼭짓점 표시 */}
                        {lineCoords.map(([lng, lat], idx) => (
                            <MapLibreGL.PointAnnotation
                                key={idx}
                                id={`point-${idx}`}
                                coordinate={[lng, lat]}
                            >
                                <View
                                    style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 5,
                                    backgroundColor: '#d6ff5c',
                                    borderWidth: 1,
                                    borderColor: '#ffffff',
                                    }}
                                />
                            </MapLibreGL.PointAnnotation>
                        ))}
                    </>
                )}
            </MapLibreGL.MapView>

            <View style={styles.addressBox}>
                <TouchableOpacity onPress={() => setSelectedTool(prev => (prev === 'draw' ? null : 'draw'))}>
                    <Image
                        source={selectedTool === 'draw' ? draw_active : draw}
                        style={{ width: 35, height: 35, marginLeft: 23, marginTop: 10 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedTool(prev => (prev === 'mountain' ? null : 'mountain'))}>
                    <Image
                        source={selectedTool === 'mountain' ? mountain_active : mountain}
                        style={{ width: 38, height: 35, marginLeft: 33, marginTop: 14 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedTool(prev => (prev === 'camera' ? null : 'camera'))}>
                    <Image
                        source={selectedTool === 'camera' ? camera_active : camera}
                        style={{ width: 33, height: 33, marginLeft: 33, marginTop: 10 }}
                    />
                </TouchableOpacity>
                <Text style={styles.kmText}>0.00</Text>
                <Text style={styles.km}>km</Text>
            </View>
        </View>
    );
}
export default DrawTrackMapScreen;

const styles = StyleSheet.create({
    topscreen: { 
        height: 104,
        backgroundColor: "#1B1B1B",
    },
    backButton: {
        marginLeft: 24,
        marginTop: 3,
    },
    searchContainer: {
        position: 'absolute',
        top: 12,
        left: 21,
        width: 349,
        height: 43,
        backgroundColor: 'rgba(27, 27, 27, 0.41)',
        borderRadius: 12,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: 999,
    },
    searchInput: {
        width: '100%',
        height: '100%',
        color: 'white',
        fontSize: 16,
    },
    map: { flex: 1 },
    topview: {
        backgroundColor: '#1B1B1B',
        flexDirection: 'row',
        marginTop: 69,
        height: 30,
    },
    title:{
        fontSize: 20,
        color: '#ffffff',
        marginLeft: 105,
        fontWeight: '900',
    },
    subtitle: {
        color: '#39FF14',
        fontSize: 20,
        paddingTop: 2,
        paddingLeft: 65,
    },
    addressBox: {
        position: 'absolute',
        bottom: 0, // 바닥에 붙이기
        left: 0,
        right: 0,
        height: 86,
        backgroundColor: '#1B1B1B',
        padding: 10,
        flexDirection: 'row',
    },
    kmText: {
        color: '#39FF14',
        fontWeight: '600',
        fontSize: 43,
        paddingLeft: 58,
    },
    km: {
        color: '#ffffff',
        fontWeight: '500',
        fontSize: 17,
        paddingLeft: 5,
        paddingTop: 23,
    },
});