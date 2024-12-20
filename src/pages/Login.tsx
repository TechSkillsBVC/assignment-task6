import { useIsFocused } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { Alert, Image, Text, TextInput, View, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Spinner from 'react-native-loading-spinner-overlay';

import BigButton from '../components/BigButton';
import Spacer from '../components/Spacer';
import { AuthenticationContext } from '../context/AuthenticationContext';
import { useLoginForm } from '../hooks/useLoginForm';
import logoImg from '../images/logo.png';
import * as api from '../services/api';
import { getFromCache, setInCache } from '../services/caching';
import { RootStackParamList } from '../routes/AppStack';
import { styles, GRADIENT_COLORS, BUTTON_COLOR } from './Login.styles';
import { isTokenExpired } from '../utils';
import { User } from '../types/User';

type LoginScreenProps = StackScreenProps<RootStackParamList, 'Login'>;

/**
 * Login screen component that handles user authentication
 * Features:
 * - Email and password validation
 * - Secure token-based authentication
 * - Persistent login state using cache
 * - Loading states and error handling
 * - Keyboard-aware scrolling
 */
const Login: React.FC<LoginScreenProps> = ({ navigation }) => {
  const authContext = useContext(AuthenticationContext);
  const {
    formState,
    setEmail,
    setPassword,
    validateForm,
    getSanitizedEmail,
    resetForm,
  } = useLoginForm();

  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string>();
  const [accessTokenIsValid, setAccessTokenIsValid] = useState(false);
  
  const isFocused = useIsFocused();

  // Check for cached credentials on mount
  useEffect(() => {
    const checkCachedAuth = async () => {
      try {
        const cachedUserInfo = await getFromCache('userInfo');
        if (cachedUserInfo) {
          authContext.setUser(cachedUserInfo);
        }

        const accessToken = await getFromCache('accessToken');
        if (accessToken && !isTokenExpired(accessToken)) {
          setAccessTokenIsValid(true);
        }
      } catch (error) {
        console.error('Error checking cached auth:', error);
      }
    };

    checkCachedAuth();
  }, []);

  // Handle authentication errors
  useEffect(() => {
    if (authError) {
      Alert.alert('Authentication Error', authError, [
        { text: 'OK', onPress: () => setAuthError(undefined) }
      ]);
    }
  }, [authError]);

  // Navigate when authenticated
  useEffect(() => {
    if (accessTokenIsValid && authContext.user) {
      navigation.navigate('EventsMap');
    }
  }, [accessTokenIsValid, authContext.user]);

  const handleAuthentication = async () => {
    if (!validateForm()) {
      return;
    }

    setIsAuthenticating(true);
    try {
      const response = await api.authenticateUser(
        getSanitizedEmail(),
        formState.password
      );

      const { user, accessToken } = response.data;
      await setInCache('userInfo', user as User);
      await setInCache('accessToken', accessToken as string);
      
      authContext.setUser(user as User);
      navigation.navigate('EventsMap');
    } catch (error: any) {
      setAuthError(
        error.response?.data || 'An error occurred during authentication'
      );
    } finally {
      setIsAuthenticating(false);
    }
  };

  const getInputStyle = (hasError: boolean): StyleProp<TextStyle> => {
    return [
      styles.input,
      hasError && styles.invalid,
    ] as StyleProp<TextStyle>;
  };

  return (
    <LinearGradient
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}
      colors={[GRADIENT_COLORS.start, GRADIENT_COLORS.end]}
      style={styles.gradientContainer}
    >
      {isFocused && <StatusBar animated translucent style="light" />}
      <KeyboardAwareScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer as StyleProp<ViewStyle>}
      >
        <Image
          resizeMode="contain"
          style={styles.logo}
          source={logoImg}
        />
        <Spacer size={80} />
        
        <View style={styles.inputLabelRow}>
          <Text style={styles.label}>Email</Text>
          {formState.emailError && (
            <Text style={styles.error}>{formState.emailError}</Text>
          )}
        </View>
        <TextInput
          style={getInputStyle(!!formState.emailError)}
          onChangeText={setEmail}
          value={formState.email}
          keyboardType="email-address"
          autoCapitalize="none"
          autoComplete="email"
        />

        <View style={styles.inputLabelRow}>
          <Text style={styles.label}>Password</Text>
          {formState.passwordError && (
            <Text style={styles.error}>{formState.passwordError}</Text>
          )}
        </View>
        <TextInput
          style={getInputStyle(!!formState.passwordError)}
          secureTextEntry
          onChangeText={setPassword}
          value={formState.password}
          autoCapitalize="none"
        />

        <Spacer size={80} />
        
        <BigButton
          style={{ marginBottom: 8 }}
          onPress={handleAuthentication}
          label="Log in"
          color={BUTTON_COLOR}
        />

        <Spinner
          visible={isAuthenticating}
          textContent={'Authenticating...'}
          overlayColor={GRADIENT_COLORS.overlay}
          textStyle={styles.spinnerText}
        />
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

export default Login;
