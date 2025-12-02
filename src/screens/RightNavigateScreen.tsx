import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Image, TouchableOpacity, Text } from 'react-native';
import MapLibreGL, { UserTrackingMode } from '@maplibre/maplibre-react-native';
//import type { cameraRef } from '@maplibre/maplibre-react-native';
import { Feature, LineString } from 'geojson';
import {WithLocalSvg} from 'react-native-svg/css';
import { useNavigateCtx } from './NavigateContext';

import line_active from '../assets/images/line_active.png';
const line = require('../assets/images/line.svg');
const start = require('../assets/images/start.svg');
const endpin = require('../assets/images/endpin.svg');
const run = require('../assets/images/run.svg');
const map_user = require('../assets/images/map_user.svg');

const MAP_STYLE_URL = 'https://api.maptiler.com/maps/streets-v2/style.json?key=QhGgr94B6Frh1kFgQHuB';

type Coordinate = [number, number];

const RightNavigateScreen = () => {
    const { setUserlocation, coords, routeGeoJson, setRouteGeoJson , percent } = useNavigateCtx();

    const [originalCoords, setOriginalCoords] = useState<[number, number][]>([]);
    const [userLocation, setUserLocation] = useState<[number, number]>([126.5612, 33.4553]);
    const [lastPoint, setLastPoint] = useState(0);

    let lineCoords: Coordinate[] = [];

    //const [coord, setCoord] = useState<Coordinate[]>([]);
    //const [routeGeoJsons, setRouteGeoJsons] = useState<Feature<LineString> | null>(null);

    // useFocusEffect(() => {
    //     async function start() {
    //         console.log("아오");
    //         await loadRouteData("temp_abc123"); // 서버 요청 + 캐싱
    //         console.log("캐시된 guidancePoints:", voiceCache.getGuidancePoints());

    //         // 경로 넘기기
    //         setResponseData(voiceCache.getGuidancePoints());
    //         const coords: Coordinate[] = voiceCache.getGuidancePoints().map(
    //             (p): Coordinate => [p.lng, p.lat]
    //         );

    //         // 총거리, 총 경로 포인트 넘기기
    //         setTotalInfo(voiceCache.getGuidanceTotalInfo());

    //         console.log("right 성공적으로 서버 통신 성공:", coords);
    //         setCoord(coords);
    //         setCoords(coords);
    //     }
    //     console.log('useEffect 실행');
    //     start();

    //     setOriginalCoords(coords);
    //     console.log('경로 get');
    //     setRouteGeoJson({
    //         type: "Feature",
    //         geometry: {
    //             type: "LineString",
    //             coordinates: coords,
    //         },
    //         properties: {}
    //     });
    //     console.log('루트 로딩됨?');
    // }, []);

    // useEffect(() => {
    //     setCoord(coords);
    //     console.log('경로 업데이트',coord);
    //     setRouteGeoJsons(routeGeoJson);
    //     console.log('루트 제이슨 업데이트',routeGeoJsons);
    //     if (coords.length >= 2) {
    //         console.log("rightnavigate coord:", coord); // 최신 coords
    //     }
    // }, [coords]);

    useEffect(() => {
        if (coords.length > 1) {
        setOriginalCoords(coords);
        setRouteGeoJson({
            type: "Feature",
            geometry: { type: "LineString", coordinates: coords },
            properties: {},
        });
        }
    }, [coords]);

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
            return [ax, ay];
        }

        const ap_ab = APx * ABx + APy * ABy;
        let t = ap_ab / ab2;
        t = Math.max(0, Math.min(1, t));

        return [ax + ABx * t, ay + ABy * t];
    }

    function euclideanDistance(a: Coordinate, b: Coordinate): number {
        const dx = a[0] - b[0];
        const dy = a[1] - b[1];
        return Math.sqrt(dx * dx + dy * dy);
    }

    function findClosestPointOnPath(
        userPos: Coordinate,
        coord: Coordinate[]
    ): { closest: Coordinate | null; closestSegmentIndex: number; distance: number } {
        if (!coord || coord.length === 0) {
            return { closest: null, closestSegmentIndex: -1, distance: Infinity };
        }
        if (coord.length === 1) {
            const dist = euclideanDistance(userPos, coord[0]);
            return { closest: coord[0], closestSegmentIndex: 0, distance: dist };
        }

        let closest: Coordinate | null = null;
        let minDist = Infinity;
        let closestSegmentIndex = 0;

        for (let i = 0; i < coord.length - 1; i++) {
            const a = coord[i];
            const b = coord[i + 1];
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
        coord: Coordinate[]
    ): Coordinate[] {
        if (!coord || coord.length === 0) return [];
        if (coord.length === 1) return coord;

        const { closest, closestSegmentIndex } = findClosestPointOnPath(userPos, coords);

        if (!closest) return coord.slice(); // 안전장치

        const newCoords: Coordinate[] = [closest, ...coord.slice(closestSegmentIndex + 1)];

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
        if (!userLocation || originalCoords.length < 2) {
            if (originalCoords.length === 1 && lastPoint === 0) {
                // 마지막 점만 남았을 때 사용자 위치에서 연결
                setLastPoint(0);
                lineCoords = [userLocation, originalCoords[0]];
                console.log('마지막 포인트',originalCoords[0])
                setRouteGeoJson({
                    type: "Feature",
                    geometry: { type: "LineString", coordinates: lineCoords },
                    properties: {}
                });
                console.log('마지막 routegeojson: ', lineCoords,'마지막 사용자 위치:',userLocation);

                 if (lastUserLocation) {
                    const newHeading = getHeading(lastUserLocation, userLocation);
                    setHeading(newHeading);
                }

                setLastUserLocation(userLocation);
                return
            } else {
                if (userLocation === originalCoords[0]) {
                    setLastPoint(1);
                }
                return
            }

        };


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

    const handleUserLocationUpdate = (location: { coords: { latitude: number; longitude: number } }) => {
        const { longitude, latitude } = location.coords;
        const newPos: Coordinate = [longitude, latitude];

        setUserLocation(newPos);

        if (originalCoords.length < 2) return;

        // 현재 위치 기준으로 경로 트리밍
        const updatedPath = trimPathToClosestPoint(newPos, originalCoords);
        setOriginalCoords(updatedPath);

        // GeoJSON 업데이트
        setRouteGeoJson({
            type: "Feature",
            geometry: { type: "LineString", coordinates: updatedPath },
            properties: {},
        });

        // heading 계산
        if (lastUserLocation) {
            const newHeading = getHeading(lastUserLocation, newPos);
            setHeading(newHeading);
        }
        console.log("heading 업데이트: ", heading)
        setLastUserLocation(newPos);
    };

    const handleMapPress = () => {
        if (!userLocation) return;

        const newLocation: [number, number] = [
            userLocation[0] +0.00001,
            userLocation[1] +0.00001,
            //[=126.5312442, =33.4996213][합: -0.0299558, +0.0443213] +0.00001
        ];
        setUserLocation(newLocation);
    };

    useEffect(() => {
        setUserlocation(userLocation);
    }, [userLocation]);

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
                    <View
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
                    </View>
                </View>
            </View>
            <View style={styles.mapview}>
                <MapLibreGL.MapView style={{ flex: 1 }} mapStyle={MAP_STYLE_URL}>
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
                        onUpdate={handleUserLocationUpdate}
                        // onUpdate={(location) => {
                        //     const { longitude, latitude } = location.coords;
                        //     const newPos: [number, number] = [longitude, latitude];

                        //     setUserLocation(newPos);
                        //     const updatedPath = trimPathToClosestPoint(newPos, originalCoords);
                        //     setOriginalCoords(updatedPath);
                        //     setRouteGeoJson({
                        //         type: "Feature",
                        //         geometry: {
                        //             type: "LineString",
                        //             coordinates: updatedPath,
                        //         },
                        //         properties: {}
                        //     });
                        //     console.log("지오제이슨:", routeGeoJson);
                        //     // cameraRef.current?.setCamera({
                        //     //     centerCoordinate: newPos,
                        //     //     animationDuration: 500,
                        //     // });
                        //     //console.log("업데이트 되는 위치:", newPos);
                        // }}
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
