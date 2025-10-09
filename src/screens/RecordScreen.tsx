import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function RecordScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Record</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414', // 배경색 어둡게
    justifyContent: 'center',   // 수직 가운데
    alignItems: 'center',       // 수평 가운데
  },
  text: {
    color: '#39FF14',           // 네온 그린
    fontSize: 32,
    fontWeight: 'bold',
  },
});
