import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const useTabBarVisibility = (visible) => {
  const navigation = useNavigation();

// 화면이 그려지기 전 여부를 판독해야 하기 때문에 useLAyoutEffect를 사용한다.
  useLayoutEffect(() => {
  const parentNavigator = navigation.getParent();
  if (parentNavigator) {
    parentNavigator.setOptions({
      tabBarStyle: {
        display: visible ? 'flex' : 'none',
        backgroundColor: '#1B1B1B',
        height: 102,
        borderTopWidth: 0,
        position: "absolute",
      },
    });
  }

// 다른 스크린으로 이동 시 다시 Tab Bar가 보임
    return () => {
      if (parentNavigator) {
        parentNavigator.setOptions({
          tabBarStyle: {
            backgroundColor: '#1B1B1B',
            height: 102,
            borderTopWidth: 0,
            position: "absolute",
          }, 
        });
      }
    };
  }, [navigation, visible]);
};

export default useTabBarVisibility;