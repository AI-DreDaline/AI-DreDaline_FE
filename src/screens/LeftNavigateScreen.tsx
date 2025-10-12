import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LeftNavigateScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Left Navigate</Text>
    </View>
  );
};

export default LeftNavigateScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
