import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import MapLibreGL, { UserTrackingMode } from "@maplibre/maplibre-react-native";
import type { CameraRef } from "@maplibre/maplibre-react-native";
import { Feature, LineString } from "geojson";
import { WithLocalSvg } from "react-native-svg/css";
import { useNavigateCtx } from "./NavigateContext";

//import line_active from '../assets/images/line_active.png';
const line = require("../assets/images/line.svg");
const start = require("../assets/images/start.svg");
const endpin = require("../assets/images/endpin.svg");
const round_4 = require("../assets/images/round_4.svg");
const allow_navigate = require("../assets/images/allow_navigate.svg");
const run = require("../assets/images/run.svg");
const map_user = require("../assets/images/map_user.svg");

const MAP_STYLE_URL =
  "https://api.maptiler.com/maps/streets-v2/style.json?key=QhGgr94B6Frh1kFgQHuB";
type Coordinate = [number, number];

const MainNavigateScreen = () => {
  const {
    userLocation,
    coords,
    routeGeoJson,
    setRouteGeoJson,
    percent,
    totalDistance,
    avgpace,
    trimmedCoords,
    heading,
    lastPoint,
  } = useNavigateCtx();

  const [originalCoords, setOriginalCoords] = useState<[number, number][]>([]);
  //const [userLocation, setUserLocation] = useState<[number, number]>([
//     126.5312442, 33.4996213,
//   ]);
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

    const minutes = Math.floor(pace); // 분
    const seconds = Math.round((pace - minutes) * 60); // 초

    const paddedSeconds = seconds.toString().padStart(2, "0");

    return `${minutes}'${paddedSeconds}\"`;
  }

  const pace = avgpace ? formatPace(avgpace) : "0'00\"";
  const kcal = 0;
  const runway = 0;
  const BPM = 0;
  const navigatetext = "다음 안내까지 직진";

  const cameraRef = useRef<CameraRef>(null);
  //const [routeGeoJson, setRouteGeoJson] = useState<Feature<LineString> | null>(null);

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

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.mapview}>
          <MapLibreGL.MapView
            style={{ flex: 1 }}
            mapStyle={MAP_STYLE_URL}
            scrollEnabled={false} // 지도 스크롤 금지
            zoomEnabled={false} // 줌 금지
            rotateEnabled={false} // 회전 금지
            pitchEnabled={false} // 기울기 금지
          >
            {/* 카메라: 내 위치 따라가기 */}
            <MapLibreGL.Camera
              zoomLevel={17}
              centerCoordinate={userLocation ?? [0, 0]} // 제주대 기본값
              // followUserLocation={true}
              followUserMode={UserTrackingMode.Follow}
              animationDuration={300}
              heading={heading}
              animationMode="easeTo"
            />

            {routeGeoJson && (
              <MapLibreGL.ShapeSource id="routeSource" shape={routeGeoJson}>
                <MapLibreGL.LineLayer
                  id="routeLayer"
                  style={{
                    lineWidth: 14,
                    lineColor: "#39FF14",
                    lineJoin: "round",
                    lineCap: "round",
                  }}
                />
              </MapLibreGL.ShapeSource>
            )}

            {/* 현재 위치 표시 */}
            <MapLibreGL.UserLocation
              visible={false}
              showsUserHeadingIndicator={false}
              //onUpdate={handleUserLocationUpdate}
            />

            <MapLibreGL.PointAnnotation
              id="userCursor"
              coordinate={userLocation ?? [0, 0]}
            >
              <View
                style={{
                  width: 58,
                  height: 58,
                }}
              >
                <WithLocalSvg asset={map_user} width={50} height={50} />
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
            style={{ marginTop: 30 }}
          />
        </View>
      </View>
      <View style={styles.parentview}>
        <WithLocalSvg
          asset={round_4}
          width={393}
          height={98}
          style={{ marginLeft: 1 }}
        />
        <WithLocalSvg
          asset={line}
          width={322}
          height={3}
          style={{
            position: "absolute",
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
            color: "#39FF14",
            fontWeight: "700",
            position: "absolute",
            top: 55,
            left: 37 + 145 * (percent / 100),
          }}
        >
          {percent}%
        </Text>
        <View
          style={{
            width: 325 * (percent / 100),
            height: 5,
            backgroundColor: "#39FF14",
            position: "absolute",
            top: 72,
            left: 36,
          }}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 43,
            left: 28 + 320 * (percent / 100),
          }}
        >
          <WithLocalSvg asset={run} width={35} height={35} />
        </TouchableOpacity>
      </View>
      <View style={styles.infoview}>
        <View style={[styles.info, { paddingTop: 44 }]}>
          <Text style={styles.infotext}>{km}</Text>
          <Text style={styles.infotext}>{pace}</Text>
          <Text style={styles.infotext}>{time}</Text>
        </View>
        <View style={[styles.info, { paddingTop: 1 }]}>
          <Text style={styles.infotexts}>km</Text>
          <Text style={styles.infotexts}>평균 페이스</Text>
          <Text style={styles.infotexts}>시간</Text>
        </View>
        <View style={[styles.info, { paddingTop: 29 }]}>
          <Text style={styles.infotext}>{kcal}</Text>
          <Text style={styles.infotext}>{runway}</Text>
          <Text style={styles.infotext}>{BPM}</Text>
        </View>
        <View style={[styles.info, { paddingTop: 3 }]}>
          <Text style={styles.infotexts}>kcal</Text>
          <Text style={[styles.infotexts, { paddingTop: 1 }]}>경사</Text>
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
    backgroundColor: "#141414",
  },
  mapview: {
    width: 259,
    height: 266,
    borderRadius: 4,
    borderWidth: 3,
    borderColor: "#ffffff",
    marginTop: 62,
  },
  navigateview: {
    width: 130,
    height: 266,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ffffff",
    marginTop: 62,
    marginLeft: 4,
    backgroundColor: "#1B1B1B",
    alignItems: "center",
  },
  navigatetext: {
    color: "#39FF14",
    fontSize: 16,
    fontWeight: "400",
    width: 90,
    textAlign: "center",
    paddingTop: 40,
  },
  navigateimage: {},
  parentview: {
    width: "100%",
    height: 109,
    marginTop: 12,
    backgroundColor: "#1B1B1B",
  },
  start: {
    position: "absolute",
    top: 43,
    left: 27,
  },
  endpin: {
    position: "absolute",
    top: 40,
    right: 21,
  },
  infoview: {
    width: "100%",
    height: 242,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ffffff",
    backgroundColor: "#1B1B1B",
  },
  info: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
  },
  infotext: {
    fontSize: 36,
    fontWeight: "700",
    color: "#ffffff",
    width: 123,
    textAlign: "center",
    paddingLeft: 0,
  },
  infotexts: {
    fontSize: 14,
    fontWeight: "500",
    color: "#ffffff",
    width: 123,
    textAlign: "center",
  },
});
