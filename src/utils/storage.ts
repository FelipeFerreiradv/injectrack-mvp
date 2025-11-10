/**
 * Utilitários para armazenamento local (offline-first)
 */

import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const USER_KEY = 'user_data';

/**
 * Armazena token de autenticação de forma segura
 */
export const setAuthToken = async (token: string): Promise<void> => {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
};

/**
 * Recupera token de autenticação
 */
export const getAuthToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(TOKEN_KEY);
};

/**
 * Remove token de autenticação
 */
export const removeAuthToken = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
};

/**
 * Armazena refresh token
 */
export const setRefreshToken = async (token: string): Promise<void> => {
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, token);
};

/**
 * Recupera refresh token
 */
export const getRefreshToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
};

/**
 * Armazena dados do usuário localmente (offline)
 */
export const setUserData = async (userData: any): Promise<void> => {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
};

/**
 * Recupera dados do usuário
 */
export const getUserData = async (): Promise<any | null> => {
  const data = await AsyncStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
};

/**
 * Armazena logs diários localmente (para sincronização offline)
 */
export const saveDailyLogOffline = async (log: any): Promise<void> => {
  const key = `daily_log_${log.date}`;
  await AsyncStorage.setItem(key, JSON.stringify(log));
};

/**
 * Recupera logs pendentes de sincronização
 */
export const getPendingLogs = async (): Promise<any[]> => {
  const keys = await AsyncStorage.getAllKeys();
  const logKeys = keys.filter(key => key.startsWith('daily_log_'));
  const logs = await AsyncStorage.multiGet(logKeys);
  return logs.map(([_, value]) => value ? JSON.parse(value) : null).filter(Boolean);
};

/**
 * Remove log após sincronização bem-sucedida
 */
export const removePendingLog = async (date: string): Promise<void> => {
  await AsyncStorage.removeItem(`daily_log_${date}`);
};

/**
 * Limpa todos os dados locais
 */
export const clearAllData = async (): Promise<void> => {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
  await AsyncStorage.clear();
};

