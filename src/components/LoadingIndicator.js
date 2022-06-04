import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.laodingText}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(23, 23, 23, 0.5)',
  },
  laodingText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
});
export default LoadingIndicator;
