/*
 * Created by Asad on 04 OCT 2025
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../constants/storage';

export const saveAuth = async (value: any) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(value));
  } catch (e) {
    console.warn('saveAuth error', e);
  }
};

export const loadAuth = async () => {
  try {
    const s = await AsyncStorage.getItem(STORAGE_KEYS.USER);
    return s ? JSON.parse(s) : null;
  } catch (e) {
    console.warn('loadAuth error', e);
    return null;
  }
};

export const clearAuth = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.USER);
  } catch (e) {
    console.warn('clearAuth error', e);
  }
};
