import axios from 'axios';

// React Native / Flutter 메모리에 저장
class VoiceGuidanceCache {

    guidancePoints: any[]; // 메모리
    audioCache: Map<string, string>; // 오디오 파일도 캐싱

    // 처음 생성할때 초기화
    constructor() {
        this.guidancePoints = [];
        this.audioCache = new Map();
    }

    // 데이터를 리스트로 저장
    setGuidancePoints(list) {
        this.guidancePoints = list;
    }

    // 오디오 캐시 저장 함수 (id:"TRUN_LEFT_30", "file://")
    setAudio(id, uri) {
        this.audioCache.set(id, uri);
    }

    // 오디오 캐시 불러오기 함수
    getAudio(id) {
        return this.audioCache.get(id);
    }

    // 데이터 반환 함수
    getGuidancePoints() {
        return this.guidancePoints;
    }
}

export const voiceCache = new VoiceGuidanceCache();

export async function loadRouteData(routeId:string) {
    console.log("loadRouteData 호출:", routeId);
    // 1) 서버 요청
    // const response1 = await axios.get(
    //     `https://your-server.com/api/route/${routeId}`
    // );

    // 2) 받은 데이터에서 guidance_points 꺼내기
    const response = {
        "route_id": "temp_abc123",
        "guidance_points": [
            {
            "sequence": 1,
            "lat": 33.4996213,
            "lng": 126.5312442,
            "direction": "left",
            "angle": -65.3,
            "distance_from_start": 120.5,
            "distance_to_next": 28.3,
            "guidance_id": "TURN_LEFT_30",
            "trigger_distance": 15.0
            },
            {
            "sequence": 2,
            "lat": 33.5003891,
            "lng": 126.5320155,
            "direction": "right",
            "angle": 52.8,
            "distance_from_start": 450.2,
            "distance_to_next": 12.7,
            "guidance_id": "TURN_RIGHT_10",
            "trigger_distance": 15.0
            },
            {
            "sequence": 3,
            "lat": 33.5012456,
            "lng": 126.5328903,
            "direction": "straight",
            "angle": 5.2,
            "distance_from_start": 850.0,
            "distance_to_next": 95.6,
            "guidance_id": "GO_STRAIGHT_100",
            "trigger_distance": 15.0
            }
        ],
        "total_points": 3,
        "total_distance": 1200.5
    }
    //response.data;
    if (response) {
        console.log("response 존재");
    }

    const guidance_points = response.guidance_points;

    voiceCache.setGuidancePoints(guidance_points);

    console.log("캐싱 완료:", voiceCache.getGuidancePoints());
}
