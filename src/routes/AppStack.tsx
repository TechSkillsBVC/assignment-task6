import React, { useState, useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../pages/Login';
import EventsMap from '../pages/EventsMap';
import { AuthenticationContext } from '../context/AuthenticationContext';
import { User } from '../types/User';

/**
 * Navigation parameter list for type-safe navigation
 */
export type RootStackParamList = {
  Login: undefined;
  EventsMap: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

/**
 * AppStack component handles the main navigation structure of the application
 * and provides the authentication context to child components.
 * 
 * Features:
 * - Type-safe navigation with RootStackParamList
 * - Authentication state management
 * - Conditional navigation based on auth state
 * - Consistent styling through screenOptions
 */
const AppStack: React.FC = () => {
  const [user, setUser] = useState<User | undefined>();

  // Memoize the authentication context value to prevent unnecessary re-renders
  const authContextValue = useMemo(
    () => ({
      user,
      setUser,
      isAuthenticated: !!user,
    }),
    [user]
  );

  return (
    <AuthenticationContext.Provider value={authContextValue}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: '#F2F3F5' },
          }}
          initialRouteName={authContextValue.isAuthenticated ? 'EventsMap' : 'Login'}
        >
          {!authContextValue.isAuthenticated ? (
            <Stack.Screen 
              name="Login" 
              component={Login}
              options={{ gestureEnabled: false }}
            />
          ) : (
            <Stack.Screen 
              name="EventsMap" 
              component={EventsMap}
              options={{ gestureEnabled: false }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthenticationContext.Provider>
  );
};

export default AppStack;
