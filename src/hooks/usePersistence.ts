import { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { STORAGE_KEY } from '../constants';
import { FormData } from '../types';

interface UsePersistenceReturn {
  loadingData: boolean;
  saveData: (data: FormData) => Promise<void>;
  loadData: () => Promise<FormData | null>;
  clearData: () => Promise<void>;
}

const usePersistence = (): UsePersistenceReturn => {
  const [loadingData, setLoadingData] = useState<boolean>(true);

  const saveData = useCallback(async (data: FormData): Promise<void> => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
      Alert.alert('Error', 'Failed to save data: ' + (error as Error).message);
    }
  }, []);

  const loadData = useCallback(async (): Promise<FormData | null> => {
    try {
      const savedData = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedData) {
        return JSON.parse(savedData) as FormData;
      }
      return null;
    } catch (error) {
      console.error('Error loading data:', error);
      return null;
    }
  }, []);

  const clearData = useCallback(async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    setLoadingData(false);
  }, []);

  return {
    loadingData,
    saveData,
    loadData,
    clearData,
  };
};

export default usePersistence;
