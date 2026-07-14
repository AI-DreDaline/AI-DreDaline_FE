import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function GuideLeftScreen() {
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
      <Text style={styles.title}>AI 경로 생성 기능을 이용해보세요!</Text>
      <Text style={styles.subtitle}>개인 맞춤 설정을 통해 경로가 생성됩니다.</Text>
    </View>
  );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,                  // 화면 전체를 채움
      backgroundColor: '#141414',
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
        marginTop: 13,
        marginLeft: 22
    },
});