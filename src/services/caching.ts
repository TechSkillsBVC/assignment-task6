import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types/User';

type CacheKey = 'userInfo' | 'accessToken';

/**
 * Get data from AsyncStorage with proper type checking
 * @param key The key to retrieve data for
 * @returns Promise resolving to the stored data with correct type
 */
export async function getFromCache(key: 'userInfo'): Promise<User | null>;
export async function getFromCache(key: 'accessToken'): Promise<string | null>;
export async function getFromCache(key: CacheKey): Promise<any> {
  try {
    const data = await AsyncStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error retrieving ${key} from cache:`, error);
    return null;
  }
}

/**
 * Store data in AsyncStorage with type safety
 * @param key The key to store data under
 * @param value The data to store
 */
export async function setInCache(key: 'userInfo', value: User): Promise<void>;
export async function setInCache(key: 'accessToken', value: string): Promise<void>;
export async function setInCache(key: CacheKey, value: any): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error storing ${key} in cache:`, error);
  }
}

/**
 * Remove data from AsyncStorage
 * @param key The key to remove
 */
export async function removeFromCache(key: CacheKey): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing ${key} from cache:`, error);
  }
}
