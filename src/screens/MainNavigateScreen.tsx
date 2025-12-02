import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import MapLibreGL, { UserTrackingMode } from '@maplibre/maplibre-react-native';
import type { CameraRef } from '@maplibre/maplibre-react-native';
import { Feature, LineString } from 'geojson';
import {WithLocalSvg} from 'react-native-svg/css';
import { useNavigateCtx } from "./NavigateContext";

import line_active from '../assets/images/line_active.png';
const line = require('../assets/images/line.svg');
const start = require('../assets/images/start.svg');
const endpin = require('../assets/images/endpin.svg');
const round_4 = require('../assets/images/round_4.svg');
const allow_navigate = require('../assets/images/allow_navigate.svg');
const run = require('../assets/images/run.svg');
const map_user = require('../assets/images/map_user.svg');

const MAP_STYLE_URL = 'https://api.maptiler.com/maps/streets-v2/style.json?key=QhGgr94B6Frh1kFgQHuB';
type Coordinate = [number, number];

const MainNavigateScreen = () => {
    const { totalDistance } = useNavigateCtx();
    const { avgpace } = useNavigateCtx();

    const km = (totalDistance / 1000).toFixed(2);
    const [time, setTime] = useState("00:00");

    const { timeIntervals } = useNavigateCtx();
    const formatTime = (ms: number) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;

        const pad = (n: number) => String(n).padStart(2, "0");

        return `${pad(minutes)}:${pad(seconds)}`;
    };

    useEffect(() => {
        const updateTime = () => {
            const total = timeIntervals.reduce((acc, [start, end]) => {
                const effectiveEnd = end ?? Date.now();
                return acc + (effectiveEnd - start);
            }, 0);

            setTime(formatTime(total));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, [timeIntervals]);

    function formatPace(pace: number) {
        if (!pace || pace <= 0) return "0'00\"/KM";

        const minutes = Math.floor(pace);            // 분
        const seconds = Math.round((pace - minutes) * 60); // 초

        const paddedSeconds = seconds.toString().padStart(2, '0');

        return `${minutes}'${paddedSeconds}\"`;
    }

    const pace = avgpace ? formatPace(avgpace) : "0\'00\"";
    const kcal = 13;
    const runway = 2;
    const BPM = 145;
    const navigatetext = "다음 안내까지 직진";

    const [percent, setPercent] = useState<number>(0);
    const cameraRef = useRef<CameraRef>(null);
    const [routeGeoJson, setRouteGeoJson] = useState<Feature<LineString> | null>(null);
    const [originalCoords, setOriginalCoords] = useState<[number, number][]>([]);
    const [userLocation, setUserLocation] = useState<[number, number]>([126.5612, 33.4553]);

    const go = () => {
        setPercent(prev => Math.min(prev + 10, 100)); // 10 증가, 최대 100
    };

    useEffect(() => {
        const coords: [number, number][] = [
            [126.5612, 33.4553],
            [126.5612, 33.4600],
            [126.4800, 33.4700],
            [126.5312, 33.4997]
        ];
    
        setOriginalCoords(coords);
        setRouteGeoJson({
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: coords,
            },
            properties: {}
        });
    }, []);

    function closestPointOnSegment(p: Coordinate, a: Coordinate, b: Coordinate): Coordinate {
        const px = p[0], py = p[1];
        const ax = a[0], ay = a[1];
        const bx = b[0], by = b[1];
    
        const ABx = bx - ax;
        const ABy = by - ay;
        const APx = px - ax;
        const APy = py - ay;
    
        const ab2 = ABx * ABx + ABy * ABy;
            if (ab2 === 0) {
                // A와 B가 동일한 점인 경우 A를 반환
                return [ax, ay];
            }
    
        const ap_ab = APx * ABx + APy * ABy;
        let t = ap_ab / ab2;
        t = Math.max(0, Math.min(1, t)); // clamp to [0,1]
    
        return [ax + ABx * t, ay + ABy * t];
    }
    
    function euclideanDistance(a: Coordinate, b: Coordinate): number {
        const dx = a[0] - b[0];
        const dy = a[1] - b[1];
        return Math.sqrt(dx * dx + dy * dy);
    }
    
    function findClosestPointOnPath(
        userPos: Coordinate,
        coords: Coordinate[]
    ): { closest: Coordinate | null; closestSegmentIndex: number; distance: number } {
        if (!coords || coords.length === 0) {
            return { closest: null, closestSegmentIndex: -1, distance: Infinity };
        }
        if (coords.length === 1) {
            const dist = euclideanDistance(userPos, coords[0]);
            return { closest: coords[0], closestSegmentIndex: 0, distance: dist };
        }
    
        let closest: Coordinate | null = null;
        let minDist = Infinity;
        let closestSegmentIndex = 0;
    
        for (let i = 0; i < coords.length - 1; i++) {
            const a = coords[i];
            const b = coords[i + 1];
            const cp = closestPointOnSegment(userPos, a, b);
            const dist = euclideanDistance(cp, userPos);
            if (dist < minDist) {
                minDist = dist;
                closest = cp;
                closestSegmentIndex = i;
            }
        }
    
        return { closest, closestSegmentIndex, distance: minDist };
    }
    
    function trimPathToClosestPoint(
        userPos: Coordinate,
        coords: Coordinate[]
    ): Coordinate[] {
        if (!coords || coords.length === 0) return [];
        if (coords.length === 1) return coords;
    
        const { closest, closestSegmentIndex } = findClosestPointOnPath(userPos, coords);
    
        if (!closest) return coords.slice(); // 안전장치
    
        // 새 경로: closest (스냅점) + 원래 coords의 (closestSegmentIndex + 1) 이후 점들
        const newCoords: Coordinate[] = [closest, ...coords.slice(closestSegmentIndex + 1)];
    
        // (선택) 만약 newCoords의 첫 점이 원래 coords[closestSegmentIndex+1]과 거의 같다면
        // 중복 방지를 위해 조정할 수 있음. 여기서는 그대로 반환.
        return newCoords;
    }
    
    const [lastUserLocation, setLastUserLocation] = useState<[number, number] | null>(null);
    const [heading, setHeading] = useState(0);
    
    function getHeading(from: [number, number], to: [number, number]): number {
        const lon1 = (from[0] * Math.PI) / 180;
        const lat1 = (from[1] * Math.PI) / 180;
        const lon2 = (to[0] * Math.PI) / 180;
        const lat2 = (to[1] * Math.PI) / 180;
    
        const dLon = lon2 - lon1;
    
        const y = Math.sin(dLon) * Math.cos(lat2);
        const x =
            Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    
        const brng = Math.atan2(y, x);
        return ((brng * 180) / Math.PI + 360) % 360; // 0~360°
    }
    
    useEffect(() => {
        console.log("main 현재 위치:", userLocation);
        if (!userLocation || originalCoords.length < 2) return;
    
        const updated = trimPathToClosestPoint(userLocation, originalCoords);
        setOriginalCoords(updated);
    
        setRouteGeoJson({
            type: "Feature",
            geometry: { type: "LineString", coordinates: updated },
            properties: {}
        });
    
        if (lastUserLocation) {
            const newHeading = getHeading(lastUserLocation, userLocation);
            setHeading(newHeading);
        }
    
        setLastUserLocation(userLocation);
    }, [userLocation]);
    
    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'}}>
                <View style={styles.mapview}>
                    <MapLibreGL.MapView 
                        style={{ flex: 1 }} 
                        mapStyle={MAP_STYLE_URL}
                        scrollEnabled={false}     // 지도 스크롤 금지
                        zoomEnabled={false}       // 줌 금지
                        rotateEnabled={false}     // 회전 금지
                        pitchEnabled={false}      // 기울기 금지
                    >
                        {/* 카메라: 내 위치 따라가기 */}
                        <MapLibreGL.Camera
                            zoomLevel={16}
                            centerCoordinate={userLocation} // 제주대 기본값
                            // followUserLocation={true}
                            followUserMode={UserTrackingMode.Follow}
                            animationDuration={300}
                            heading={heading}
                            animationMode="easeTo"
                        />

                        {routeGeoJson && (
                            <MapLibreGL.ShapeSource
                                id="routeSource"
                                shape={routeGeoJson}
                            >
                                <MapLibreGL.LineLayer
                                    id="routeLayer"
                                    style={{
                                        lineWidth: 14,
                                        lineColor: "#39FF14",
                                        lineJoin: "round",
                                        lineCap: "round"
                                    }}
                                />
                            </MapLibreGL.ShapeSource>
                            )}
                    
                        {/* 현재 위치 표시 */}
                        <MapLibreGL.UserLocation
                            visible={false}
                            showsUserHeadingIndicator={true}
                            onUpdate={(location) => {
                                const { longitude, latitude } = location.coords;
                                const newPos: [number, number] = [longitude, latitude];

                                setUserLocation(newPos);
                                const updatedPath = trimPathToClosestPoint(newPos, originalCoords);
                                setOriginalCoords(updatedPath);
                                setRouteGeoJson({
                                    type: "Feature",
                                    geometry: {
                                        type: "LineString",
                                        coordinates: updatedPath,
                                    },
                                    properties: {}
                                });
                                // cameraRef.current?.setCamera({
                                //     centerCoordinate: newPos,
                                //     animationDuration: 500,
                                // });
                                console.log("main 현재 위치:", newPos);
                            }}
                        />

                        <MapLibreGL.PointAnnotation
                            id="userCursor"
                            coordinate={userLocation}
                        >
                            <View
                                style={{
                                    width: 50,
                                    height: 50,
                                }}
                            >
                                <WithLocalSvg
                                    asset={map_user}
                                    width={50}
                                    height={50}
                                />
                            </View>
                        </MapLibreGL.PointAnnotation>
                    </MapLibreGL.MapView>
                </View>
                <View style={styles.navigateview}>
                    <Text style={styles.navigatetext}>{navigatetext}</Text>
                    <WithLocalSvg
                        asset={allow_navigate}
                        width={48.79}
                        height={100}
                        style={{marginTop: 30}}
                    />
                </View>
            </View>
            <View style={styles.parentview}>
                <WithLocalSvg
                        asset={round_4}
                        width={393}
                        height={98}
                        style={{marginLeft: 1}}
                    />
                <WithLocalSvg
                    asset={line}
                    width={322}
                    height={3}
                    style={{
                        position: 'absolute',
                        top: 73,
                        left: 35,
                    }}
                />
                <WithLocalSvg
                    asset={start}
                    width={31}
                    height={35}
                    style={styles.start}
                />
                <WithLocalSvg
                    asset={endpin}
                    width={30}
                    height={30}
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
                        width: 320*(percent/100),
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
                    <WithLocalSvg
                        asset={run}
                        width={35}
                        height={35}
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
        position: 'absolute',
        top: 43,
        left: 27,
    },
    endpin:{
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
