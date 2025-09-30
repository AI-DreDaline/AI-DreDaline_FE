import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigations/types'; // 네비게이션 타입 정의한 파일

type Props = NativeStackScreenProps<RootStackParamList, 'Logo'>;

export default function LogoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>logopage</Text>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,                  // 화면 전체를 채움
      justifyContent: 'center', // 수직 가운데
      alignItems: 'center',     // 수평 가운데
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
    },
});