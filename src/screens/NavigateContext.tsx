import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Feature, LineString } from "geojson";

export type Coordinate = [number, number];
export type race = {
  lap: number;
  time: string;
  pace: string;
  heartRate: number;
  power: number;
};

type TimeInterval = [number, number | null];
type ResponseData = {
  guidance_points?: { guidance_id?: string }[];
} | null;

interface NavigateContextType {
  userLocation: Coordinate | null;
  setUserlocation: (pos: Coordinate) => void;
  isRunning: boolean;
  coords: Coordinate[];
  setCoord: (c: Coordinate[]) => void;
  nextIndex: number;
  distance: [number, number][];
  totalDistance: number;
  timeIntervals: TimeInterval[];
  startTimer: () => void;
  stopTimer: () => void;
  addDistance: (meters: number) => void;
  pace: number;
  avgpace: number;
  lappace: number[];
  totalInfo: [number, number];
  setResponseData: (data: any) => void;
  setTotalInfo: (data: any) => void;
  percent: number;
  audio: string;
  kmAudio: number;
  routeGeoJson: Feature<LineString> | null;
  setRouteGeoJson: (data: any) => void;
  trimmedCoords: Coordinate[];
  setTrimmedCoords: (coords: Coordinate[]) => void;
  heading: number;
  setHeading: (h: number) => void;
  lastPoint: number;
  setLastPoint: (x: number) => void;
  setRaceInfo: (info: race[]) => void;
  raceInfo: race[];
  resetRunData: () => void;
}

const NavigateContext = createContext<NavigateContextType | null>(null);

// 두 GPS 좌표 사이의 실제 이동 거리(m)를 구합니다.
// 러닝 중 누적 거리, 랩 페이스, 안내 포인트 계산의 기준으로 사용됩니다.
function distanceMeters(c1: Coordinate, c2: Coordinate) {
  const R = 6371000;
  const lon1 = (c1[0] * Math.PI) / 180;
  const lat1 = (c1[1] * Math.PI) / 180;
  const lon2 = (c2[0] * Math.PI) / 180;
  const lat2 = (c2[1] * Math.PI) / 180;

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// pause / resume 이 가능한 구조라서 러닝 시간은 단일 숫자가 아니라
// 여러 구간의 시작/종료 시각 쌍으로 관리합니다.
// 이 헬퍼는 그 모든 구간을 합산해서 총 시간을 계산합니다.
function getTotalTime(timeIntervals: TimeInterval[]) {
  return timeIntervals.reduce((acc, [start, end]) => {
    const calcEnd = end ?? Date.now();
    return acc + (calcEnd - start);
  }, 0);
}

export function NavigateProvider({ children }: { children: ReactNode }) {
  // 서버에서 받아온 안내 포인트 원본 데이터입니다.
  const [responseData, setResponseData] = useState<ResponseData>(null);
  // [전체 포인트 수, 전체 경로 거리] 형태로 사용 중입니다.
  const [totalInfo, setTotalInfo] = useState<[number, number]>([0, 0]);
  // 전체 경로 중 현재 얼마나 진행했는지 퍼센트로 표시합니다.
  const [percent, setPercent] = useState<number>(0);

  // 러닝 시작/정지 구간을 모두 저장해서 총 시간을 계산합니다.
  const [timeIntervals, setTimeIntervals] = useState<TimeInterval[]>([]);
  // 현재 코드에서는 외부 화면과의 호환을 위해 유지되는 값입니다.
  const [pace, setPace] = useState(0);

  // 현재 사용자 좌표와 안내 경로 좌표 배열입니다.
  const [userLocation, setUserlocation] = useState<Coordinate | null>(null);
  const [coords, setCoord] = useState<Coordinate[]>([]);

  // 실제 러닝 타이머가 동작 중인지 나타냅니다.
  const [isRunning, setIsRunning] = useState(false);

  // 누적 이동 거리와 각 위치 업데이트 시점의 거리 기록입니다.
  const [totalDistance, setTotalDistance] = useState(0);
  const [distance, setDistance] = useState<[number, number][]>([]);
  // 이전 좌표와 현재 좌표 차이로 이동 거리를 계산하기 위해 보관합니다.
  const [prevLocation, setPrevLocation] = useState<Coordinate | null>(null);

  // 다음 안내 포인트 인덱스와 이미 지나간 포인트 기록입니다.
  const [nextIndex, setNextIndex] = useState(1);
  const [passedIndexes, setPassedIndexes] = useState<number[]>([]);
  // 15m/직전 알람이 중복 재생되지 않도록 제어하는 값입니다.
  const [alam_15m, setAlam_15m] = useState(1);
  // 마지막으로 km 오디오를 재생한 km 지점을 기억합니다.
  const [lastPaceKm, setLastPaceKm] = useState(0);

  // 누적 평균 페이스와 랩별 페이스 배열입니다.
  const [avgpace, setAvgPace] = useState<number>(0);
  const [lappace, setLapPace] = useState<number[]>([]);
  // 현재 랩 인덱스 역할을 합니다.
  const [lab, setLab] = useState(0);

  // 현재 재생해야 할 방향 안내 audio key 와 km 알림 숫자입니다.
  const [audio, setAudio] = useState<string>("");
  const [kmAudio, setKmAudio] = useState<number>(0);

  // 지도에 그릴 전체 경로와 잘린 경로, 그리고 방향 관련 상태입니다.
  const [routeGeoJson, setRouteGeoJson] = useState<Feature<LineString> | null>(null);
  const [trimmedCoords, setTrimmedCoords] = useState<Coordinate[]>([]);
  const [heading, setHeading] = useState(0);
  const [lastPoint, setLastPoint] = useState(0);
  // 좌측 페이지에서 보여줄 랩 기록입니다.
  const [raceInfo, setRaceInfo] = useState<race[]>([]);

  useEffect(() => {
    console.log("lab 업데이트 됨");
  }, [raceInfo]);

  useEffect(() => {
    console.log("responceData 변경됨:");
  }, [responseData]);

  // 위치가 한 번 갱신될 때마다:
  // 1. 이전 좌표와의 차이로 이동 거리 계산
  // 2. 총 거리 누적
  // 3. 1km 단위 오디오 트리거 체크
  // 4. 현재 랩의 페이스 계산
  // 를 한 번에 처리합니다.
  // 이전 코드에서는 totalDistance가 여러 effect에서 중복 증가하고 있었습니다.
  useEffect(() => {
    if (!isRunning || !prevLocation || !userLocation) {
      // 러닝이 시작된 직후 첫 위치 업데이트는 비교 기준 좌표만 잡고 끝냅니다.
      if (isRunning) {
        setPrevLocation(userLocation);
      }
      return;
    }

    const diff = distanceMeters(prevLocation, userLocation);

    if (diff <= 0) {
      setPrevLocation(userLocation);
      return;
    }

    setDistance(prev => [...prev, [Date.now(), diff]]);
    setTotalDistance(prev => {
      const newTotal = prev + diff;
      const currentKm = Math.floor(newTotal / 1000);

      // 정수 km 구간을 처음 통과한 순간에만 km 알림을 갱신합니다.
      if (currentKm > lastPaceKm) {
        setKmAudio(currentKm);
        setLastPaceKm(currentKm);
      }

      return newTotal;
    });

    if (timeIntervals.length > 0) {
      const [start, end] = timeIntervals[timeIntervals.length - 1];
      const segmentTime = (end ?? Date.now()) - start;

      // 현재 랩 구간의 "분 / km" 값을 계산해서 lappace 배열의
      // 현재 lab 인덱스 위치에 덮어씁니다.
      if (segmentTime > 0) {
        const segmentMinutes = segmentTime / 60000;
        const km = diff / 1000;
        const lapPaceValue = Number((segmentMinutes / km).toFixed(2));

        setLapPace(prev => {
          const newLapPace = [...prev];
          newLapPace[lab] = lapPaceValue;
          return newLapPace;
        });
      }
    }

    setPrevLocation(userLocation);
  }, [userLocation, isRunning, prevLocation, lastPaceKm, timeIntervals, lab]);

  // 1초마다 평균 페이스와 전체 진행률을 갱신합니다.
  // 거리 계산은 위치 업데이트 effect에서 끝내고,
  // 여기서는 이미 모아둔 값들을 화면용 수치로 변환만 합니다.
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const totaltime = getTotalTime(timeIntervals);
      const totalMinutes = totaltime / 60000;
      const totalKm = totalDistance / 1000;

      console.log("누적 페이스 계산용 총 시간:", totalMinutes, "총 거리(km):", totalKm);

      if (totalKm > 0) {
        const avgPace = totalMinutes / totalKm;
        setAvgPace(Number(avgPace.toFixed(2)));
      }

      // totalInfo[1]은 전체 경로 거리(m)라고 가정하고 percent를 계산합니다.
      if (totalInfo[1] > 0) {
        const nextPercent = Math.round((totalDistance / totalInfo[1]) * 100);
        setPercent(nextPercent);
        console.log("움직인 %:", nextPercent);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, totalDistance, timeIntervals, totalInfo]);

  // 사용자가 다음 안내 포인트에 얼마나 가까워졌는지 계산해서
  // 50m / 15m / 직전 / 도착 알림 상태를 처리합니다.
  useEffect(() => {
    if (!userLocation || coords.length < 2) return;

    const nextPoint = coords[nextIndex];
    if (!nextPoint || nextIndex === 0) return;

    const guidanceList = responseData?.guidance_points ?? [];
    const guidanceId = guidanceList[nextIndex]?.guidance_id ?? "";
    const isPassed = passedIndexes.includes(nextIndex);

    if (nextIndex >= coords.length - 1) {
      console.log("종로지점만을 앞두고 있습니다.", coords, nextIndex);
    }

    const totaldist = distanceMeters(coords[nextIndex - 1], coords[nextIndex]);
    const dist = Math.floor(distanceMeters(userLocation, nextPoint));

    console.log(`다음 포인트까지 거리: ${dist}m 그리고 현재 index: ${nextIndex}`);

    if (isPassed) return;

    // 긴 구간에서는 50m 안내를 먼저 발생시킵니다.
    if (totaldist >= 50 && dist === 50) {
      setAudio(guidanceId);
      Alarm_50m();
      return;
    }

    // 15m 지점 안내
    if (dist === 15) {
      Alarm_15m();
      setAlam_15m(i => i + 1);
      return;
    }

    // 15m를 지나친 경우 마지막 임박 안내
    if (dist < 15 && alam_15m === nextIndex) {
      Alarm_m();
      setAlam_15m(i => i + 1);
    }

    // 포인트에 도달하면 다음 포인트로 이동합니다.
    if (dist === 0) {
      setNextIndex(i => i + 1);
      setPassedIndexes(prev => [...prev, nextIndex]);
    }
  }, [userLocation, coords, nextIndex, responseData, passedIndexes, alam_15m]);

  const startTimer = () => {
    const now = Date.now();
    // 새 러닝 구간 시작: [시작시각, 아직 종료 안 됨]
    setTimeIntervals(prev => [...prev, [now, null]]);
    setIsRunning(true);
    // 첫 위치 업데이트를 새 기준점으로 잡기 위해 초기화합니다.
    setPrevLocation(null);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setTimeIntervals(prev => {
      if (prev.length === 0) return prev;

      const lastIndex = prev.length - 1;
      const lastInterval = prev[lastIndex];

      if (lastInterval[1] !== null) return prev;

      const updated = [...prev];
      // 현재 진행 중이던 마지막 구간에 종료 시각을 기록합니다.
      updated[lastIndex] = [lastInterval[0], Date.now()];
      return updated;
    });
    // 다음 start 시 새로운 랩 인덱스를 쓰도록 증가시킵니다.
    setLab(prev => prev + 1);
  };

  const addDistance = (meters: number) => {
    setTotalDistance(prev => prev + meters);
  };

  function Alarm_50m() {
    console.log("50m 후 turn");
  }

  function Alarm_15m() {
    console.log("15m 후 turn");
  }

  function Alarm_m() {
    console.log("곧 turn");
  }

  function Alarm_km(km: number) {
    console.log(`${km}km 달성!`);
  }

  // kmAudio 값이 변경되었을 때만 km 달성 이벤트를 따로 처리합니다.
  useEffect(() => {
    if (kmAudio > 0) {
      Alarm_km(kmAudio);
    }
  }, [kmAudio]);

  const resetRunData = () => {
    // 다음 러닝 세션이 이전 상태를 물고 가지 않도록
    // 러닝 중 계산되는 값들을 한 번에 초기화합니다.
    setTotalInfo([0, 0]);
    setAvgPace(0);
    setTimeIntervals([]);
    setRaceInfo([]);
    setTotalDistance(0);
    setDistance([]);
    setPrevLocation(null);
    setNextIndex(1);
    setPassedIndexes([]);
    setAlam_15m(1);
    setLastPaceKm(0);
    setLapPace([]);
    setLab(0);
    setAudio("");
    setKmAudio(0);
    setPercent(0);
  };

  return (
    <NavigateContext.Provider
      value={{
        userLocation,
        setUserlocation,
        isRunning,
        distance,
        totalDistance,
        coords,
        setCoord,
        nextIndex,
        avgpace,
        lappace,
        timeIntervals,
        startTimer,
        stopTimer,
        addDistance,
        pace,
        totalInfo,
        setResponseData,
        setTotalInfo,
        percent,
        audio,
        kmAudio,
        routeGeoJson,
        setRouteGeoJson,
        trimmedCoords,
        setTrimmedCoords,
        heading,
        setHeading,
        lastPoint,
        setLastPoint,
        raceInfo,
        setRaceInfo,
        resetRunData,
      }}
    >
      {children}
    </NavigateContext.Provider>
  );
}

export function useNavigateCtx() {
  const ctx = useContext(NavigateContext);
  if (!ctx) throw new Error("NavigateContext not found");
  return ctx;
}
