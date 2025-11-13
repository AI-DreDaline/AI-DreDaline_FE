import React, { useState, useRef, useLayoutEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput, Alert, PermissionsAndroid, Platform } from "react-native";
import MapLibreGL from "@maplibre/maplibre-react-native";
import useTabBarVisibility from "../assets/useTabBarVisibility";
import MapView from 'react-native-maps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/types';
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';
import Geolocation from 'react-native-geolocation-service';
import { getCoordinates } from '../components/SearchAdress';
import {WithLocalSvg} from 'react-native-svg/css';

const back = require('../assets/images/back.svg');
const gps = require('../assets/images/gps.svg');
const mountain = require('../assets/images/mountain.svg');
const camera = require('../assets/images/camera.svg');
const gps_active = require('../assets/images/gps_active.svg');
const mountain_active = require('../assets/images/mountain_active.svg');
const camera_active = require('../assets/images/camera_active.svg');

const MAP_STYLE_URL = 'https://api.maptiler.com/maps/streets-v2/style.json?key=QhGgr94B6Frh1kFgQHuB';
const API_KEY = "QhGgr94B6Frh1kFgQHuB";

// 올바른 방법
function DrawTrackMapScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'DrawTrackMap'>) {
    
    useTabBarVisibility(false);
    const mapRef = useRef<MapView>(null);

    const [address, setAddress] = useState('');
    
    const cameraRef = useRef<MapLibreGL.CameraRef>(null);
    const [query, setQuery] = useState('');
    const [centerCoord, setCenterCoord] = useState<[number, number]>([126.9780, 37.5665]);
    const [lineCoords, setLineCoords] = useState<[number, number][]>([]);
    const [selectedTool, setSelectedTool] = useState<'here' | 'mountain' | 'camera' | null>(null);

    
    const handleMapPress = async (e: any) => {
        //if (selectedTool !== 'here') return;
        const [lng, lat] = e.geometry.coordinates;

        // 기존 좌표와 같은 점이 있는지 검사 (오차 허용)
        const index = lineCoords.findIndex(
            ([x, y]) => Math.abs(x - lng) < 0.00001 && Math.abs(y - lat) < 0.00001
        );

        if (index >= 0) {
            // 이미 있는 점이면 제거
            setLineCoords(prev => prev.filter((_, i) => i !== index));
        } else {
            // 새 점 추가
            setLineCoords(prev => [...prev, [lng, lat]]);

            // 첫 번째 좌표라면 주소 가져오기
            if (lineCoords.length === 0) {
                const newAddress = await fetchAddressFromCoord(lng, lat);
                setAddress(newAddress);
            }
        }
    };
    
    // cameraRef는 MapLibreGL.Camera의 ref를 전달받아야 합니다.
    const FocusHere = async (cameraRef: React.RefObject<MapLibreGL.CameraRef | null>) => {
        let hasPermission = true;

        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
        }

        if (!hasPermission) {
            Alert.alert('권한 없음', '위치 권한이 필요합니다.');
            return;
        }

        Geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords;
                cameraRef.current?.setCamera({
                    centerCoordinate: [longitude, latitude],
                    zoomLevel: 15,
                    animationDuration: 1000,
                });
            },
            (err) => console.error(err),
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    async function searchPlace(query: string) {
        console.log("검색 활성화",query);

        try {
            const coords = await getCoordinates(query);
            if (coords) {
                const { lat, lng } = coords;
                setCenterCoord([lng, lat]);

                cameraRef.current?.setCamera({
                    centerCoordinate: [lng, lat],
                    zoomLevel: 10,
                    animationDuration: 1000,
                });
            } else {
                console.log("좌표를 가져올 수 없음");
            }
        } catch (error) {
            console.error("검색 중 오류:", error);
        }
    };

    async function fetchAddressFromCoord(lng: number, lat: number) {
        try {
            const url = `https://api.maptiler.com/geocoding/${lng},${lat}.json?key=${API_KEY}`;
            const response = await fetch(url);
            const result = await response.json();
            if (result.features && result.features.length > 0) {
                return result.features[0].place_name;
            }
            return '알 수 없는 위치';
        } catch (err) {
            console.error(err);
            return '주소 불러오기 실패';
        }
    }


    return (
        <View style={{ flex: 1 }}>
            <View style={styles.topscreen}>
                <View style={styles.topview}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()} // 뒤로가기
                    >
                        <WithLocalSvg
                            asset={back}
                            style={{width: 11, height:18}}
                        />
                    </TouchableOpacity>
                    <Text style={styles.title}>지도에서 그리기</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('MainScreen', {
                                screen: 'DrawTrackRun', // 두 번째 탭 이름
                                address,
                                mode: 'drawReady',       // Ready 상태
                            })
                        }
                    >
                        <Text style={styles.subtitle}>완료</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* 검색 바 */}
            <GestureHandlerRootView style={{ flex: 1 }}>
                <TapGestureHandler
                    numberOfTaps={1}
                    minPointers={1} // 👈 한 손가락만 허용
                    onActivated={(event) => handleMapPress(event)} // 한 손가락 탭 시에만 실행
                >
                    <View style={{ flex: 1 }}>
                        <MapLibreGL.MapView
                            style={styles.map}
                            mapStyle={MAP_STYLE_URL}
                            onPress={handleMapPress}
                        >
                            <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="검색"
                                placeholderTextColor="white"
                                value={query}
                                onChangeText={setQuery}
                                returnKeyType="search"
                                onSubmitEditing={() => searchPlace(query)}
                            />
                            </View>

                            <MapLibreGL.Camera
                                ref={cameraRef}
                                zoomLevel={14}
                                centerCoordinate={centerCoord}
                            />
                            
                            <MapLibreGL.UserLocation
                                visible={true}
                                showsUserHeadingIndicator={true} // 화살표 모양
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
                    </View>
                </TapGestureHandler>
            </GestureHandlerRootView>


            {selectedTool === 'mountain' && (
                <View style={styles.mountain}>
                </View>
            )}

            <View style={styles.addressBox}>
                <TouchableOpacity 
                    onPress={() => {
                        // 1️⃣ 툴 상태 토글
                        setSelectedTool(prev => (prev === 'here' ? null : 'here'));

                        // 2️⃣ 선택된 상태일 때만 현위치로 이동
                        if (selectedTool !== 'here') {
                            FocusHere(cameraRef); // cameraRef는 MapLibreGL.Camera의 ref
                        }
                    }}
                >
                    <WithLocalSvg
                        asset={selectedTool === 'here' ? gps_active : gps}
                        style={{ width: 35, height: 35, marginLeft: 23, marginTop: 10 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedTool(prev => (prev === 'mountain' ? null : 'mountain'))}>
                    <WithLocalSvg
                        asset={selectedTool === 'mountain' ? mountain_active : mountain}
                        style={{ width: 38, height: 35, marginLeft: 33, marginTop: 14 }}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setSelectedTool(prev => (prev === 'camera' ? null : 'camera'))}>
                    <WithLocalSvg
                        asset={selectedTool === 'camera' ? camera_active : camera}
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
    mountain: {
        backgroundColor: '#96d49c',
        height: 78,
        width: '100%',
        position: 'absolute',
        bottom: 86,
        left: 0,
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