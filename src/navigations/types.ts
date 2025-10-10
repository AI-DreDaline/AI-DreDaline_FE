export type RootStackParamList = {
  Logo: undefined;
  RecommendRun: { address?: string; mode?: 'run' | 'ready'  };
  RecommendMap: undefined;
  MainScreen: { 
    address: string; 
    mode?: 'recommendReady' | 'drawReady';
    screen?: 'RecommendRun' | 'DrawTrackRun'; // 탭 선택용 추가
  };
  Loading: { address?: string };
  DrawTrackRun: { address?: string; mode?: 'run' | 'ready'  };
  DrawTrackMap: undefined;
};

export type MainTabParamList = {
  RecommendRun: { address?: string };
};
