import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function GuideMainScreen() {
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
        <Image
          source={require('../assets/images/map_ready_login.png')}
          style={{ width: 350, height: 467 }}
          resizeMode="cover"
        />
      </View>
        <Text style={styles.title}>음성 경로 안내를 경험해보세요!</Text>
        <Text style={styles.subtitle}>경로를 보며 달릴 경우 사고 발생 확률이 올라갑니다.</Text>
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
        marginTop: 12,
        marginLeft: 22
    },
});