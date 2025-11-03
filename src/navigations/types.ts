export type RootStackParamList = {
  Logo: undefined;
  RecommendRun: { address?: string; mode?: 'run' | 'ready'  };
  RecommendMap: undefined;
  RecommendReady: undefined;
  RecommendReadyMap: undefined;
  MainScreen: { 
    address: string; 
    mode?: 'recommendReady' | 'drawReady' | '';
    screen?: 'RecommendRun' | 'DrawTrackRun'; // 탭 선택용 추가
  };
  Loading: undefined;
  DrawTrackRun: { address?: string; mode?: 'run' | 'ready'  };
  DrawTrackMap: undefined;
  DrawTrackReady: undefined;
  DrawTrackReadyMap: undefined;
  Navigate: undefined;
};

export type MainTabParamList = {
  RecommendRun: { address?: string };
};
