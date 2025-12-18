import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Feature, LineString } from 'geojson';

// 타입 ----------------------------------------------------
export type Coordinate = [number, number];
export type race = {
  lap: number;
  time: string;
  pace: string;
  heartRate: number;
  power: number;
};


interface NavigateContextType {
  userLocation: Coordinate | null;
  setUserlocation: (pos: Coordinate) => void;

  isRunning: boolean;

  coords: Coordinate[];
  setCoord: (c: Coordinate[]) => void;
  nextIndex: number;

  distance: [number, number][];
  totalDistance: number;
  timeIntervals: [number, number | null][];
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


// 거리 계산 함수 --------------------------------------------
function distanceMeters(c1: Coordinate, c2: Coordinate) {
    const R = 6371000;
    const lon1 = c1[0] * Math.PI / 180;
    const lat1 = c1[1] * Math.PI / 180;
    const lon2 = c2[0] * Math.PI / 180;
    const lat2 = c2[1] * Math.PI / 180;

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;

    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) *
        Math.sin(dLon / 2) ** 2;

    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

// Provider --------------------------------------------------
export function NavigateProvider({ children }: { children: ReactNode }) {

    const [responseData, setResponseData] = useState<any>(null);
    const [totalInfo, setTotalInfo] = useState<[number, number]>([0,0]);
    const [percent, setPercent] = useState<number>(0);

    const [timeIntervals, setTimeIntervals] = useState<[number, number | null][]>([]);
    const [pace, setPace] = useState(0);

    const [userLocation, setUserlocation] = useState<Coordinate | null>(null);
    const [coords, setCoord] = useState<Coordinate[]>([]);

    const [isRunning, setIsRunning] = useState(false);

    const [totalDistance, setTotalDistance] = useState(0);
    const [distance, setDistance] = useState<[number, number][]>([]);
    const [prevLocation, setPrevLocation] = useState<Coordinate | null>(null);

    // 다음 포인트 인덱스
    const [nextIndex, setNextIndex] = useState(1);
    const [passedIndexes, setPassedIndexes] = useState<number[]>([]);
    const [alam_15m, setAlam_15m] = useState(1);
    const [lastPaceKm, setLastPaceKm] = useState(0);

    // 누적 페이스(Average Pace: 총 시간 / 총 거리)
    const [avgpace, setAvgPace] = useState<number>(0);

    // 구간 페이스(Lap Pace: 최근 위치 변화로 계산)
    const [lappace, setLapPace] = useState<number[]>([]);
    const [lab,setLab] = useState(0);

    const [audio, setAudio] = useState<string>("");
    const [kmAudio, setKmAudio] = useState<number>(0);

    const [routeGeoJson, setRouteGeoJson] = useState<Feature<LineString> | null>(null);
    
    const [trimmedCoords, setTrimmedCoords] = useState<Coordinate[]>([]);
    const [heading, setHeading] = useState(0);
    const [lastPoint, setLastPoint] = useState(0);

    const [raceInfo, setRaceInfo] = useState<race[]>([]);

    useEffect( () => {
       console.log("lab 업데이트 됨"); 
    }, [raceInfo]);

    useEffect(() => {
        console.log("responceData 변경됨:");
    }, [responseData]);

    /** 거리 누적 로직 */
    useEffect(() => {
        if (!isRunning) return;
        if (!prevLocation || !userLocation) return;

        const diff = distanceMeters(prevLocation, userLocation);
        setTotalDistance(prev => {
            const newTotal = prev + diff;

            // 현재 이동 거리(m)를 km 단위 정수로 변환
            const currentKm = Math.floor(newTotal / 1000);

            // 1km 단위 증가했을 때만 Alarm_Pace() 실행
            if (currentKm > lastPaceKm) {
                setKmAudio(currentKm);
                setLastPaceKm(currentKm);
            }

            return newTotal;
        });
        console.log("경로 총거리:",totalDistance);
    }, [userLocation]);

    // prevLocation 업데이트
    useEffect(() => {
        if (isRunning) setPrevLocation(userLocation);
    }, [userLocation, isRunning]);

    /** 페이스 계산 로직 */
    useEffect(() => {
        if (!isRunning) return;
        if (!prevLocation || !userLocation) return;

        // 구간 거리 계산
        const segmentDistance = distanceMeters(prevLocation, userLocation);
        
        // 누적 거리 업데이트
        setTotalDistance(prev => prev + segmentDistance);

        // 구간 시간 계산
        const [start, end] = timeIntervals[timeIntervals.length - 1] || [];
        const segmentTime = (end ?? Date.now()) - start;

        // ==== 구간 페이스 ====
        if (segmentDistance > 0 && timeIntervals.length > 0) {
            const segmentMinutes = segmentTime / 60000;
            const km = segmentDistance / 1000;
            const lapPace = segmentMinutes / km;
            const lapPaceValue = Number((segmentMinutes / km).toFixed(2));

            setLapPace(prev => {
                const newLapPace = [...prev];
                newLapPace[lab] = lapPaceValue;
                return newLapPace;
            });
        }

    }, [userLocation]);

    useEffect(() => {
        if (!isRunning) return;
        const interval = setInterval(() => {
            if (!prevLocation || !userLocation) return;

            // 구간 거리 계산
            const segmentDistance = distanceMeters(prevLocation, userLocation);
            
            // ==== 누적 페이스 ====
            const totaltime = timeIntervals.reduce((acc, [s, e]) => {
                const calcEnd = e ?? Date.now();
                return acc + (calcEnd - s);
            }, 0);

            const totalMinutes = totaltime / 60000;
            const totalKm = (totalDistance + segmentDistance) / 1000;
            console.log("누적 페이스 계산용 총 시간:", totalMinutes, "총 거리(km):", totalKm);

            if (totalKm > 0) {
                const avgPace = totalMinutes / totalKm;
                setAvgPace(Number(avgPace.toFixed(2)));
            }

            console.log('totlakm:', totalKm, "totlaInfo", totalInfo[1]/1000);
            setPercent(Math.round((totalKm / (totalInfo[1]/1000)) * 100));
            console.log("움직인 %:",percent);

        }, 1000); // 1초마다

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 타이머 제거
    }, [isRunning, prevLocation, userLocation, totalDistance, timeIntervals]);


    /** 포인트 알람 로직 */
    useEffect(() => {
        if (!userLocation || coords.length < 2) return;

        const nextPoint = coords[nextIndex];
        if (!nextPoint) return;

        const guidanceList = responseData?.guidance_points ?? [];
        const guidanceId = guidanceList[nextIndex]?.guidance_id;

        if (nextIndex >= coords.length - 1) {
            console.log("종로지점만을 앞두고 있습니다.",coords,nextIndex);
        };

        const totaldist = distanceMeters(coords[nextIndex-1], coords[nextIndex]);

        const dist = Math.floor(distanceMeters(userLocation, nextPoint));
        console.log(`다음 포인트까지 거리: ${dist}m 그리고 현재 index: ${nextIndex}`);

        if (!passedIndexes.includes(nextIndex)) {
            if (totaldist >= 50 && dist === 50) {
                setAudio(guidanceId);
                console.log("50m 지점")
            } 
            else if (dist === 15 && !passedIndexes.includes(nextIndex)) {
                Alarm_15m();
                setAlam_15m(i => i + 1);
            } 
            else if (dist < 15 && !passedIndexes.includes(nextIndex) && alam_15m == nextIndex) {
                Alarm_m();
                setAlam_15m(i => i + 1);
            }
            if (dist === 0 && !passedIndexes.includes(nextIndex)) {
                setNextIndex(i => i + 1);
                setPassedIndexes(prev => [...prev, nextIndex]);
            }
        }

    }, [userLocation]);

    const startTimer = () => {
        const now = Date.now();
        setTimeIntervals(prev => [...prev, [now, null]]);
        setIsRunning(true);
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
            updated[lastIndex] = [lastInterval[0], Date.now()];
            const lab_add = lab + 1;
            setLab(lab_add);

            return updated;
        });
    };

    const addDistance = (meters: number) => {
        setTotalDistance(prev => prev + meters);
    };

        // 알람 이벤트 ---------------------------------------------
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

    const resetRunData = () => {
      setTotalInfo([0, 0]); // 총거리 초기화
      setAvgPace(0); // 평균 페이스 초기화
      setTimeIntervals([]); // 시간 기록 초기화
      setRaceInfo([]); // lap 데이터 초기화
      setTimeIntervals([]);
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

// Hook ------------------------------------------------------
export function useNavigateCtx() {
    const ctx = useContext(NavigateContext);
    if (!ctx) throw new Error("NavigateContext not found");
    return ctx;
}