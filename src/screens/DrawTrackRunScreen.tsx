import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DrawTrackRunScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>자신이 그린 트랙</Text>
      <Text style={styles.subtitle}>당신에게 맞는 코스를 불러오는 중...</Text>
      {/* 나중에 지도나 코스 리스트 들어갈 부분 */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#39FF14',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
  },
});
