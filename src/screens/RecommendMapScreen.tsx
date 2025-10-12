import React, { useState, useRef, useLayoutEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput, Alert } from "react-native";
import MapLibreGL from "@maplibre/maplibre-react-native";
import { useNavigation } from "@react-navigation/native";
import back from '../assets/images/back.png';
import useTabBarVisibility from "../assets/useTabBarVisibility";
import MapView from 'react-native-maps';
import Clipboard from '@react-native-clipboard/clipboard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/types';

const MAP_STYLE_URL = 'https://api.maptiler.com/maps/streets-v2/style.json?key=QhGgr94B6Frh1kFgQHuB';
const API_KEY = "QhGgr94B6Frh1kFgQHuB";

// 올바른 방법
function RecommendMapScreen({ navigation, route }: NativeStackScreenProps<RootStackParamList, 'RecommendMap'>) {
    useTabBarVisibility(false);
    const mapRef = useRef<MapView>(null);

    const copyToClipboard = () => {
        Clipboard.setString(address); // 클립보드에 복사
        Alert.alert('복사 완료', '주소가 클립보드에 복사되었습니다.');
    };

    const [address, setAddress] = useState('위치를 불러오는 중...');
    const [place, setPlace] = useState('장소를 불러오는 중...');
    const cameraRef = useRef<MapLibreGL.CameraRef>(null);
    const [query, setQuery] = useState('');
    const [centerCoord, setCenterCoord] = useState<[number, number]>([126.9780, 37.5665]);

    const handleRegionChange = async (region: any) => {
    // region 객체 안에 geometry.coordinates에 [lng, lat] 있음
        const center = region.geometry?.coordinates;
        if (!center) return;

        const [longitude, latitude] = center;
        console.log("Reverse geocoding 요청 좌표:", latitude, longitude);

        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const result = await response.json();
            console.log("Reverse geocoding 결과:", result);

            if (result?.display_name) {
                const fullAddress = result.display_name;
                const parts = fullAddress.split(',');
                setPlace(parts[0].trim());

                const shortAddress = parts.slice(1, 4).map((part: string) => part.trim()).join(', ');
                setAddress(shortAddress);
            } else {
                setAddress('주소를 불러올 수 없습니다.');
            }
        } catch (error) {
            console.error("Reverse geocoding 에러:", error);
            setAddress('주소를 불러오는 중 오류가 발생했습니다.');
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
                    <Text style={styles.title}>지도에서 선택</Text>
                </View>
                <Text style={styles.subtitle}>지도를 움직여 아이콘을 원하는 위치로 옮기세요</Text>
            </View>
            
            {/* 검색 바 */}
            <MapLibreGL.MapView
                style={styles.map}
                mapStyle={MAP_STYLE_URL}
                onRegionDidChange={handleRegionChange}
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
                    zoomLevel={15}
                    centerCoordinate={centerCoord}
                />
            </MapLibreGL.MapView>

            {/* 중앙 고정 핀 */}
            <View style={styles.pinContainer}>
                <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }}
                    style={{ width: 35, height: 35 }}
                />
            </View>

            {/* 주소 표시 */}
            <View style={styles.addressBox}>
                <Text style={styles.addressText}>{address}</Text>
                <View style={styles.row}>
                    <Text style={styles.addressTwoText}>{address}</Text>
                    <TouchableOpacity onPress={copyToClipboard}>
                        <Text style={styles.copy}>
                        복사
                        </Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.placeText}>{place}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('MainScreen', { address })}>
                    <View style={styles.buttonview}>
                        <Text style={styles.buttonText}>선택</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}
export default RecommendMapScreen;

const styles = StyleSheet.create({
    topscreen: { 
        height: 137,
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
        fontSize: 12,
        paddingTop: 8,
        paddingLeft: 78,
    },
    pinContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginLeft: -17.5,
        marginTop: -35,
        zIndex: 10,
    },
    addressBox: {
        position: 'absolute',
        bottom: 0, // 바닥에 붙이기
        left: 0,
        right: 0,
        height: 183,
        backgroundColor: '#1B1B1B',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
    },
    addressText: {
        paddingLeft: 22,
        fontSize: 16,
        color: '#ffffff',
        fontWeight: '900',
        paddingTop: 7,
    },
    addressTwoText: {
        paddingLeft: 22,
        fontSize: 13,
        color: '#ffffff',
        fontWeight: '300',
        paddingTop: 6,
    },
    copy: {
        textDecorationLine: 'underline',
        fontSize: 13,
        color: '#ffffff',
        fontWeight: '300',
        paddingTop: 8,
        paddingLeft: 9,
    },
    placeText: {
        color: '#39FF14',
        fontSize: 11,
        paddingLeft: 22,
        paddingTop: 7,
        fontWeight: '600',
    },
    row:{
        flexDirection: 'row',
    },
    buttonview: {
        backgroundColor: '#39FF14',
        width: 350,
        height: 52,
        marginLeft: 16,
        borderRadius: 8,
        marginTop: 17,
    },
    buttonText: {
        fontSize: 18,
        color: '#000000',
        paddingLeft: 153,
        paddingTop: 16,
    },
});