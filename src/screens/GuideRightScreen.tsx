import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {WithLocalSvg} from 'react-native-svg/css';

const map_ready = require('../assets/images/map_ready_login.svg');

export default function GuideRightScreen() {
  return (
    <View style={styles.container}>
      <View
        style={{
          borderRadius: 20,
          overflow: 'hidden',
          marginTop: 95,
          marginLeft: 22,
          width: 350,
          height: 467,
        }}
      >
        <WithLocalSvg
          asset={map_ready}
          width={350}
          height={467}
        />
      </View>
        <Text style={styles.title}>지도에 직접 경로를 그려보세요!</Text>
        <Text style={styles.subtitle}>지도 위에서 그림 식력을 뽑내보세요.</Text>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,                  // 화면 전체를 채움
    },
    title: {
        color: '#ffffff',
        fontSize: 25,
        fontWeight: '900',
        marginTop: 21,
        marginLeft: 22
    },
    subtitle: {
        color: '#9095A0',
        fontSize: 17,
        fontWeight: '400',
        marginTop: 11,
        marginLeft: 22
    },
});