import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import {
  useFonts,
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from '@expo-google-fonts/nunito';
import { StatusBar } from 'expo-status-bar';

import AppStack from './src/routes/AppStack';
import ErrorBoundary from './src/components/ErrorBoundary';
import LoadingScreen from './src/components/LoadingScreen';

/**
 * Main application component that handles:
 * - Font loading
 * - Error boundaries for crash protection
 * - Action sheet provider for native action sheets
 * - Status bar configuration
 * - Navigation stack
 * 
 * The component ensures all necessary resources are loaded before
 * rendering the main application content.
 */
const App: React.FC = () => {
  // Load custom fonts and track loading state
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  // Show loading screen while fonts are being loaded
  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <StatusBar animated translucent style="dark" />
      <ActionSheetProvider>
        <AppStack />
      </ActionSheetProvider>
    </ErrorBoundary>
  );
};

export default App;
