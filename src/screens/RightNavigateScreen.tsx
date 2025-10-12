import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const RightNavigateScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Right Navigate</Text>
    </View>
  );
};

export default RightNavigateScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
