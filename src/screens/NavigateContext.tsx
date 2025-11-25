import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

// 타입 ----------------------------------------------------
export type Coordinate = [number, number];

interface NavigateContextType {
    userLocation: Coordinate | null;
    setUserlocation: (pos: Coordinate) => void;

    isRunning: boolean;

    coords: Coordinate[];
    setCoords: (c: Coordinate[]) => void;
    nextIndex: number;

    totalDistance: number;
    timeIntervals: [number, number | null][];
    startTimer: () => void;
    stopTimer: () => void;
    addDistance: (meters: number) => void;
}

const NavigateContext = createContext<NavigateContextType | null>(null);


// 거리 계산 함수 --------------------------------------------
function distanceMeters(c1: Coordinate, c2: Coordinate) {
    const R = 6371000;
    const [lon1, lat1] = c1.map(v => v * Math.PI / 180);
    const [lon2, lat2] = c2.map(v => v * Math.PI / 180);

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
    const [timeIntervals, setTimeIntervals] = useState<[number, number | null][]>([]);

    const [userLocation, setUserlocation] = useState<Coordinate | null>(null);
    const [coords, setCoords] = useState<Coordinate[]>([
        [126.5612, 33.4553],
        [126.5612, 33.4650],
        [126.5613, 33.4651],
        [126.4800, 33.4700],
        [126.5312, 33.4997]
    ]);

    const [isRunning, setIsRunning] = useState(false);

    const [totalDistance, setTotalDistance] = useState(0);
    const [prevLocation, setPrevLocation] = useState<Coordinate | null>(null);

    // 다음 포인트 인덱스
    const [nextIndex, setNextIndex] = useState(1);
    const [passedIndexes, setPassedIndexes] = useState<number[]>([]);
    const [alam_15m, setAlam_15m] = useState(1);
    const [lastPaceKm, setLastPaceKm] = useState(0);

    /** 거리 누적 로직 */
    useEffect(() => {
        if (!isRunning) return;
        if (!prevLocation || !userLocation) return;

        const diff = distanceMeters(prevLocation, userLocation);
        setTotalDistance(prev => {
            const newTotal = prev + diff;

            // 현재 이동 거리(m)를 km 단위 정수로 변환
            const currentKm = Math.floor(newTotal / 1000);
            console.log("현재 이동 거리(km):", currentKm);

            // 1km 단위 증가했을 때만 Alarm_Pace() 실행
            if (currentKm > lastPaceKm) {
                Alarm_pace(currentKm);
                setLastPaceKm(currentKm);
            }

            return newTotal;
     });


    }, [userLocation]);

    // prevLocation 업데이트
    useEffect(() => {
        if (isRunning) setPrevLocation(userLocation);
    }, [userLocation, isRunning]);


    /** 포인트 알람 로직 */
    useEffect(() => {
        console.log("userLocation 변경됨:", userLocation, " nextIndex:", nextIndex,'다음 지점',coords[nextIndex]);
        if (!userLocation || coords.length < 2) return;

        const nextPoint = coords[nextIndex];
        if (!nextPoint) return;

        const totaldist = distanceMeters(coords[nextIndex], coords[nextIndex + 1]);

        const dist = Math.floor(distanceMeters(userLocation, nextPoint));
        console.log(`다음 포인트까지 거리: ${dist}m`);

        if (!passedIndexes.includes(nextIndex)) {
            if (totaldist >= 50 && dist === 50) {
                Alarm_50m();
            } 
            else if (dist === 15 && !passedIndexes.includes(nextIndex)) {
                Alarm_15m();
                setAlam_15m(i => i + 1);
            } 
            else if (dist < 15 && !passedIndexes.includes(nextIndex) && alam_15m == nextIndex) {
                Alarm_m();
                setAlam_15m(i => i + 1);
            }
            if (dist == 0 && !passedIndexes.includes(nextIndex)) {
                setNextIndex(i => i + 1);
                setPassedIndexes(prev => [...prev, nextIndex]);
            }
        }
        /*
        if (dist === 50 && !passedIndexes.includes(nextIndex)) {
            Alarm_50m();
        }
        else if (dist === 15 && !passedIndexes.includes(nextIndex)) {
            Alarm_15m();
            setPasseAlam(prev => [...prev, nextIndex]);
        }
        else if (dist < 15 && !passedIndexes.includes(nextIndex) && passedAlam.includes(nextIndex)) {
            Alarm_m();
            setNextIndex(i => i + 1); // 다음 포인트로 이동
            setPassedIndexes(prev => [...prev, nextIndex]);
        }
        */

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

            return updated;
        });
    };

    const addDistance = (meters: number) => {
        setTotalDistance(prev => prev + meters);
    };

    return (
        <NavigateContext.Provider
            value={{
                userLocation,
                setUserlocation,
                isRunning,
                totalDistance,
                coords,
                setCoords,
                nextIndex,

                timeIntervals,
                startTimer,
                stopTimer,
                addDistance,
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

// 알람 이벤트 ---------------------------------------------
function Alarm_50m() {
    console.log("50m 후 turn");
}

function Alarm_15m() {
    console.log("15m 후 turn");
}

function Alarm_m() {
    console.log("도착!");
}

function Alarm_pace(km: number) {
    console.log(`${km}km 달성!`);
}