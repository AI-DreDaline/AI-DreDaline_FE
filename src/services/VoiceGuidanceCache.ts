import axios from 'axios';

// React Native / Flutter 메모리에 저장
class VoiceGuidanceCache {

    guidancePoints: any[]; // 메모리
    guidance_total_info: any[];
    audioCache: Map<string, string>; // 오디오 파일도 캐싱

    // 처음 생성할때 초기화
    constructor() {
        this.guidancePoints = [];
        this.guidance_total_info = [];
        this.audioCache = new Map();
    }

    // 데이터를 리스트로 저장
    setGuidancePoints(lists) {
        this.guidancePoints = lists;
    }

    setGuidanceTotalInfo(list) {
        this.guidance_total_info = list;
    }

    // 오디오 캐시 저장 함수 (id:"TRUN_LEFT_30", "file://")
    setAudio(id, file) {
        this.audioCache.set(id, file);
    }

    // 오디오 캐시 불러오기 함수
    getAudio(id) {
        return this.audioCache.get(id);
    }

    // 데이터 반환 함수
    getGuidancePoints() {
        return this.guidancePoints;
    }

    getGuidanceTotalInfo() {
        return this.guidance_total_info;
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
            "lat": 33.499800962235,
            "lng": 126.5312442,
            "direction": "right",
            "angle": 52.8,
            "distance_from_start": 450.2,
            "distance_to_next": 12.7,
            "guidance_id": "TURN_RIGHT_10",
            "trigger_distance": 15.0
            },
            {
            "sequence": 3,
            "lat": 33.49998062447,
            "lng": 126.5312442,
            "direction": "straight",
            "angle": 5.2,
            "distance_from_start": 850.0,
            "distance_to_next": 95.6,
            "guidance_id": "GO_STRAIGHT_100",
            "trigger_distance": 15.0
            }
        ],
        "total_points": 3,
        "total_distance": 80.0
    }
    //response.data;
    if (response) {
        console.log("response 존재");
    }

    const guidance_points = response.guidance_points;

    const total_info = [response.total_points, response.total_distance];

    voiceCache.setGuidancePoints(guidance_points);
    voiceCache.setGuidanceTotalInfo(total_info);

    voiceCache.setAudio("TURN_LEFT_15", "file://path_to_turn_left_30.mp3");
    voiceCache.setAudio("TURN_RIGHT_15", "file://path_to_turn_right_10.mp3");
    voiceCache.setAudio("GO_STRAIGHT_100", "file://path_to_go_straight_100.mp3");
    voiceCache.setAudio("CHECKPOINT_KM", (km_mark: number) => {
        return `${km_mark}km 달렸습니다.`;
    });

    voiceCache.setAudio("ROUTE_START", "file://path_to_route_start.mp3");
    voiceCache.setAudio("ROUTE_COMPLETE", "file://path_to_route_complete.mp3");
    voiceCache.setAudio("ROUTE_REROUTE", "file://path_to_route_reroute.mp3");

    console.log("캐싱 완료:", voiceCache.getGuidancePoints());
}
