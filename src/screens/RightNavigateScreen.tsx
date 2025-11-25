import React, { useEffect, useState, useRef, use } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import MapLibreGL, { UserTrackingMode } from '@maplibre/maplibre-react-native';
import type { CameraRef } from '@maplibre/maplibre-react-native';
import { Feature, LineString } from 'geojson';
import {WithLocalSvg} from 'react-native-svg/css';
import { useNavigateCtx } from './NavigateContext';

import line_active from '../assets/images/line_active.png';
const line = require('../assets/images/line.svg');
const start = require('../assets/images/start.svg');
const endpin = require('../assets/images/endpin.svg');
const run = require('../assets/images/run.svg');
const map_user = require('../assets/images/map_user.svg');

const { width, height } = Dimensions.get('window');
const MAP_STYLE_URL = 'https://api.maptiler.com/maps/streets-v2/style.json?key=QhGgr94B6Frh1kFgQHuB';

type RouteFeature = {
    type: "Feature";
    geometry: {
        type: "LineString";
        coordinates: number[][];
    };
    properties: Record<string, any>;
};
type Coordinate = [number, number];


const RightNavigateScreen = () => {
    const cameraRef = useRef<CameraRef>(null);

    const [routeGeoJson, setRouteGeoJson] = useState<Feature<LineString> | null>(null);
    const [originalCoords, setOriginalCoords] = useState<[number, number][]>([]);
    const [userLocation, setUserLocation] = useState<[number, number]>([126.5612, 33.4553]);
    const [percent, setPercent] = useState<number>(0);

    const { setUserlocation } = useNavigateCtx();
    /*  
    useEffect(() => {
        setRouteGeoJson({
            type: "Feature",
            geometry: {
                type: "LineString",
                coordinates: [
                    [
                        [126.5612, 33.4553],
                        [126.5612, 33.4600]
                    ],
                    [
                        [126.5622, 33.4573],
                        [126.5612, 33.4600]
                    ]
                ]
            },
            properties: {
                routeId: 1
            }
        } as const);
    }, []);
    */
    useEffect(() => {
        const coords: [number, number][] = [
            [126.5612, 33.4553],
            [126.5612, 33.4650],
            [126.5613, 33.4651],
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

    const handleMapPress = () => {
        if (!userLocation) return;

        const newLocation: [number, number] = [
            userLocation[0]- 0.00009,
            userLocation[1]+ 0.000005,
        ];
        setUserLocation(newLocation);
        
        console.log("목적지로 이동:", newLocation);
    };

    useEffect(() => {
        setUserlocation(userLocation);
    }, [userLocation]);

    const go = () => {
        setPercent(prev => Math.min(prev + 10, 100));
    };

    return (
        <View style={styles.container}>
            <View style={styles.topview}>
                <View style={{ position: 'relative' }}>
                    <WithLocalSvg
                        asset={line}
                        width={322}
                        height={3}
                        style={{marginTop: 109, marginLeft: 34}}
                    />
                    <WithLocalSvg
                        asset={start}
                        width={31}
                        height={35}
                        style={styles.start}
                    />
                    <TouchableOpacity style={styles.endpin} onPress={handleMapPress}>
                        <WithLocalSvg
                            asset={endpin}
                            width={30}
                            height={30}
                        />
                    </TouchableOpacity>
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
                            height: 7,
                            position: 'absolute',
                            top: 108,
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
                        <WithLocalSvg
                            asset={run}
                            width={35}
                            height={35}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.mapview}>
                <MapLibreGL.MapView style={{ flex: 1 }} mapStyle={MAP_STYLE_URL}>
                    {/* 카메라: 내 위치 따라가기 */}
                    <MapLibreGL.Camera
                        zoomLevel={19}
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
                            console.log("업데이트 되는 위치:", newPos);
                        }}
                    />
                    <MapLibreGL.PointAnnotation
                        id="userCursor"
                        coordinate={userLocation}
                    >
                        <View
                            style={{
                                width: 70,
                                height: 70,
                            }}
                        >
                            <WithLocalSvg
                                asset={map_user}
                                width={70}
                                height={70}
                            />
                        </View>
                    </MapLibreGL.PointAnnotation>
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
