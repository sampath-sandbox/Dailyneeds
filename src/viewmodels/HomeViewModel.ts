import { useState, useEffect } from 'react';
import { Item, Suggestion, ResponseData, emptyResponse } from '../models';
import SimpleApiService from '../services/SimpleApiService';

export const useHomeViewModel = () => {
  const [items, setItems] = useState<ResponseData>({} as ResponseData);
  const [suggestions, setSuggestions] = useState<ResponseData>({} as ResponseData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    debugger;
    setLoading(true);
    setError(null);
    try {
      const itemsData = await SimpleApiService.getItems();
      const suggestionsData = await SimpleApiService.getSuggestions();

      setItems(itemsData || []);
      debugger;
      setSuggestions(suggestionsData || []);
    } catch (err) {
      debugger;
      console.error('Error loading data:', err);
      setError('Failed to load data');
      setItems(emptyResponse);
      setSuggestions(emptyResponse);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    items,
    suggestions,
    loading,
    error,
    refreshData: loadData,
  };
};