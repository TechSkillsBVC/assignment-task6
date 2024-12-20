import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

/**
 * LoadingScreen component displays a centered loading spinner
 * Used when the application is in a loading state (e.g., loading fonts)
 */
const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container} testID="loading-container">
      <ActivityIndicator 
        size="large" 
        color="#0000ff" 
        testID="loading-indicator"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
});

export default LoadingScreen;
