import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { LoingStackParamList } from '../navigations/types';

type Props = NativeStackScreenProps<LoingStackParamList, 'Logo'>;

import mainIcon from '../assets/images/mainicon.png';

const LogoScreen = ({ navigation }: Props) => {
  useEffect(() => {
    // Avoid holding the user on a static splash longer than necessary.
    const timer = setTimeout(() => {
      navigation.replace('Guide'); // 또는 replace('Guide')
    }, 150);

    return () => clearTimeout(timer); // 언마운트 시 타이머 정리
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={mainIcon}
        style={{width: 130, height: 130}}
      />
    </View>
  );
}
export default LogoScreen;

  const styles = StyleSheet.create({
    container: {
      flex: 1,                  // 화면 전체를 채움
      justifyContent: 'center', // 수직 가운데
      alignItems: 'center',     // 수평 가운데
      backgroundColor: '#141414',
    },

});
