import { useState, useCallback } from 'react';
import { validateEmail, sanitizeEmail } from '../utils';

interface LoginFormState {
  email: string;
  password: string;
  emailError?: string;
  passwordError?: string;
}

interface UseLoginFormReturn {
  formState: LoginFormState;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  validateForm: () => boolean;
  getSanitizedEmail: () => string;
  resetForm: () => void;
}

/**
 * Custom hook to manage login form state and validation
 * Handles email and password validation, error messages, and form state
 */
export const useLoginForm = (): UseLoginFormReturn => {
  const [formState, setFormState] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  const setEmail = useCallback((email: string) => {
    setFormState(prev => ({
      ...prev,
      email,
      emailError: undefined,
    }));
  }, []);

  const setPassword = useCallback((password: string) => {
    setFormState(prev => ({
      ...prev,
      password,
      passwordError: undefined,
    }));
  }, []);

  const validateForm = useCallback((): boolean => {
    const newState: LoginFormState = {
      ...formState,
    };

    // Validate email
    if (!validateEmail(formState.email)) {
      newState.emailError = 'Please enter a valid email address';
    }

    // Validate password
    if (formState.password.length < 6) {
      newState.passwordError = 'Password must be at least 6 characters';
    }

    setFormState(newState);

    return !newState.emailError && !newState.passwordError;
  }, [formState]);

  const getSanitizedEmail = useCallback((): string => {
    return sanitizeEmail(formState.email);
  }, [formState.email]);

  const resetForm = useCallback(() => {
    setFormState({
      email: '',
      password: '',
    });
  }, []);

  return {
    formState,
    setEmail,
    setPassword,
    validateForm,
    getSanitizedEmail,
    resetForm,
  };
};
