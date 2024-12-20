import { createContext } from 'react';
import { User } from '../types/User';

/**
 * Authentication context object type definition
 * Handles the authenticated user state and methods to update it
 */
export interface AuthenticationContextObject {
  /** Currently authenticated user or undefined if not authenticated */
  user: User | undefined;
  /** Method to update the authenticated user state */
  setUser: (user: User | undefined) => void;
  /** Helper method to check if user is authenticated */
  isAuthenticated: boolean;
}

/**
 * Default context value with type-safe initialization
 */
const defaultContextValue: AuthenticationContextObject = {
  user: undefined,
  setUser: () => {
    console.warn('AuthenticationContext not yet initialized');
  },
  isAuthenticated: false,
};

/**
 * Authentication context for managing user authentication state
 * throughout the application
 */
export const AuthenticationContext = createContext<AuthenticationContextObject>(defaultContextValue);
