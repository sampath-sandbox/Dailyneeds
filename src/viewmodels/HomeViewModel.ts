import { useState, useEffect } from 'react';
import { Item, Suggestion } from '../models';
import ItemRepository from '../repositories/ItemRepository';

export const useHomeViewModel = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [itemsData, suggestionsData] = await Promise.all([
        ItemRepository.getItems(),
        ItemRepository.getSuggestions()
      ]);
      setItems(itemsData);
      setSuggestions(suggestionsData);
    } catch (err) {
      setError('Failed to load data');
      console.error('Error loading data:', err);
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