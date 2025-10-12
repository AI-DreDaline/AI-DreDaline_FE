import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MainNavigateScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Main Navigate</Text>
    </View>
  );
};

export default MainNavigateScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
