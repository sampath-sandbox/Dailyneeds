import { useState, useEffect } from 'react';
import { Item, Suggestion } from '../models';
import { mockData } from '../data/mockData';

export const useHomeViewModel = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    // Simulate loading delay
    setTimeout(() => {
      setItems(mockData.items);
      setSuggestions(mockData.suggestions);
      setLoading(false);
    }, 500);
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