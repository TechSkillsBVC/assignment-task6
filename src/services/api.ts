import axios, { AxiosResponse, AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { User } from '../types/User';
import { getFromCache } from './caching';

/**
 * API response interfaces
 */
export interface AuthResponse {
  user: User;
  accessToken: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

/**
 * API configuration
 */
const API_CONFIG = {
  // Default timeout in milliseconds
  timeout: 10000,
  // Number of retry attempts for failed requests
  retryAttempts: 3,
  // Delay between retries in milliseconds
  retryDelay: 1000,
  // Base URL for the API
  baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://192.168.1.86:3333',
};

/**
 * Create axios instance with default configuration
 */
const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
});

/**
 * Add authentication token to requests
 */
api.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    try {
      const token = await getFromCache('accessToken');
      if (token) {
        // Create a new config object to avoid mutating the original
        const newConfig = { ...config };
        newConfig.headers = newConfig.headers || {};
        newConfig.headers.Authorization = `Bearer ${token}`;
        return newConfig;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Format error response
 */
const formatError = (error: AxiosError<{ message?: string }>): ApiError => {
  return {
    message: error.response?.data?.message || error.message || 'An unexpected error occurred',
    code: error.code,
    status: error.response?.status,
  };
};

/**
 * Retry failed requests
 */
const retryRequest = async <T>(
  request: () => Promise<AxiosResponse<T>>,
  retries: number = API_CONFIG.retryAttempts
): Promise<AxiosResponse<T>> => {
  try {
    return await request();
  } catch (error) {
    if (retries > 0 && axios.isAxiosError(error) && error.response?.status !== 401) {
      await new Promise(resolve => setTimeout(resolve, API_CONFIG.retryDelay));
      return retryRequest(request, retries - 1);
    }
    throw error;
  }
};

/**
 * Authenticate user with email and password
 * @param email User's email
 * @param password User's password
 * @returns Promise resolving to authentication response
 * @throws ApiError if authentication fails
 */
export const authenticateUser = async (
  email: string,
  password: string
): Promise<AxiosResponse<AuthResponse>> => {
  try {
    return await retryRequest(() =>
      api.post<AuthResponse>('/login', { email, password })
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw formatError(error);
    }
    throw new Error('An unexpected error occurred during authentication');
  }
};

export default api;
